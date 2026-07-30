#!/usr/bin/env node
/**
 * Normalize Figma-exported SVGs from ForEveryone_Elements/ and copy into
 * prototype/public/ per the mapping table in docs/visual-styles.md.
 *
 * Usage (repo root):
 *   unzip -o ForEveryone_Elements.zip -d .
 *   node scripts/import-figma-elements.mjs
 *
 * Desktop exports: node scripts/import-desktop-elements.mjs --source=...
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { normalizeSvg } from "./svg-normalize.mjs";

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
  Doodle_Double_Underlines_2_2: {
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
