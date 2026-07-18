#!/usr/bin/env node
/**
 * Normalize Figma-exported SVGs from ForEveryone_Elements/ and copy into
 * prototype/public/ per the mapping table in docs/visual-styles.md.
 *
 * Usage (repo root):
 *   unzip -o ForEveryone_Elements.zip -d .
 *   node scripts/import-figma-elements.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE_DIR = path.join(ROOT, "ForEveryone_Elements");
const PUBLIC = path.join(ROOT, "prototype", "public");

/** @type {Record<string, { target: string; kind: "category" | "illo" | "accent" | "blob" | "wave" }>} */
const MAP = {
  Icon_Movement: { target: "icons/categories/movement.svg", kind: "category" },
  Icon_Music: { target: "icons/categories/music.svg", kind: "category" },
  Icon_Painting: { target: "icons/categories/arts-crafts.svg", kind: "category" },
  Icon_Writing_2: { target: "icons/categories/expression.svg", kind: "category" },
  Icon_Chess_2: { target: "illustrations/chess.svg", kind: "illo" },

  Doodle_Flower: { target: "illustrations/flower.svg", kind: "illo" },
  Doodle_Smile: { target: "illustrations/smiley.svg", kind: "illo" },
  Doodle_Cloud: { target: "illustrations/cloud.svg", kind: "illo" },
  Doodle_CoffeeCup: { target: "illustrations/coffee-cup.svg", kind: "illo" },
  Doodle_Donation: { target: "illustrations/donation-box.svg", kind: "illo" },
  Doodle_Leaves: { target: "illustrations/sprout.svg", kind: "illo" },
  Doodle_Swirl: { target: "illustrations/accents/doodle-swirl.svg", kind: "accent" },

  Doodle_Underline: { target: "illustrations/accents/doodle-underline.svg", kind: "accent" },
  Doodle_Double_Underlines_1: {
    target: "illustrations/headline-underline.svg",
    kind: "accent",
  },
  Doodle_Arrow_2: { target: "illustrations/accents/doodle-arrow.svg", kind: "accent" },
  Doodle_Circle_1: { target: "illustrations/accents/doodle-circle.svg", kind: "accent" },
  Doodle_Sparkle: { target: "illustrations/accents/sparkle.svg", kind: "accent" },
  Doodle_3_Sparkles: { target: "illustrations/accents/doodle-burst.svg", kind: "accent" },
  Doodle_Music_Note_2: { target: "illustrations/accents/music-note.svg", kind: "accent" },
  Doodle_Emphasis_Lines_2: { target: "illustrations/accents/asterisk.svg", kind: "accent" },

  Blob_1: { target: "illustrations/blobs/blob-1.svg", kind: "blob" },
  Blob_2: { target: "illustrations/blobs/blob-2.svg", kind: "blob" },
  Blob_3: { target: "illustrations/blobs/blob-3.svg", kind: "blob" },
  Blob_4: { target: "illustrations/blobs/blob-4.svg", kind: "blob" },

  Wave_1: { target: "illustrations/waves/wave-h1.svg", kind: "wave" },
  Wave_2: { target: "illustrations/waves/wave-h2.svg", kind: "wave" },
  Wave_3: { target: "illustrations/waves/wave-h3.svg", kind: "wave" },
};

const RECOLOR_FILLS = ["#ff7a3a", "#FF7A3A", "#d4e6a8", "#D4E6A8"];

/** Figma exports use clipPath rects; crop viewBox before defs are stripped. */
function extractClipViewBox(svg) {
  const clipRects = [];
  const clipPathBlocks = svg.match(/<clipPath[\s\S]*?<\/clipPath>/gi) || [];
  for (const block of clipPathBlocks) {
    const pathMatch = block.match(/<path d="M\s*([^"]+)"/i);
    if (!pathMatch) continue;
    const nums = pathMatch[1].match(/[-+]?[\d.]+(?:e[-+]?[\d]+)?/gi);
    if (!nums || nums.length < 4) continue;
    const coords = nums.map(Number).filter((n) => !Number.isNaN(n));
    const xs = [];
    const ys = [];
    for (let i = 0; i + 1 < coords.length; i += 2) {
      xs.push(coords[i]);
      ys.push(coords[i + 1]);
    }
    if (xs.length === 0) continue;
    clipRects.push({
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    });
  }
  if (clipRects.length === 0) return null;
  const minX = Math.min(...clipRects.map((r) => r.minX));
  const minY = Math.min(...clipRects.map((r) => r.minY));
  const maxX = Math.max(...clipRects.map((r) => r.maxX));
  const maxY = Math.max(...clipRects.map((r) => r.maxY));
  return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
}

