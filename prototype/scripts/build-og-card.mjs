// Generates the social (OG/Twitter/GitHub) card and the README hero from one
// design-system-driven HTML template. Renders with headless Chromium, then the
// caller converts the PNGs to optimised JPGs.
//
//   node scripts/build-og-card.mjs
//
// Output PNGs land in os.tmpdir(); convert + place via ImageMagick afterwards.
import { chromium } from "playwright";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const logoPath = join(__dirname, "..", "public", "images", "foreveryone-logo.png");
const logoB64 = readFileSync(logoPath).toString("base64");

const C = {
  warmWhite: "#FDFCF7",
  charcoal: "#1E1E1E",
  neutral600: "#525252",
  orange: "#FF7A3A",
  orange150: "#FFD7C4",
  orange300: "#FFAF89",
  lime: "#D4E6A8",
  lavender: "#D5C5FF",
  softLav: "#E5DCFF",
  blue: "#3F00EB",
};

function html({ w, h }) {
  // Scale the type a touch for the wider README ratio.
  const titleSize = w >= 1500 ? 150 : 132;
  const subSize = w >= 1500 ? 36 : 32;
  const pad = w >= 1500 ? 96 : 76;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;900&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:${w}px; height:${h}px; }
  body {
    position:relative; overflow:hidden; background:${C.warmWhite};
    font-family:'Outfit',sans-serif; color:${C.charcoal};
  }
  .blob { position:absolute; filter:blur(0.5px); }
  .b-lav  { width:${h*0.95}px; height:${h*0.95}px; right:${-h*0.18}px; top:${-h*0.22}px;
            background:${C.softLav}; border-radius:42% 58% 63% 37% / 47% 39% 61% 53%; }
  .b-lime { width:${h*0.62}px; height:${h*0.62}px; right:${h*0.12}px; bottom:${-h*0.22}px;
            background:${C.lime}; border-radius:58% 42% 38% 62% / 55% 56% 44% 45%; }
  .b-orng { width:${h*0.30}px; height:${h*0.30}px; right:${h*0.30}px; top:${h*0.30}px;
            background:${C.orange}; border-radius:60% 40% 47% 53% / 38% 58% 42% 62%; opacity:.92; }
  .content { position:absolute; inset:0; padding:${pad}px; display:flex; flex-direction:column; justify-content:center; }
  .pill { align-self:flex-start; display:inline-flex; gap:.5em; align-items:center;
          background:${C.lavender}; color:${C.charcoal}; font-weight:700; font-size:${subSize*0.7}px;
          letter-spacing:.02em; padding:.5em 1em; border-radius:9999px; margin-bottom:${pad*0.32}px; }
  .pill b { color:${C.charcoal}; }
  h1 { font-size:${titleSize}px; line-height:.84; letter-spacing:-0.03em; margin-bottom:${pad*0.28}px; }
  .sub { font-size:${subSize}px; font-weight:500; color:${C.neutral600}; margin-bottom:${pad*0.42}px; }
  .ramp { display:flex; gap:${w>=1500?14:12}px; margin-bottom:${pad*0.5}px; }
  .ramp span { width:${w>=1500?64:54}px; height:${w>=1500?64:54}px; border-radius:18px;
               box-shadow:0 4px 12px rgba(0,0,0,.08); }
  .foot { position:absolute; left:${pad}px; bottom:${pad*0.7}px; height:${w>=1500?52:46}px; }
  .foot img { height:100%; }
</style></head>
<body>
  <div class="blob b-lav"></div>
  <div class="blob b-lime"></div>
  <div class="blob b-orng"></div>
  <div class="content">
    <span class="pill">v1.0.0 &nbsp;·&nbsp; For Everyone Berlin</span>
    <h1>Design<br>System</h1>
    <p class="sub">Design tokens, components &amp; patterns — one source of truth.</p>
    <div class="ramp">
      <span style="background:${C.lavender}"></span>
      <span style="background:${C.lime}"></span>
      <span style="background:${C.orange150}"></span>
      <span style="background:${C.orange300}"></span>
      <span style="background:${C.orange}"></span>
      <span style="background:${C.blue}"></span>
      <span style="background:${C.charcoal}"></span>
    </div>
  </div>
  <div class="foot"><img src="data:image/png;base64,${logoB64}" alt="For Everyone"></div>
</body></html>`;
}

const targets = [
  { name: "social-preview", w: 1200, h: 630 },
  { name: "readme-hero", w: 1500, h: 720 },
];

const browser = await chromium.launch();
const out = tmpdir();
for (const t of targets) {
  const page = await browser.newPage({ viewport: { width: t.w, height: t.h }, deviceScaleFactor: 2 });
  await page.setContent(html(t), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const file = join(out, `${t.name}.png`);
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width: t.w, height: t.h } });
  console.log(file);
  await page.close();
}
await browser.close();
