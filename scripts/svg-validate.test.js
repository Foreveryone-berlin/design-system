#!/usr/bin/env node

/* eslint-disable no-console */

// Guards every tracked .svg against the failure mode where an asset is replaced
// by something that is not SVG at all — most often a GitHub blob page saved with
// an .svg extension, which fails as "XML Parsing Error: not well-formed" in the
// browser because HTML void elements like <link rel="preconnect"> are never
// closed. Also catches raw ampersands and stray prologs from hand-editing.
//
// The scan is expected to pass; this is a regression guard, not a repair.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

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

/** Tracked SVGs only — the set that ships. */
function trackedSvgs() {
  const out = execFileSync("git", ["ls-files", "-z", "*.svg"], {
    cwd: ROOT,
    encoding: "utf8",
  });
  return out.split("\0").filter(Boolean);
}

/** Markup that means the file is an HTML page, not an SVG asset. */
const HTML_MARKERS = [
  /<!DOCTYPE\s+html/i,
  /<html[\s>]/i,
  /<link\s+rel=/i,
  /<meta\s+(?:name|property|charset)=/i,
  /githubassets/i,
];

/** Entity references XML accepts without a DTD. */
const BAD_AMP_RE = /&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/;

/** Strip the parts a tag scanner must not read as markup. */
function stripNonMarkup(svg) {
  return svg
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, "")
    .replace(/<\?[\s\S]*?\?>/g, "")
    .replace(/<!DOCTYPE[^>[]*(\[[\s\S]*?\])?[^>]*>/gi, "");
}

const TAG_RE = /<\s*(\/)?\s*([A-Za-z_][\w.:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/)?\s*>/g;

/**
 * Minimal well-formedness check: tags must nest and balance, and there must be
 * exactly one root element. An unclosed HTML void element leaves the stack
 * non-empty, so no void-element list is needed.
 */
function checkWellFormed(svg) {
  const body = stripNonMarkup(svg);
  const stack = [];
  let roots = 0;
  let match;
  TAG_RE.lastIndex = 0;
  while ((match = TAG_RE.exec(body)) !== null) {
    const [, closing, name, , selfClosing] = match;
    if (closing) {
      const open = stack.pop();
      if (open !== name) {
        return `</${name}> closes <${open ?? "nothing"}>`;
      }
      if (stack.length === 0) roots += 1;
    } else if (selfClosing) {
      if (stack.length === 0) roots += 1;
    } else {
      stack.push(name);
    }
  }
  if (stack.length > 0) {
    return `unclosed element(s): ${stack.map((n) => `<${n}>`).join(", ")}`;
  }
  if (roots !== 1) {
    return `expected exactly 1 root element, found ${roots}`;
  }
  return null;
}

/** @returns {string | null} reason the file is not a usable SVG, or null. */
function validateSvg(svg) {
  const htmlMarker = HTML_MARKERS.find((re) => re.test(svg));
  if (htmlMarker) {
    return `matched ${htmlMarker} — an HTML page, not SVG. Re-download the raw file, not the GitHub blob page.`;
  }
  if (!/^\s*(?:<\?xml|<!--|<!DOCTYPE|<svg)/.test(svg)) {
    return `invalid prolog, starts with ${JSON.stringify(svg.slice(0, 40))}`;
  }
  if (!/<svg[\s>]/.test(svg)) {
    return "no <svg> root element";
  }
  const badAmp = svg.match(BAD_AMP_RE);
  if (badAmp) {
    const at = svg.indexOf(badAmp[0]);
    return `unescaped "&" at offset ${at}: ${JSON.stringify(svg.slice(at, at + 24))}`;
  }
  return checkWellFormed(svg);
}

console.log("svg-validate tests\n");

// The exact bytes that produced the reported "not well-formed" error: a GitHub
// blob page saved as .svg. Guards the guard.
const GITHUB_PAGE_FIXTURE = `<!DOCTYPE html>
<html lang="en">
<head>
<link rel="preconnect" href="https://github.githubassets.com" crossorigin>
</head>
<body>chess.svg</body>
</html>`;

const UNCLOSED_FIXTURE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
<g><path d="M0 0h10v10H0z"/></svg>`;

const RAW_AMP_FIXTURE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
<title>Arts & crafts</title></svg>`;

for (const [name, fixture] of [
  ["rejects a GitHub blob page saved as .svg", GITHUB_PAGE_FIXTURE],
  ["rejects an unclosed element", UNCLOSED_FIXTURE],
  ["rejects a raw ampersand", RAW_AMP_FIXTURE],
]) {
  if (validateSvg(fixture)) {
    ok(name);
  } else {
    fail(name, "fixture passed validation but should not have");
  }
}

const files = trackedSvgs();
if (files.length === 0) {
  fail("tracked SVGs found", "git ls-files returned no .svg paths");
}

for (const rel of files) {
  const svg = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const reason = validateSvg(svg);
  if (reason) {
    fail(`${rel} is well-formed SVG`, reason);
  } else {
    ok(`${rel} is well-formed SVG`);
  }
}

console.log(`\n${passed} passed, ${failures} failed`);
process.exit(failures > 0 ? 1 : 0);
