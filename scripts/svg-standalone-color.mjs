#!/usr/bin/env node

/* eslint-disable no-console */

// Stamps the root `color` presentation attribute on every shipped asset that
// paints with `currentColor`, so a downloaded .svg opens in its brand colour
// instead of black. Idempotent: rewrites an existing `color` attribute to the
// value the asset family mandates, and skips files that bake their own hexes
// (the QR code, for example).
//
// Run after importing or re-exporting assets: `node scripts/svg-standalone-color.mjs`
// (add `--check` in CI to fail instead of write).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { STANDALONE_COLOR } from "./svg-normalize.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "prototype", "public");

/** Asset directory → normalizer kind, i.e. which brand colour the family owns. */
export const ASSET_KINDS = [
  ["icons/categories", "category"],
  ["icons/workshop", "workshop"],
  ["icons/social", "social"],
  ["icons/ui", "ui"],
  ["illustrations", "illo"],
  ["illustrations/accents", "accent"],
  ["illustrations/avatars", "illo"],
  ["illustrations/variants/accents", "accent"],
  ["illustrations/variants/line", "illo"],
  ["illustrations/blobs", "blob"],
  ["illustrations/waves", "wave"],
];

/** @returns {string | null} rewritten markup, or null when nothing to change. */
export function withStandaloneColor(svg, kind) {
  const color = STANDALONE_COLOR[kind];
  if (!color) return null;
  // Nothing to tint: the asset paints with baked hexes (QR code, vase).
  if (!svg.includes("currentColor")) return null;

  const root = svg.match(/<svg[^>]*>/i);
  if (!root) return null;

  const existing = root[0].match(/\scolor="([^"]*)"/i);
  if (existing) {
    if (existing[1] === color) return null;
    return svg.replace(root[0], root[0].replace(/\scolor="[^"]*"/i, ` color="${color}"`));
  }

  return svg.replace(root[0], root[0].replace(/^<svg/i, `<svg color="${color}"`));
}

function main() {
  const check = process.argv.includes("--check");
  const changed = [];

  for (const [rel, kind] of ASSET_KINDS) {
    const dir = path.join(PUBLIC, rel);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".svg"))) {
      const full = path.join(dir, file);
      const svg = fs.readFileSync(full, "utf8");
      const next = withStandaloneColor(svg, kind);
      if (!next) continue;
      changed.push(`${rel}/${file} → ${STANDALONE_COLOR[kind]}`);
      if (!check) fs.writeFileSync(full, next);
    }
  }

  if (changed.length === 0) {
    console.log("svg-standalone-color: all assets already carry their brand colour");
    return;
  }

  console.log(`svg-standalone-color: ${check ? "would update" : "updated"} ${changed.length} file(s)`);
  for (const line of changed) console.log(`  ${line}`);
  if (check) process.exit(1);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  main();
}
