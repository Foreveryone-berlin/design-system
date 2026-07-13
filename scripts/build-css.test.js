#!/usr/bin/env node

/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { loadAllTokens, resolveTokenValue } = require("./token-utils");

const ROOT_DIR = path.resolve(__dirname, "..");
const TOKENS_DIR = path.join(ROOT_DIR, "tokens");
const OUTPUT_PATH = path.join(ROOT_DIR, "css", "custom-properties.css");
const BUILD_SCRIPT = path.join(__dirname, "build-css.js");

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

function assertIncludes(haystack, needle, name) {
  if (haystack.includes(needle)) ok(name);
  else fail(name, `expected output to include "${needle}"`);
}

function assertNonEmptyVar(css, varName) {
  const re = new RegExp(`--${varName}:\\s*([^;]+);`);
  const m = css.match(re);
  if (!m) return fail(`var --${varName} declared`, "not found in output");
  const value = m[1].trim();
  if (!value) return fail(`var --${varName} non-empty`, "empty value");
  if (/^\{[^}]+\}$/.test(value)) {
    return fail(`var --${varName} resolved`, `unresolved ref ${value}`);
  }
  ok(`var --${varName} = ${value}`);
}

function walkLeaves(node, currentPath, visit) {
  if (!node || typeof node !== "object") return;
  if ("$value" in node || "$type" in node) {
    visit(currentPath, node);
    return;
  }
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    walkLeaves(child, currentPath.concat(key), visit);
  }
}

function validateDtcg(file, json) {
  if (!json || typeof json !== "object") {
    return fail(`${file} is JSON object`, "top-level is not an object");
  }
  walkLeaves(json, [], (leafPath, leaf) => {
    const dotted = leafPath.join(".");
    if (!("$value" in leaf)) {
      return fail(`${file} ${dotted} has $value`, "missing $value");
    }
    if (!("$type" in leaf)) {
      return fail(`${file} ${dotted} has $type`, "missing $type");
    }
    const v = leaf.$value;
    if (typeof v === "string" && /^\{[^}]+\}$/.test(v.trim())) {
      try {
        resolveTokenValue(MERGED_TOKENS, dotted);
      } catch (error) {
        return fail(
          `${file} ${dotted} reference`,
          `invalid DTCG ref ${v}; ${error.message}`,
        );
      }
    }
    ok(`${file} ${dotted} (${leaf.$type})`);
  });
}

console.log("# token JSON DTCG shape");
const MERGED_TOKENS = loadAllTokens();
const tokenFiles = fs
  .readdirSync(TOKENS_DIR)
  .filter((f) => f.endsWith(".json") && f !== "index.json");

for (const f of tokenFiles) {
  const json = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, f), "utf8"));
  validateDtcg(f, json);
}

console.log("\n# build-css.js execution");
try {
  execFileSync(process.execPath, [BUILD_SCRIPT], { stdio: "pipe" });
  ok("build-css.js exits 0");
} catch (e) {
  fail("build-css.js exits 0", String(e.stderr || e.message));
}

if (!fs.existsSync(OUTPUT_PATH)) {
  fail("custom-properties.css exists", OUTPUT_PATH);
} else {
  ok("custom-properties.css exists");
  const css = fs.readFileSync(OUTPUT_PATH, "utf8");

  console.log("\n# generated CSS smoke");
  assertIncludes(css, "AUTO-GENERATED", "header banner present");
  assertIncludes(css, ":root {", ":root block present");

  const requiredVars = [
    "color-brand-primary",
    "color-brand-secondary",
    "color-brand-dark",
    "color-accent",
    "color-soft-lavender",
    "color-status-error",
    "color-status-success",
    "color-white",
    "color-black",
    "font-family-heading",
    "font-family-accent",
    "font-family-body",
    "font-weight-regular",
    "font-size-base",
    "spacing-1",
    "spacing-4",
    "spacing-32",
    "radius-pill",
    "shadow-card",
    "shadow-header",
    "transition-base",
  ];
  for (const v of requiredVars) assertNonEmptyVar(css, v);
}

console.log(`\n# results: ${passed} passed, ${failures} failed`);
if (failures > 0) process.exit(1);
