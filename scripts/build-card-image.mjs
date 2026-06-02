#!/usr/bin/env node
// Compose the ForEveryone "Design System" promo card from scratch: cut the
// megaphone burst and pottery figure out of the lavender source art, drop in the
// high-res "For Everyone" wordmark, render a one-line vector headline, and lay it
// all out on a flat lavender canvas. Export the social/OG/GitHub card (1200x630)
// and the README hero (1500x720).
//
// Raster art is kept near native resolution (sharp); the headline is vector.
//
// usage: node scripts/build-card-image.mjs <source.png>
import sharp from "../prototype/node_modules/sharp/lib/index.js";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { stat } from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/build-card-image.mjs <source.png>");
  process.exit(1);
}

const BG = { r: 227, g: 222, b: 255 }; // sampled lavender background
const BGHEX = "#E3DEFF";
const INK = "#17161B"; // sampled headline ink
const LOGO = path.join(root, "prototype/public/images/foreveryone-logo.png");

// Key a flat-lavender crop to transparency: alpha ramps with distance from the
// background colour, so anti-aliased edges reconstruct cleanly over lavender.
async function keyOut(crop) {
  const { data, info } = await sharp(src)
    .extract(crop)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  const out = Buffer.alloc(info.width * info.height * 4);
  const lo = 14;
  const hi = 64;
  for (let p = 0, q = 0; p < data.length; p += ch, q += 4) {
    const r = data[p];
    const g = data[p + 1];
    const b = data[p + 2];
    const d = Math.sqrt((r - BG.r) ** 2 + (g - BG.g) ** 2 + (b - BG.b) ** 2);
    let a = (d - lo) / (hi - lo);
    a = a < 0 ? 0 : a > 1 ? 1 : a;
    out[q] = r;
    out[q + 1] = g;
    out[q + 2] = b;
    out[q + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 0 })
    .png()
    .toBuffer();
}

// Cut elements out of the source (left of "Website" e for the burst).
const megaphone = await keyOut({ left: 415, top: 48, width: 118, height: 210 });
const woman = await keyOut({ left: 515, top: 250, width: 252, height: 315 });

const megMeta = await sharp(megaphone).metadata();
const womMeta = await sharp(woman).metadata();
const logoMeta = await sharp(LOGO).metadata();

await sharp(megaphone).toFile(path.join(os.tmpdir(), "el-megaphone.png"));
await sharp(woman).toFile(path.join(os.tmpdir(), "el-woman.png"));
console.log(`megaphone ${megMeta.width}x${megMeta.height}  woman ${womMeta.width}x${womMeta.height}  logo ${logoMeta.width}x${logoMeta.height}`);

// ---- layout: sizes scale with canvas height, capped to stay sharp ----
async function fitH(buf, h) {
  return sharp(buf).resize({ height: Math.round(h), kernel: "lanczos3" }).png().toBuffer();
}
async function fitW(buf, w) {
  return sharp(buf).resize({ width: Math.round(w), kernel: "lanczos3" }).png().toBuffer();
}

async function compose(W, H, dst) {
  const HEAD_FONT = Math.round(0.155 * H);
  const WOMAN_H = Math.min(Math.round(0.64 * H), Math.round(womMeta.height * 1.3));
  const MEGA_H = Math.min(Math.round(0.25 * H), Math.round(megMeta.height * 1.1));
  const LOGO_W = Math.round(0.22 * W);

  const womanR = await fitH(woman, WOMAN_H);
  const megaR = await fitH(megaphone, MEGA_H);
  const logoR = await fitW(LOGO, LOGO_W);
  const wm = await sharp(womanR).metadata();
  const mm = await sharp(megaR).metadata();
  const lm = await sharp(logoR).metadata();

  // Woman: bottom-right, lifted off the edge with right clearance.
  const womanLeft = Math.round(W - wm.width - 0.07 * W);
  const womanTop = Math.round(H - wm.height - 0.05 * H);
  // Megaphone: pops just above the figure's head (anchored to her, not the
  // canvas), biased slightly left like the source art. Clamped to a top margin.
  const megaLeft = Math.round(womanLeft + wm.width * 0.28 - mm.width * 0.5);
  const megaTop = Math.max(Math.round(0.04 * H), Math.round(womanTop - mm.height - 0.03 * H));
  // Logo: bottom-left footer lockup.
  const logoLeft = Math.round(0.06 * W);
  const logoTop = Math.round(H - lm.height - 0.11 * H);
  // Headline: left, vertically centered.
  const headX = Math.round(0.06 * W);
  const headBaseline = Math.round(0.5 * H);

  const headline = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <text x="${headX}" y="${headBaseline}" font-family="Segoe UI, Arial, sans-serif"
        font-weight="800" font-size="${HEAD_FONT}" fill="${INK}">Design System</text>
</svg>`);

  await sharp({ create: { width: W, height: H, channels: 3, background: BGHEX } })
    .composite([
      { input: womanR, left: womanLeft, top: womanTop },
      { input: megaR, left: megaLeft, top: megaTop },
      { input: headline, left: 0, top: 0 },
      { input: logoR, left: logoLeft, top: logoTop },
    ])
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(dst);
  const s = await stat(dst);
  console.log(`output: ${W}x${H} ${(s.size / 1024).toFixed(1)} KB -> ${path.relative(root, dst)}`);
}

await compose(1200, 630, path.join(root, "prototype/public/images/social-preview.jpg"));
await compose(1500, 720, path.join(root, "prototype/public/images/readme-hero.jpg"));
