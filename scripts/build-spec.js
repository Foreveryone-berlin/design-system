#!/usr/bin/env node

// Build a flattened, machine-readable token spec for agents: spec/tokens.json.
// Generated from tokens/*.json so it never drifts. Each entry is
// { name, css, value, type, role, surface } where surface is "digital" | "print".
// Run: node scripts/build-spec.js

const fs = require("fs");
const path = require("path");
const { loadAllTokens, resolveTokenValue } = require("./token-utils");

const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_PATH = path.join(ROOT_DIR, "spec", "tokens.json");
function isPlainObject(v) {
  return v && typeof v === "object" && !Array.isArray(v);
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

function walk(node, group, trail, out, tokens) {
  if (isPlainObject(node) && "$value" in node) {
    const dotted = trail.join(".");
    out.push({
      name: dotted,
      css: cssVarFor(group, dotted),
      value: resolveTokenValue(tokens, dotted),
      type: node.$type ?? null,
      surface: surfaceFor(dotted, node.$description),
      description: node.$description ?? null,
    });
    return;
  }
  if (isPlainObject(node)) {
    for (const [key, child] of Object.entries(node)) {
      walk(child, group, [...trail, key], out, tokens);
    }
  }
}

function main() {
  const tokens = loadAllTokens();
  const out = [];
  for (const group of Object.keys(tokens)) {
    walk(tokens[group], group, [group], out, tokens);
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
