#!/usr/bin/env node

// Generates every artefact derived from tokens/brand-palette.json:
//   tokens/brand.json          DTCG brand tokens (color.brand.*)
//   spec/brand-palette.json    machine-readable palette for agents
//   spec/brand-palette.md      palette, pairings, aliases, deprecations
//   <!-- palette:NAME:start/end --> blocks in docs, llms.txt, and skills
// Run: node scripts/build-palette.js          (write)
//      node scripts/build-palette.js --check  (fail when out of date)

const fs = require("fs");
const path = require("path");
const P = require("./lib/palette");
const { loadAllTokens } = require("./token-utils");

const ROOT = P.ROOT_DIR;
const CHECK = process.argv.includes("--check");

// file -> { blockName: "compact" | "pairings" }
const BLOCKS = {
  "llms.txt": { llms: "compact" },
  "spec/principles.md": { pairings: "pairings" },
  "skills/_shared/conventions.md": { agents: "compact" },
  "skills/fe-core/SKILL.md": { core: "compact" },
  "docs/color-audit-2026.md": { audit: "compact" },
};

const stale = [];
function emit(rel, content) {
  const full = path.join(ROOT, rel);
  const current = fs.existsSync(full) ? fs.readFileSync(full, "utf8") : null;
  if (current === content) return;
  if (CHECK) {
    stale.push(rel);
    return;
  }
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
  console.log(`Generated ${rel}`);
}

function classifyAll(tokens, palette) {
  const classes = new Map();
  for (const { path: p, node } of P.colorLeaves(tokens)) {
    const cls = P.classifyToken(p, node, palette);
    if (!cls) throw new Error(`Unclassified colour token ${p}: add it to tokenClasses in tokens/brand-palette.json`);
    classes.set(p, cls);
  }
  return classes;
}

function main() {
  const palette = P.loadPalette();
  emit("tokens/brand.json", JSON.stringify(P.buildBrandTokens(palette), null, 2) + "\n");

  // In check mode the on-disk brand.json is validated separately; tokens load from disk.
  const tokens = loadAllTokens();
  const classes = classifyAll(tokens, palette);
  const spec = P.buildBrandSpec(palette, tokens, classes);
  emit("spec/brand-palette.json", JSON.stringify(spec, null, 2) + "\n");
  emit("spec/brand-palette.md", P.paletteMarkdown(spec));

  const renderers = { compact: P.compactBlock, pairings: P.pairingsTable };
  for (const [rel, blocks] of Object.entries(BLOCKS)) {
    let text = fs.readFileSync(path.join(ROOT, rel), "utf8");
    for (const [name, kind] of Object.entries(blocks)) {
      const next = P.replaceBlock(text, name, renderers[kind](spec));
      if (next === null) throw new Error(`${rel} is missing <!-- palette:${name}:start/end --> markers`);
      text = next;
    }
    emit(rel, text);
  }

  if (CHECK) {
    if (stale.length) {
      console.error(`Palette artefacts out of date: ${stale.join(", ")}. Run 'node scripts/build-palette.js'.`);
      process.exit(1);
    }
    console.log("Palette artefacts up to date");
  }
}

main();
