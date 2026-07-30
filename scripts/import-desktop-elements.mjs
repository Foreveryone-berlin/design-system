#!/usr/bin/env node
/**
 * Normalize desktop-exported SVGs and copy into prototype/public/.
 *
 * Usage (repo root):
 *   SOURCE_DIR="$HOME/Desktop" node scripts/import-desktop-elements.mjs
 *   node scripts/import-desktop-elements.mjs --source="C:/Users/marco/Desktop"
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import { normalizeSvg } from "./svg-normalize.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "prototype", "public");

const sourceArg = process.argv.find((a) => a.startsWith("--source="));
const SOURCE_DIR = sourceArg
  ? sourceArg.slice("--source=".length)
  : process.env.SOURCE_DIR;

/** @type {Record<string, { target: string; kind: import("./svg-normalize.mjs").normalizeSvg extends (a: string, b: infer K) => string ? K : never }>} */
const MAP = {
  Icon_Movement: { target: "icons/categories/movement.svg", kind: "category" },
  Icon_Music: { target: "icons/categories/music.svg", kind: "category" },
  Icon_Painting: { target: "icons/categories/arts-crafts.svg", kind: "category" },
  Icon_Writing_2: { target: "icons/categories/expression.svg", kind: "category" },

  Icon_Knitting_2: { target: "icons/workshop/knitting.svg", kind: "workshop" },
  Icon_Pottery_2: { target: "icons/workshop/pottery.svg", kind: "workshop" },
  Icon_Thread: { target: "icons/workshop/thread.svg", kind: "workshop" },
  Icon_Chess_1: { target: "icons/workshop/chess-filled.svg", kind: "workshop" },
  Icon_Writing_1: { target: "icons/workshop/writing.svg", kind: "workshop" },

  Facebook: { target: "icons/social/facebook.svg", kind: "social" },
  Instagram: { target: "icons/social/instagram.svg", kind: "social" },
  LinkedIn_1: { target: "icons/social/linkedin.svg", kind: "social" },
  Email_1: { target: "icons/social/email.svg", kind: "social" },
  Location: { target: "icons/social/location.svg", kind: "social" },

  Icon_Chess_2: { target: "illustrations/chess.svg", kind: "illo" },
  Group: { target: "illustrations/group.svg", kind: "illo" },
  Knitting: { target: "illustrations/knitting-line.svg", kind: "illo" },
  Pottery: { target: "illustrations/pottery-line.svg", kind: "illo" },
  Movement: { target: "illustrations/movement-line.svg", kind: "illo" },

  Doodle_Flower: { target: "illustrations/flower.svg", kind: "illo" },
  "Doodle_Flower-1": { target: "illustrations/variants/line/flower-variant-1.svg", kind: "illo" },
  "Doodle_Flower-2": { target: "illustrations/variants/line/flower-variant-2.svg", kind: "illo" },
  Doodle_Smile: { target: "illustrations/smiley.svg", kind: "illo" },
  Doodle_Cloud: { target: "illustrations/cloud.svg", kind: "illo" },
  Doodle_CoffeeCup: { target: "illustrations/coffee-cup.svg", kind: "illo" },
  Doodle_Donation: { target: "illustrations/donation-box.svg", kind: "illo" },
  Doodle_Leaves: { target: "illustrations/sprout.svg", kind: "illo" },
  "Doodle_Leaves-1": { target: "illustrations/variants/line/sprout-variant-1.svg", kind: "illo" },
  Doodle_Swirl: { target: "illustrations/accents/doodle-swirl.svg", kind: "accent" },
  Doodle_Underline: { target: "illustrations/accents/doodle-underline.svg", kind: "accent" },
  Doodle_Double_Underlines_2_2: {
    target: "illustrations/headline-underline.svg",
    kind: "accent",
  },
  Doodle_Double_Underlines_1: {
    target: "illustrations/variants/accents/headline-underline-variant-1.svg",
    kind: "accent",
  },
  Doodle_Arrow_2: { target: "illustrations/accents/doodle-arrow.svg", kind: "accent" },
  Doodle_Arrow_1: { target: "illustrations/variants/accents/doodle-arrow-variant-1.svg", kind: "accent" },
  Doodle_Circle_1: { target: "illustrations/accents/doodle-circle.svg", kind: "accent" },
  Doodle_Circle_2: { target: "illustrations/variants/accents/doodle-circle-variant-2.svg", kind: "accent" },
  Doodle_Sparkle: { target: "illustrations/accents/sparkle.svg", kind: "accent" },
  Doodle_Sparkle_1: { target: "illustrations/variants/accents/sparkle-variant-1.svg", kind: "accent" },
  Doodle_Sparkle_2: { target: "illustrations/variants/accents/sparkle-variant-2.svg", kind: "accent" },
  Doodle_Sparkle_3: { target: "illustrations/variants/accents/sparkle-variant-3.svg", kind: "accent" },
  Doodle_3_Sparkles: { target: "illustrations/accents/doodle-burst.svg", kind: "accent" },
  Doodle_Music_Note_2: { target: "illustrations/accents/music-note.svg", kind: "accent" },
  Doodle_Music_Note_1: {
    target: "illustrations/variants/accents/music-note-variant-1.svg",
    kind: "accent",
  },
  Doodle_Music_Note_3: {
    target: "illustrations/variants/accents/music-note-variant-3.svg",
    kind: "accent",
  },
  Doodle_Emphasis_Lines_2: { target: "illustrations/accents/asterisk.svg", kind: "accent" },
  Doodle_Emphasis_Lines_1: {
    target: "illustrations/variants/accents/emphasis-lines-variant-1.svg",
    kind: "accent",
  },
  "Doodle_Emphasis_Lines_2-1": {
    target: "illustrations/variants/accents/emphasis-lines-variant-2.svg",
    kind: "accent",
  },
  Doodle_Emphasis_Lines_3: {
    target: "illustrations/variants/accents/emphasis-lines-variant-3.svg",
    kind: "accent",
  },
  "Doodle_Emphasis_Lines_3-1": {
    target: "illustrations/variants/accents/emphasis-lines-variant-4.svg",
    kind: "accent",
  },

  Icon_Knitting: { target: "icons/variants/workshop/knitting-variant-1.svg", kind: "workshop" },
  Icon_Pottery_1: { target: "icons/variants/workshop/pottery-variant-1.svg", kind: "workshop" },
  Icon_Pottery_3: { target: "icons/variants/workshop/pottery-variant-3.svg", kind: "workshop" },
  Email_2: { target: "icons/variants/social/email-variant-2.svg", kind: "social" },
  Linkedin_2: { target: "icons/variants/social/linkedin-variant-2.svg", kind: "social" },
};

