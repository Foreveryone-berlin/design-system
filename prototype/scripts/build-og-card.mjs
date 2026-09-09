// Generates the social (OG/Twitter/GitHub) card and the README hero from one
// design-system-driven HTML template. Renders with headless Chromium, then the
// caller converts the PNGs to optimised JPGs.
//
//   node scripts/build-og-card.mjs [variant] [outDir]
//
//   variant: blobs (default) | ramp | doodle | type
//            | doodle-v1 | doodle-v2 | doodle-v3  (logo-free doodle studies)
//   outDir:  where the PNGs land (default: os.tmpdir())
//
// Colours come from css/custom-properties.css, which is generated from
// tokens/*.json — the file is injected verbatim so `var(--color-*)` resolves in
// Chromium (which supports oklch() natively). Never hardcode hex here; a token
// change must flow straight into the cards.
import { chromium } from "playwright";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..", "..");
const publicDir = join(__dirname, "..", "public");

const VARIANTS = ["blobs", "ramp", "doodle", "type", "doodle-v1", "doodle-v2", "doodle-v3"];
const variant = process.argv[2] ?? "blobs";
if (!VARIANTS.includes(variant)) {
  console.error(`unknown variant "${variant}" — expected one of ${VARIANTS.join(", ")}`);
  process.exit(1);
}
const outDir = process.argv[3] ?? tmpdir();
mkdirSync(outDir, { recursive: true });

const tokenCss = readFileSync(join(repoRoot, "css", "custom-properties.css"), "utf8");

function dataUri(relPath, mime) {
  const b64 = readFileSync(join(publicDir, relPath)).toString("base64");
  return `data:${mime};base64,${b64}`;
}

const logoUri = dataUri("images/foreveryone-logo.png", "image/png");
const svgUri = (p) => dataUri(p, "image/svg+xml");

// Filson Pro is licensed and not vendored in this repo, so the cards render in
// Outfit — the closest free geometric sans — as a documented stand-in.
const FONT_LINKS = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&display=swap" rel="stylesheet">`;

const RAMP_ORANGE = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800];
const RAMP_GREEN = [50, 100, 150, 200, 300, 400, 500, 600, 700, 800];
const RAMP_NEUTRAL = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function shell({ w, h, body, extraCss = "", footer = true }) {
  const pad = w >= 1500 ? 96 : 76;
  return `<!doctype html><html><head><meta charset="utf-8">${FONT_LINKS}
<style>
${tokenCss}
* { margin:0; padding:0; box-sizing:border-box; }
html,body { width:${w}px; height:${h}px; }
body {
  position:relative; overflow:hidden;
  background:var(--color-accent);
  font-family:'Outfit',sans-serif;
  color:var(--color-brand-dark);
}
.content { position:absolute; inset:0; padding:${pad}px;
           display:flex; flex-direction:column; justify-content:center; }
.foot { position:absolute; left:${pad}px; bottom:${pad * 0.7}px; height:${w >= 1500 ? 38 : 34}px; }
.foot img { height:100%; }
.mark { background-color:var(--color-brand-primary);
        -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat;
        -webkit-mask-position:center; mask-position:center;
        -webkit-mask-size:contain; mask-size:contain; }
${extraCss}
</style></head><body>${body}
${footer ? `<div class="foot"><img src="${logoUri}" alt="ForEveryone"></div>` : ""}
</body></html>`;
}

