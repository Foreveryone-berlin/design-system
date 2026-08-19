// Generates the Open Graph / social card for the Belonging Guide funnel pages
// (/guide, /guide-confirmed) on foreveryone.berlin. Three compositions, all at
// 1200x630 (1.91:1). Renders with headless Chromium, then encodes to JPG.
//
//   node prototype/scripts/build-guide-og.mjs [variant] [outDir]
//
//   variant: photo (default) | doodle | blobs | all
//   outDir:  where the JPGs land (default: .artifacts/images — gitignored)
//
// This card is a *website* asset, not a design-system asset: the default output
// folder is the local artifact hub, so nothing lands in prototype/public/.
//
// Colours come from css/custom-properties.css, which is generated from
// tokens/*.json — the file is injected verbatim so `var(--color-*)` resolves in
// Chromium (which supports oklch() natively). Never hardcode hex here; a token
// change must flow straight into the cards.
import { chromium } from "playwright";
import sharp from "sharp";
import { join, dirname, resolve, relative } from "node:path";
import { readFileSync, mkdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..", "..");
const publicDir = join(__dirname, "..", "public");

const VARIANTS = ["photo", "doodle", "blobs"];
const arg = process.argv[2] ?? "photo";
const requested = arg === "all" ? VARIANTS : [arg];
for (const v of requested) {
  if (!VARIANTS.includes(v)) {
    console.error(`unknown variant "${v}" — expected one of ${VARIANTS.join(", ")}, all`);
    process.exit(1);
  }
}
const outDir = process.argv[3] ?? join(repoRoot, ".artifacts", "images");
mkdirSync(outDir, { recursive: true });

const tokenCss = readFileSync(join(repoRoot, "css", "custom-properties.css"), "utf8");

function dataUri(relPath, mime) {
  const b64 = readFileSync(join(publicDir, relPath)).toString("base64");
  return `data:${mime};base64,${b64}`;
}
const svgUri = (p) => dataUri(p, "image/svg+xml");
const logoUri = dataUri("images/logo/foreveryone-horizontal.png", "image/png");
const photoUri = dataUri("images/community-cafe.png", "image/png");

// Filson Pro is licensed and not vendored in this repo, so the cards render in
// Outfit — the closest free geometric sans — as a documented stand-in.
const FONT_LINKS = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&display=swap" rel="stylesheet">`;

// One copy deck for every variant: the card is the same promise wherever it is
// scraped from, only the composition changes.
const COPY = {
  eyebrow: "Free Guide &middot; 6 min read",
  title: "Belonging<br>in Berlin",
  sub: "Meeting people is the easy part.",
  body: "Why connection in Berlin fizzles out &mdash; and what makes people come back.",
};

const W = 1200;
const H = 630;
const PAD = 76;

function shell({ body, extraCss = "" }) {
  return `<!doctype html><html><head><meta charset="utf-8">${FONT_LINKS}
<style>
${tokenCss}
* { margin:0; padding:0; box-sizing:border-box; }
html,body { width:${W}px; height:${H}px; }
body {
  position:relative; overflow:hidden;
  background:var(--color-accent);
  font-family:'Outfit',sans-serif;
  color:var(--color-brand-dark);
}
.content { position:absolute; inset:0; padding:${PAD}px;
           display:flex; flex-direction:column; justify-content:center; }
h1 { font-size:96px; font-weight:700; line-height:.94; letter-spacing:-0.03em; }
.eyebrow { align-self:flex-start; font-size:22px; font-weight:700; line-height:1;
           padding:14px 26px; border-radius:999px;
           border:2px solid var(--color-light-gray); background:var(--color-accent); }
.underline { display:block; height:34px; margin-top:14px;
             -webkit-mask-image:url("${svgUri("illustrations/accents/doodle-underline.svg")}");
             mask-image:url("${svgUri("illustrations/accents/doodle-underline.svg")}"); }
.sub { font-size:30px; font-weight:700; color:var(--color-brand-secondary); }
.body { font-size:22px; font-weight:400; line-height:1.45; color:var(--color-neutral-600); }
.mark { background-color:var(--color-brand-primary);
        -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat;
        -webkit-mask-position:center; mask-position:center;
        -webkit-mask-size:contain; mask-size:contain; }
.foot { position:absolute; left:${PAD}px; bottom:${Math.round(PAD * 0.62)}px; height:32px; }
.foot img { height:100%; }
${extraCss}
</style></head><body>${body}</body></html>`;
}

/**
 * photo — the funnel default. Split card: copy stack left, photograph inside an
 * organic blob mask right, over a Warm White ground with one Soft Lavender
 * corner. Mirrors the live campaign cards (Clay Connection, SheLeads).
 */
function photoCard() {
  return shell({
    extraCss: `
.corner { position:absolute; right:${-H * 0.3}px; top:${-H * 0.34}px;
          width:${H * 1.05}px; height:${H * 1.05}px; background:var(--color-soft-lavender);
          border-radius:42% 58% 63% 37% / 47% 39% 61% 53%; }
.content { width:660px; justify-content:center; gap:24px; padding-bottom:${PAD + 34}px; }
h1 { font-size:92px; }
.underline { width:330px; }
.photo { position:absolute; right:66px; top:${(H - 430) / 2}px; width:464px; height:430px;
         object-fit:cover;
         border-radius:56% 44% 38% 62% / 46% 58% 42% 54%;
         box-shadow:0 18px 44px rgb(0 0 0 / 10%); }`,
    body: `
<div class="corner"></div>
<img class="photo" src="${photoUri}" alt="">
<div class="content">
  <span class="eyebrow">${COPY.eyebrow}</span>
  <div>
    <h1>${COPY.title}</h1>
    <span class="underline mark"></span>
  </div>
  <p class="sub">${COPY.sub}</p>
  <p class="body">${COPY.body}</p>
</div>
<div class="foot"><img src="${logoUri}" alt="ForEveryone"></div>`,
  });
}

/**
 * doodle — no photograph. Lime Green title field with a Warm White wave band at
 * the bottom edge and the hand-drawn marks on the right, matching the shipped
 * design-system card family (Brand Book p.26–27: waves divide, marks accent).
 */
function doodleCard() {
  const spot = (cls, file, s) => `
.${cls} { width:${H * s.w}px; height:${H * s.h}px; right:${W * s.right}px; top:${H * s.top}px; }
.${cls} { -webkit-mask-image:url("${svgUri(file)}"); mask-image:url("${svgUri(file)}"); }`;
  return shell({
    extraCss: `
body { background:var(--color-background-title); }
.wave { position:absolute; left:0; right:0; bottom:0; height:${H * 0.3}px;
        background-color:var(--color-accent);
        -webkit-mask-image:url("${svgUri("illustrations/waves/wave-h1.svg")}");
        mask-image:url("${svgUri("illustrations/waves/wave-h1.svg")}");
        -webkit-mask-size:100% 100%; mask-size:100% 100%;
        -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat; }
.content { width:720px; gap:22px; padding-bottom:${PAD * 1.5}px; }
.eyebrow { background:var(--color-accent); border-color:var(--color-accent); }
h1 { font-size:88px; }
.underline { width:300px; }
.body { color:var(--color-neutral-700); }
.spot { position:absolute; }
${spot("s-sprout", "illustrations/sprout.svg", { w: 0.3, h: 0.3, right: 0.08, top: 0.08 })}
${spot("s-smiley", "illustrations/smiley.svg", { w: 0.21, h: 0.21, right: 0.2, top: 0.4 })}
${spot("s-swirl", "illustrations/accents/doodle-swirl.svg", { w: 0.32, h: 0.23, right: 0.05, top: 0.55 })}`,
    body: `
<div class="wave"></div>
<span class="spot mark s-sprout"></span>
<span class="spot mark s-smiley"></span>
<span class="spot mark s-swirl"></span>
<div class="content">
  <span class="eyebrow">${COPY.eyebrow}</span>
  <div>
    <h1>${COPY.title}</h1>
    <span class="underline mark"></span>
  </div>
  <p class="sub">${COPY.sub}</p>
</div>
<div class="foot"><img src="${logoUri}" alt="ForEveryone"></div>`,
  });
}

/**
 * blobs — type-led. No photograph, no doodles: a Soft Lavender / Lime Green /
 * orange blob field carries the colour, so the card stays legible when a
 * platform crops it hard (Brand Book p.27: blobs are containers and colour
 * blocks, never edge dividers).
 */
function blobsCard() {
  return shell({
    extraCss: `
.blob { position:absolute; }
.b-lav  { width:${H * 0.86}px; height:${H * 0.7}px; right:${-H * 0.14}px; top:${-H * 0.16}px;
          background:var(--color-soft-lavender); border-radius:38% 62% 68% 32% / 52% 34% 66% 48%; }
.b-lime { width:${H * 0.7}px; height:${H * 0.56}px; right:${H * 0.16}px; bottom:${-H * 0.14}px;
          background:var(--color-light-green); border-radius:62% 38% 34% 66% / 58% 60% 40% 42%; }
.b-orng { width:${H * 0.2}px; height:${H * 0.18}px; right:${H * 0.06}px; top:${H * 0.44}px;
          background:var(--color-brand-primary); border-radius:60% 40% 47% 53% / 38% 58% 42% 62%; }
.content { width:660px; gap:22px; padding-bottom:${PAD * 2.0}px; }
h1 { font-size:96px; font-weight:900; letter-spacing:-0.04em; }
.underline { width:320px; }`,
    body: `
<div class="blob b-lav"></div><div class="blob b-lime"></div><div class="blob b-orng"></div>
<div class="content">
  <span class="eyebrow">${COPY.eyebrow}</span>
  <div>
    <h1>${COPY.title}</h1>
    <span class="underline mark"></span>
  </div>
  <p class="sub">${COPY.sub}</p>
  <p class="body">${COPY.body}</p>
</div>
<div class="foot"><img src="${logoUri}" alt="ForEveryone"></div>`,
  });
}

const RENDERERS = { photo: photoCard, doodle: doodleCard, blobs: blobsCard };

const browser = await chromium.launch();
for (const variant of requested) {
  const page = await browser.newPage({
    viewport: { width: W, height: H },
    deviceScaleFactor: 2,
  });
  await page.setContent(RENDERERS[variant](), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const png = await page.screenshot({ clip: { x: 0, y: 0, width: W, height: H } });
  await page.close();

  const file = join(outDir, `guide-og-${variant}.jpg`);
  await sharp(png)
    .resize(W, H)
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toFile(file);
  const kb = (statSync(file).size / 1024).toFixed(1);
  console.log(`${variant.padEnd(6)} ${W}x${H} ${kb} KB -> ${relative(repoRoot, file)}`);
}
await browser.close();
