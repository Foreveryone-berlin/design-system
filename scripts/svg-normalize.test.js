#!/usr/bin/env node

/* eslint-disable no-console */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeSvg } from "./svg-normalize.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ICON_DIRS = [
  path.join(ROOT, "prototype", "public", "icons", "categories"),
  path.join(ROOT, "prototype", "public", "icons", "workshop"),
];

let failures = 0;
let passed = 0;

function ok(name) {
  passed += 1;
  console.log(`  ok ${name}`);
}

function fail(name, detail) {
  failures += 1;
  console.error(`  FAIL ${name}\n      ${detail}`);
}

/** Illustrator clip scaffolding that empties CSS mask-image glyphs. */
const ORPHAN_CLIP_RE = /clipPath|xlink:href|style="[^"]*clip-path/i;

const ILLUSTRATOR_CLIP_FIXTURE = `<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100">
<style>.st0{fill:#FF7A3A;}</style>
<path class="st0" d="M10 10h20v20H10z"/>
<g>
  <defs>
    <rect id="SVGID_1_" x="40" y="40" width="40" height="40"/>
  </defs>
  <clipPath id="clipA">
    <use xlink:href="#SVGID_1_" style="overflow:visible;"/>
  </clipPath>
  <g style="clip-path:url(#clipA);">
    <path class="st0" d="M50 50h20v20H50z"/>
  </g>
</g>
</svg>`;

console.log("svg-normalize tests\n");

{
  const out = normalizeSvg(ILLUSTRATOR_CLIP_FIXTURE, "category");
  if (ORPHAN_CLIP_RE.test(out)) {
    fail(
      "normalizeSvg strips orphan clip scaffolding",
      `still contains clip refs:\n${out.slice(0, 400)}`,
    );
  } else {
    ok("normalizeSvg strips orphan clip scaffolding");
  }
  if (!/<path[^>]*d=/.test(out)) {
    fail("normalizeSvg keeps path data", "no <path> in output");
  } else {
    ok("normalizeSvg keeps path data");
  }
}

for (const dir of ICON_DIRS) {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".svg"));
  for (const file of files) {
    const full = path.join(dir, file);
    const svg = fs.readFileSync(full, "utf8");
    const rel = path.relative(ROOT, full).replace(/\\/g, "/");
    if (ORPHAN_CLIP_RE.test(svg)) {
      fail(`${rel} has no orphan clips`, "found clipPath, xlink:href, or style clip-path");
    } else {
      ok(`${rel} has no orphan clips`);
    }
  }
}

console.log(`\n${passed} passed, ${failures} failed`);
process.exit(failures > 0 ? 1 : 0);