/** Current composition: blob field, headline, swatch ramp, wordmark. */
function blobsCard({ w, h }) {
  const titleSize = w >= 1500 ? 150 : 132;
  const subSize = w >= 1500 ? 36 : 32;
  const pad = w >= 1500 ? 96 : 76;
  const swatch = w >= 1500 ? 64 : 54;
  return shell({
    w,
    h,
    extraCss: `
.blob { position:absolute; filter:blur(0.5px); }
.b-lav  { width:${h * 0.95}px; height:${h * 0.95}px; right:${-h * 0.18}px; top:${-h * 0.22}px;
          background:var(--color-soft-lavender); border-radius:42% 58% 63% 37% / 47% 39% 61% 53%; }
.b-lime { width:${h * 0.62}px; height:${h * 0.62}px; right:${h * 0.12}px; bottom:${-h * 0.22}px;
          background:var(--color-light-green); border-radius:58% 42% 38% 62% / 55% 56% 44% 45%; }
.b-orng { width:${h * 0.3}px; height:${h * 0.3}px; right:${h * 0.3}px; top:${h * 0.3}px;
          background:var(--color-brand-primary); border-radius:60% 40% 47% 53% / 38% 58% 42% 62%; opacity:.92; }
h1 { font-size:${titleSize}px; font-weight:900; line-height:.84; letter-spacing:-0.03em; margin-bottom:${pad * 0.28}px; }
.sub { font-size:${subSize}px; font-weight:500; color:var(--color-neutral-600); margin-bottom:${pad * 0.42}px; }
.ramp { display:flex; gap:${w >= 1500 ? 14 : 12}px; margin-bottom:${pad * 0.5}px; }
.ramp span { width:${swatch}px; height:${swatch}px; border-radius:18px;
             box-shadow:0 4px 12px rgb(0 0 0 / 8%); }`,
    body: `
<div class="blob b-lav"></div><div class="blob b-lime"></div><div class="blob b-orng"></div>
<div class="content">
  <h1>Design<br>System</h1>
  <p class="sub">Design tokens, components &amp; patterns.</p>
  <div class="ramp">
    <span style="background:var(--color-light-purple)"></span>
    <span style="background:var(--color-light-green)"></span>
    <span style="background:var(--color-orange-150)"></span>
    <span style="background:var(--color-orange-300)"></span>
    <span style="background:var(--color-brand-primary)"></span>
    <span style="background:var(--color-brand-secondary)"></span>
    <span style="background:var(--color-brand-dark)"></span>
  </div>
</div>`,
  });
}

/** Ramp-forward: the card is a picture of the OKLCH token scales. */
function rampCard({ w, h }) {
  const titleSize = w >= 1500 ? 118 : 104;
  const subSize = w >= 1500 ? 32 : 28;
  const pad = w >= 1500 ? 96 : 76;
  const row = (name, steps) =>
    `<div class="ramp-row"><span class="ramp-label">${name}</span><div class="ramp-bar">${steps
      .map((s) => `<i style="background:var(--color-${name}-${s})"></i>`)
      .join("")}</div></div>`;
  return shell({
    w,
    h,
    extraCss: `
.content { justify-content:center; gap:${pad * 0.34}px; }
.head { display:flex; align-items:flex-end; gap:${pad * 0.4}px; }
h1 { font-size:${titleSize}px; font-weight:900; line-height:.86; letter-spacing:-0.03em; }
.sub { font-size:${subSize}px; font-weight:500; color:var(--color-neutral-600); padding-bottom:${pad * 0.12}px; }
.ramps { display:flex; flex-direction:column; gap:${pad * 0.16}px; width:${w - pad * 2}px; }
.ramp-row { display:flex; align-items:center; gap:${pad * 0.22}px; }
.ramp-label { width:${pad * 1.1}px; font-size:${subSize * 0.62}px; font-weight:500;
              text-transform:uppercase; letter-spacing:.14em; color:var(--color-neutral-500); }
.ramp-bar { flex:1; display:flex; height:${h * 0.075}px; border-radius:${h * 0.038}px; overflow:hidden;
            box-shadow:0 4px 14px rgb(0 0 0 / 8%); }
.ramp-bar i { flex:1; }
.blob-anchor { position:absolute; right:${-h * 0.16}px; top:${-h * 0.24}px;
               width:${h * 0.66}px; height:${h * 0.58}px; background:var(--color-soft-lavender);
               border-radius:42% 58% 63% 37% / 47% 39% 61% 53%; }`,
    body: `
<div class="blob-anchor"></div>
<div class="content">
  <div class="head">
    <h1>Design<br>System</h1>
    <p class="sub">One token set.<br>Every surface.</p>
  </div>
  <div class="ramps">
    ${row("orange", RAMP_ORANGE)}
    ${row("green", RAMP_GREEN)}
    ${row("neutral", RAMP_NEUTRAL)}
  </div>
</div>`,
  });
}