function optimizeWithSvgo(filePath) {
  try {
    execSync(`npx --yes svgo "${filePath}" -o "${filePath}" --multipass`, {
      stdio: "pipe",
      cwd: ROOT,
    });
  } catch {
    // SVGO optional
  }
}

/** SVGO can strip fills from the double-underline export; rebuild from path data. */
function repairHeadlineUnderline(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const pathMatches = [...raw.matchAll(/<path\b[^>]*\bd="([^"]+)"[^>]*>/gi)];
  if (pathMatches.length === 0) return;

  const viewBox = "0 0 500 54";
  const paths = pathMatches
    .map((m) => m[1].replace(/\s+/g, " ").trim())
    .map((d) => `<path fill="currentColor" d="${d}"/>`)
    .join("");

  const repaired = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="currentColor" aria-hidden="true">${paths}</svg>\n`;
  fs.writeFileSync(filePath, repaired, "utf8");
}

function main() {
  if (!SOURCE_DIR || !fs.existsSync(SOURCE_DIR)) {
    console.error(
      "Missing source directory. Set SOURCE_DIR or pass --source=PATH",
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
    if (target === "illustrations/headline-underline.svg") {
      repairHeadlineUnderline(outPath);
    }
    console.log(`${sourceName}.svg → ${target}`);
    written += 1;
  }

  console.log(`\nDone: ${written} written, ${skipped} skipped.`);
  console.log("balance-wellness.svg unchanged (no desktop source).");
}

main();
