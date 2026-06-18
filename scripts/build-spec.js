#!/usr/bin/env node

// Build a flattened, machine-readable token spec for agents: spec/tokens.json.
// Generated from tokens/*.json so it never drifts. Each entry is
// { name, css, value, type, role, surface } where surface is "digital" | "print".
// Run: node scripts/build-spec.js

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const TOKENS_DIR = path.join(ROOT_DIR, "tokens");
const INDEX_PATH = path.join(TOKENS_DIR, "index.json");
const OUTPUT_PATH = path.join(ROOT_DIR, "spec", "tokens.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
function isPlainObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
}
function deepMerge(target, source) {
  const result = { ...target };
  for (const [key, value] of Object.entries(source)) {
    if (isPlainObject(value) && isPlainObject(result[key])) {
      result[key] = deepMerge(result[key], value);
    } else {
      result[key] = value;
    }
  }
  return result;
}
function loadAllTokens() {
  const index = readJson(INDEX_PATH);
  let merged = {};
  for (const rel of index.imports || []) {
    merged = deepMerge(merged, readJson(path.resolve(TOKENS_DIR, rel)));
  }
  return merged;
}

// Map a dotted token path to its CSS custom-property name, mirroring
// scripts/build-css.js conventions.
function cssVarFor(group, dottedPath) {
  const parts = dottedPath.split(".");
  if (group === "color") {
    // color.x → --color-x ; color.a.b → --color-a-b
    return `--color-${parts.slice(1).join("-")}`;
  }
  if (group === "spacing") return `--spacing-${parts[1]}`;
  if (group === "radius") return `--radius-${parts[1]}`;
  if (group === "shadow") return `--shadow-${parts[1]}`;
  if (group === "motion") return `--transition-${parts[parts.length - 1]}`;
  if (group === "font") {
    const sub = parts[1];
    if (sub === "family") return `--font-family-${parts[2]}`;
    if (sub === "weight") return `--font-weight-${parts[2]}`;
    if (sub === "size") return `--font-size-${parts[2]}`;
    if (sub === "lineHeight") return `--line-height-${parts[2]}`;
    if (sub === "letterSpacing") return `--letter-spacing-${parts[2]}`;
  }
  return null;
}

function surfaceFor(dottedPath, description) {
  const d = (description || "").toUpperCase();
  if (
    dottedPath.startsWith("color.print.") ||
    dottedPath.startsWith("color.doc.") ||
    dottedPath === "font.family.accent" ||
    d.includes("PRINT ONLY") ||
    d.includes("DOCUMENT CHROME")
  ) {
    return "print";
  }
  return "digital";
}

function walk(node, group, trail, out) {
  if (isPlainObject(node) && "$value" in node) {
    const dotted = trail.join(".");
    out.push({
      name: dotted,
      css: cssVarFor(group, dotted),
      value: node.$value,
      type: node.$type ?? null,
      surface: surfaceFor(dotted, node.$description),
      description: node.$description ?? null,
    });
    return;
  }
  if (isPlainObject(node)) {
    for (const [key, child] of Object.entries(node)) {
      walk(child, group, [...trail, key], out);
    }
  }
}

function main() {
  const tokens = loadAllTokens();
  const out = [];
  for (const group of Object.keys(tokens)) {
    walk(tokens[group], group, [group], out);
  }
  const spec = {
    $schema: "https://foreveryone.berlin/spec/tokens.schema.json",
    generated: "node scripts/build-spec.js",
    note: "Flattened, resolved design tokens. surface=print tokens must NOT be used on the web. Extend the palette in OKLCH: hold hue and lightness, step chroma.",
    count: out.length,
    tokens: out.sort((a, b) => a.name.localeCompare(b.name)),
  };
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n", "utf8");
  console.log(
    `Generated ${path.relative(ROOT_DIR, OUTPUT_PATH)} (${out.length} tokens)`,
  );
}

main();