/**
 * Doodle-led: lime title band, hand-drawn marks, closest to the live site.
 * The headline carries the brand name, so this variant drops the wordmark
 * lockup rather than saying "ForEveryone" twice.
 */
function doodleCard({ w, h }) {
  const titleSize = w >= 1500 ? 128 : 112;
  const subSize = w >= 1500 ? 36 : 32;
  const pad = w >= 1500 ? 96 : 76;
  return shell({
    w,
    h,
    // The wave leaves a Warm White band across the bottom; the wordmark sits in
    // it, which is the only place on this card where it lands on a flat ground.
    footer: true,
    extraCss: `
body { background:var(--color-background-title); }
.wave { position:absolute; left:0; right:0; bottom:0; height:${h * 0.3}px;
        background-color:var(--color-accent);
        -webkit-mask-image:url("${svgUri("illustrations/waves/wave-h1.svg")}");
        mask-image:url("${svgUri("illustrations/waves/wave-h1.svg")}");
        -webkit-mask-size:100% 100%; mask-size:100% 100%;
        -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat; }
h1 { font-size:${titleSize}px; font-weight:700; line-height:.9; letter-spacing:-0.03em; }
.underline { display:block; width:${w * 0.52}px; height:${h * 0.07}px; margin-top:${pad * 0.1}px;
             -webkit-mask-image:url("${svgUri("illustrations/accents/doodle-underline.svg")}");
             mask-image:url("${svgUri("illustrations/accents/doodle-underline.svg")}"); }
.sub { font-size:${subSize}px; font-weight:500; color:var(--color-neutral-600); margin-top:${pad * 0.3}px; }
.spot { position:absolute; }
.s-sprout { width:${h * 0.2}px; height:${h * 0.2}px; right:${w * 0.1}px; top:${h * 0.14}px;
            -webkit-mask-image:url("${svgUri("illustrations/sprout.svg")}");
            mask-image:url("${svgUri("illustrations/sprout.svg")}"); }
.s-smiley { width:${h * 0.15}px; height:${h * 0.15}px; right:${w * 0.19}px; top:${h * 0.42}px;
            -webkit-mask-image:url("${svgUri("illustrations/smiley.svg")}");
            mask-image:url("${svgUri("illustrations/smiley.svg")}"); }
.s-swirl  { width:${h * 0.22}px; height:${h * 0.16}px; right:${w * 0.06}px; top:${h * 0.56}px;
            -webkit-mask-image:url("${svgUri("illustrations/accents/doodle-swirl.svg")}");
            mask-image:url("${svgUri("illustrations/accents/doodle-swirl.svg")}"); }`,
    body: `
<div class="wave"></div>
<span class="spot mark s-sprout"></span>
<span class="spot mark s-smiley"></span>
<span class="spot mark s-swirl"></span>
<div class="content">
  <h1>ForEveryone<br>Design System</h1>
  <span class="underline mark"></span>
  <p class="sub">Design tokens, components &amp; patterns.</p>
</div>`,
  });
}

/**
 * Logo-free doodle studies. The wordmark lockup is dropped and the brand name
 * lives in the headline instead, which frees the bottom wave band and lets the
 * hand-drawn marks grow: they read as decoration at the old scale, as part of
 * the composition at this one. Same palette, same marks, same left-aligned
 * stack as `doodle` — only type size, mark scale, and spacing move.
 *
 * `spots` are given as fractions: size/offsets of h (vertical) and w (right
 * inset) so both card ratios stay proportionate from one set of numbers.
 */