/** Paths without clipPath (e.g. Doodle_Underline): crop to path bounds. */
function extractPathViewBox(svg) {
  let pathBbox;
  try {
    pathBbox = require("svg-path-bbox").svgPathBbox;
  } catch {
    return null;
  }

  const paths = [...svg.matchAll(/\sd="([^"]+)"/g)].map((m) => m[1]);
  if (paths.length === 0) return null;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const d of paths) {
    const [x0, y0, x1, y1] = pathBbox(d);
    minX = Math.min(minX, x0);
    minY = Math.min(minY, y0);
    maxX = Math.max(maxX, x1);
    maxY = Math.max(maxY, y1);
  }

  if (!Number.isFinite(minX)) return null;

  const pad = 2;
  return `${minX - pad} ${minY - pad} ${maxX - minX + 2 * pad} ${maxY - minY + 2 * pad}`;
}

function applyViewBox(svg, viewBox) {
  if (svg.includes('viewBox="')) {
    return svg.replace(/viewBox="[^"]*"/, `viewBox="${viewBox}"`);
  }
  return svg.replace(/<svg/i, `<svg viewBox="${viewBox}"`);
}

function normalizeSvg(raw, kind) {
  let svg = raw;
  const cropViewBox = extractClipViewBox(svg) ?? extractPathViewBox(svg);

  svg = svg.replace(/<rect[^>]*fill="#ffffff"[^>]*\/>/gi, "");
  svg = svg.replace(/<rect[^>]*fill="#fff"[^>]*\/>/gi, "");
  svg = svg.replace(/xmlns:xlink="[^"]*"/g, "");
  svg = svg.replace(/\s(width|height|zoomAndPan|version)="[^"]*"/gi, "");

  for (const hex of RECOLOR_FILLS) {
    const re = new RegExp(`fill="${hex}"`, "gi");
    svg = svg.replace(re, 'fill="currentColor"');
  }

  svg = svg.replace(/fill="#ffffff"/gi, 'fill="none"');
  svg = svg.replace(/fill="#fff"/gi, 'fill="none"');
  svg = svg.replace(/fill-opacity="1"/gi, "");

  svg = svg.replace(/<defs>[\s\S]*?<\/defs>/gi, "");
  svg = svg.replace(/<g clip-path="url\([^)]+\)">/gi, "<g>");
  svg = svg.replace(/clip-path="url\([^)]+\)"/gi, "");
  svg = svg.replace(/clip-rule="nonzero"/gi, "");

  if (cropViewBox) {
    svg = applyViewBox(svg, cropViewBox);
  }

  const waveAttrs = kind === "wave" ? ' preserveAspectRatio="none"' : "";

  if (kind === "category") {
    svg = svg.replace(
      /<svg([^>]*)>/i,
      `<svg xmlns="http://www.w3.org/2000/svg"$1 fill="currentColor" aria-hidden="true" focusable="false"${waveAttrs}>`,
    );
  } else {
    svg = svg.replace(
      /<svg([^>]*)>/i,
      `<svg xmlns="http://www.w3.org/2000/svg"$1 fill="currentColor" aria-hidden="true"${waveAttrs}>`,
    );
  }

  return svg.trim();
}

function optimizeWithSvgo(filePath) {
  try {
    execSync(`npx --yes svgo "${filePath}" -o "${filePath}" --multipass`, {
      stdio: "pipe",
      cwd: ROOT,
    });
  } catch {
    // SVGO optional; normalized output is still usable.
  }
}

function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(
      "Missing ForEveryone_Elements/. Extract the zip first:\n  unzip -o ForEveryone_Elements.zip -d .",
    );
    process.exit(1);
  }

  let written = 0;
  let skipped = 0;

  for (const [sourceName, { target, kind }] of Object.entries(MAP)) {
    const sourcePath = path.join(SOURCE_DIR, `${sourceName}.svg`);
    if (!fs.existsSync(sourcePath)) {
      console.warn(`skip (missing source): ${sourceName}.svg`);
      skipped += 1;
      continue;
    }

    const raw = fs.readFileSync(sourcePath, "utf8");
    const normalized = normalizeSvg(raw, kind);
    const outPath = path.join(PUBLIC, target);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, normalized, "utf8");
    optimizeWithSvgo(outPath);
    console.log(`${sourceName}.svg → ${target}`);
    written += 1;
  }

  console.log(`\nDone: ${written} written, ${skipped} skipped.`);
  console.log(
    "balance-wellness.svg unchanged (no zip source). blob-5..7 and wave corners unchanged.",
  );
}

main();
