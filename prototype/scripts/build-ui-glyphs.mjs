#!/usr/bin/env node

/* eslint-disable no-console */

// Writes a standalone .svg for every inline UI stroke glyph, so the Visual
// Elements catalog can offer them as downloads like every other asset family.
//
//   node scripts/build-ui-glyphs.mjs [--check]
//
// The artwork comes from app/_components/ui-glyph-markup.ts, the same module
// FeIcon injects inline: one definition, so a shipped file can never drift from
// what the page renders. Node strips the TypeScript annotations on import.
//
// Glyphs are functional, not decorative, so the standalone colour is Charcoal
// rather than brand orange (see scripts/svg-standalone-color.mjs).

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { UI_GLYPH_MARKUP, UI_GLYPH_ROOT } from "../app/_components/ui-glyph-markup.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "icons", "ui");
const STANDALONE_COLOR = "#1E1E1E";

function svgFor(markup) {
  const { viewBox, fill, stroke, strokeWidth, strokeLinecap, strokeLinejoin } = UI_GLYPH_ROOT;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="${fill}"` +
    ` stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="${strokeLinecap}"` +
    ` stroke-linejoin="${strokeLinejoin}" color="${STANDALONE_COLOR}" aria-hidden="true"` +
    ` focusable="false">${markup.replace(/\s+/g, " ").trim()}</svg>\n`
  );
}

const check = process.argv.includes("--check");
mkdirSync(OUT_DIR, { recursive: true });

const stale = [];
for (const [name, markup] of Object.entries(UI_GLYPH_MARKUP)) {
  const file = join(OUT_DIR, `${name}.svg`);
  const next = svgFor(markup);
  const current = existsSync(file) ? readFileSync(file, "utf8") : null;
  if (current === next) continue;
  stale.push(name);
  if (!check) writeFileSync(file, next);
}

if (stale.length === 0) {
  console.log("build-ui-glyphs: all UI glyph files match ui-glyph-markup.ts");
} else {
  console.log(`build-ui-glyphs: ${check ? "stale" : "wrote"} ${stale.length} file(s): ${stale.join(", ")}`);
  if (check) process.exit(1);
}