function doodleStudy({ w, h }, cfg) {
  const wide = w >= 1500;
  const titleSize = Math.round((wide ? 128 : 112) * cfg.titleScale);
  const subSize = wide ? 36 : 32;
  const pad = wide ? 96 : 76;
  const spot = (cls, file, s) => `
.${cls} { width:${h * s.w}px; height:${h * s.h}px; right:${w * s.right}px; top:${h * s.top}px;
          -webkit-mask-image:url("${svgUri(file)}");
          mask-image:url("${svgUri(file)}"); }`;

  return shell({
    w,
    h,
    // No lockup: "ForEveryone" is set in the headline, so a wordmark in the
    // wave band would say the brand name twice.
    footer: false,
    extraCss: `
body { background:var(--color-background-title); }
.wave { position:absolute; left:0; right:0; bottom:0; height:${h * 0.3}px;
        background-color:var(--color-accent);
        -webkit-mask-image:url("${svgUri("illustrations/waves/wave-h1.svg")}");
        mask-image:url("${svgUri("illustrations/waves/wave-h1.svg")}");
        -webkit-mask-size:100% 100%; mask-size:100% 100%;
        -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat; }
.content { ${cfg.contentCss(pad)} }
h1 { font-size:${titleSize}px; font-weight:700; line-height:.9; letter-spacing:-0.03em; }
.underline { display:block; width:${w * cfg.underline}px; height:${h * 0.07}px; margin-top:${pad * 0.1}px;
             -webkit-mask-image:url("${svgUri("illustrations/accents/doodle-underline.svg")}");
             mask-image:url("${svgUri("illustrations/accents/doodle-underline.svg")}"); }
.sub { font-size:${subSize}px; font-weight:500; color:var(--color-neutral-600); margin-top:${pad * cfg.subGap}px; }
.spot { position:absolute; }
${spot("s-sprout", "illustrations/sprout.svg", cfg.spots.sprout)}
${spot("s-smiley", "illustrations/smiley.svg", cfg.spots.smiley)}
${spot("s-swirl", "illustrations/accents/doodle-swirl.svg", cfg.spots.swirl)}`,
    body: `
<div class="wave"></div>
<span class="spot mark s-sprout"></span>
<span class="spot mark s-smiley"></span>
<span class="spot mark s-swirl"></span>
<div class="content">
  <h1>ForEveryone<br>Design System</h1>
  <span class="underline mark"></span>
  <p class="sub">Design tokens, components &amp; patterns.</p>
</div>`,
  });
}

/** v1 — steady: the shipped layout with the marks stepped up about a third. */
const DOODLE_V1 = {
  titleScale: 1,
  underline: 0.52,
  subGap: 0.3,
  // Lift the stack clear of the wave band the wordmark used to occupy.
  contentCss: (pad) => `justify-content:center; padding-bottom:${pad * 1.15}px;`,
  spots: {
    sprout: { w: 0.27, h: 0.27, right: 0.09, top: 0.1 },
    smiley: { w: 0.2, h: 0.2, right: 0.19, top: 0.4 },
    swirl: { w: 0.3, h: 0.215, right: 0.05, top: 0.55 },
  },
};

/** v2 — cluster: smaller headline, marks grouped tighter and larger still. */
const DOODLE_V2 = {
  titleScale: 0.92,
  underline: 0.46,
  subGap: 0.34,
  contentCss: (pad) => `justify-content:center; padding-bottom:${pad * 1.3}px;`,
  spots: {
    sprout: { w: 0.32, h: 0.32, right: 0.08, top: 0.07 },
    smiley: { w: 0.24, h: 0.24, right: 0.2, top: 0.36 },
    swirl: { w: 0.36, h: 0.26, right: 0.05, top: 0.56 },
  },
};

