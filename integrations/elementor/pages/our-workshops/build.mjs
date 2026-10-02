// Builds a single self-contained preview of the Our Workshops redesign:
// template.html + the shared css/ layers inlined, prototype photos as data
// URIs, brand SVGs as CSS custom properties for masks.
// Usage (repo root): node integrations/elementor/pages/our-workshops/build.mjs [out.html]
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "../../../..");
const pub = join(repo, "prototype/public");
const out = resolve(process.argv[2] ?? join(tmpdir(), "our-workshops-preview.html"));

const svgs = {
  "cat-arts": "icons/categories/arts-crafts.svg",
  "cat-balance": "icons/categories/balance-wellness.svg",
  "cat-expression": "icons/categories/expression.svg",
  "cat-movement": "icons/categories/movement.svg",
  "cat-music": "icons/categories/music.svg",
  "act-pottery": "icons/workshop/pottery.svg",
  "act-knitting": "icons/workshop/knitting.svg",
  "act-thread": "icons/workshop/thread.svg",
  "act-chess": "icons/workshop/chess-filled.svg",
  "act-writing": "icons/workshop/writing.svg",
  "ill-underline": "illustrations/headline-underline.svg",
  "ill-group": "illustrations/group.svg",
  "ill-cup": "illustrations/coffee-cup.svg",
  "ill-pottery": "illustrations/pottery-line.svg",
  "ill-flower": "illustrations/flower.svg",
  "ill-sprout": "illustrations/sprout.svg",
  "ill-smiley": "illustrations/smiley.svg",
  "ill-cloud": "illustrations/cloud.svg",
  "acc-sparkle": "illustrations/accents/sparkle.svg",
  "acc-arrow": "illustrations/accents/doodle-arrow.svg",
  "acc-underline": "illustrations/accents/doodle-underline.svg",
};

const vars = Object.entries(svgs)
  .map(([k, p]) => {
    const svg = readFileSync(join(pub, p), "utf8").replace(/\s+/g, " ").trim();
    return `  --svg-${k}: url("data:image/svg+xml,${encodeURIComponent(svg)}");`;
  })
  .join("\n");

const wave = readFileSync(join(pub, "illustrations/waves/wave-h1.svg"), "utf8")
  .replace(/ color="[^"]*"/, "")
  .replace("<svg ", '<svg class="wave" ');

let html = readFileSync(join(here, "template.html"), "utf8")
  .replace("/*SVG_VARS*/", `:root {\n${vars}\n}`)
  .replaceAll("<!--WAVE-->", wave)
  .replace(/<link rel="stylesheet" href="css\/([\w-]+\.css)">/g, (_, f) =>
    `<style>/* ${f} */\n${readFileSync(join(repo, "css", f), "utf8")}</style>`);
html = html.replace(/src="images\/([\w-]+\.jpg)"/g, (_, f) =>
  `src="data:image/jpeg;base64,${readFileSync(join(pub, "images", f)).toString("base64")}"`);
if (/href="css\/|src="images\//.test(html)) throw new Error("unresolved local asset reference");

writeFileSync(out, html);
console.log("wrote", out);