/** v3 — airy: headline top-anchored, subline drops into the wave band. */
const DOODLE_V3 = {
  titleScale: 0.88,
  underline: 0.44,
  subGap: 0.85,
  contentCss: (pad) => `justify-content:flex-start; padding-top:${pad * 0.95}px;`,
  spots: {
    sprout: { w: 0.34, h: 0.34, right: 0.06, top: 0.05 },
    smiley: { w: 0.26, h: 0.26, right: 0.21, top: 0.32 },
    swirl: { w: 0.4, h: 0.29, right: 0.04, top: 0.55 },
  },
};

/** Type specimen: the scale itself, one blob anchor, minimal colour. */
function typeCard({ w, h }) {
  const titleSize = w >= 1500 ? 124 : 108;
  const pad = w >= 1500 ? 96 : 76;
  const steps = [
    { label: "H1 / 84", size: w >= 1500 ? 46 : 40, weight: 700 },
    { label: "H2 / 48", size: w >= 1500 ? 33 : 29, weight: 700 },
    { label: "H3 / 20", size: w >= 1500 ? 24 : 21, weight: 500 },
    { label: "Body / 16", size: w >= 1500 ? 19 : 17, weight: 400 },
  ];
  return shell({
    w,
    h,
    extraCss: `
.blob-anchor { position:absolute; right:${-h * 0.26}px; bottom:${-h * 0.34}px;
               width:${h * 0.92}px; height:${h * 0.8}px; background:var(--color-light-green);
               border-radius:58% 42% 38% 62% / 55% 56% 44% 45%; }
/* Reserve the footer band so the smallest scale step never collides with the
   wordmark lockup. */
.content { justify-content:center; gap:${pad * 0.3}px; padding-bottom:${pad * 1.7}px; }
h1 { font-size:${titleSize}px; font-weight:900; line-height:.82; letter-spacing:-0.04em; }
.scale { display:flex; flex-direction:column; gap:${pad * 0.1}px; }
.step { display:flex; align-items:baseline; gap:${pad * 0.28}px; }
.step em { font-style:normal; width:${pad * 1.5}px; font-size:${w >= 1500 ? 17 : 15}px; font-weight:500;
           text-transform:uppercase; letter-spacing:.12em; color:var(--color-neutral-500); }
.rule { flex:0 0 auto; width:${w * 0.3}px; height:${w >= 1500 ? 6 : 5}px; border-radius:999px;
        background:var(--color-brand-primary); }`,
    body: `
<div class="blob-anchor"></div>
<div class="content">
  <h1>Design<br>System</h1>
  <span class="rule"></span>
  <div class="scale">
    ${steps
      .map(
        (s) =>
          `<p class="step"><em>${s.label}</em><span style="font-size:${s.size}px;font-weight:${s.weight}">Community, in every size</span></p>`,
      )
      .join("")}
  </div>
</div>`,
  });
}

const RENDERERS = {
  blobs: blobsCard,
  ramp: rampCard,
  doodle: doodleCard,
  type: typeCard,
  "doodle-v1": (t) => doodleStudy(t, DOODLE_V1),
  "doodle-v2": (t) => doodleStudy(t, DOODLE_V2),
  "doodle-v3": (t) => doodleStudy(t, DOODLE_V3),
};

const targets = [
  { name: "social-preview", w: 1200, h: 630 },
  { name: "readme-hero", w: 1500, h: 720 },
];

const browser = await chromium.launch();
for (const t of targets) {
  const page = await browser.newPage({
    viewport: { width: t.w, height: t.h },
    deviceScaleFactor: 2,
  });
  await page.setContent(RENDERERS[variant](t), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const file = join(outDir, `${variant}-${t.name}.png`);
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width: t.w, height: t.h } });
  console.log(file);
  await page.close();
}
await browser.close();
