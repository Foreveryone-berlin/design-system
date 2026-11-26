#!/usr/bin/env node

// Validates that the canonical brand palette (tokens/brand-palette.json), the
// token library, generated CSS, documentation, authored code, and agent
// instructions agree. Run: node scripts/validate-palette.js

const fs = require("fs");
const path = require("path");
const P = require("./lib/palette");
const { loadAllTokens, resolveTokenValue } = require("./token-utils");

const ROOT = P.ROOT_DIR;
let failures = 0;
let passed = 0;
const ok = (name) => {
  passed += 1;
  console.log(`  ok ${name}`);
};
const fail = (name, detail) => {
  failures += 1;
  console.error(`  FAIL ${name}\n      ${detail}`);
};
const check = (cond, name, detail) => (cond ? ok(name) : fail(name, detail));

// Regression fixture: the approved October 2026 palette. Changing a brand
// colour means changing this list and tokens/brand-palette.json together.
const APPROVED = {
  orange: "#FF7A3A",
  lime: "#D4E6A8",
  lavender: "#E5DCFF",
  "warm-white": "#FDFCF7",
  navy: "#1F3A6E",
  teal: "#0F6E6E",
  blue: "#3F00EB",
  charcoal: "#1E1E1E",
  white: "#FFFFFF",
  pink: "#FADCD2",
  yellow: "#FFD84D",
};

const palette = P.loadPalette();
const tokens = loadAllTokens();
const byId = new Map(palette.colors.map((c) => [c.id, c]));

/* 1. Palette file ------------------------------------------------------- */
check(
  JSON.stringify(Object.fromEntries(palette.colors.map((c) => [c.id, c.hex.toUpperCase()]))) ===
    JSON.stringify(APPROVED),
  "palette matches the approved October 2026 hex values",
  "tokens/brand-palette.json differs from the approved palette fixture",
);
check(byId.size === palette.colors.length, "palette ids are unique", "duplicate id");
for (const c of palette.colors) {
  const missing = ["id", "name", "hex", "oklch", "classification", "role", "usage"].filter((k) => !c[k]);
  check(!missing.length, `${c.id}: required fields`, `missing ${missing.join(", ")}`);
  check(["primary", "secondary"].includes(c.classification), `${c.id}: classification`, c.classification);
  check(c.textOnIt === null || ["charcoal", "white"].includes(c.textOnIt), `${c.id}: textOnIt`, String(c.textOnIt));
  check(Array.isArray(c.restrictions) && Array.isArray(c.surfaces), `${c.id}: restrictions and surfaces`, "not arrays");
  let hex = null;
  try {
    hex = P.oklchToHex(c.oklch);
  } catch (e) {
    fail(`${c.id}: oklch parses`, e.message);
  }
  if (hex) {
    const off = [1, 3, 5].some(
      (i) => Math.abs(parseInt(hex.slice(i, i + 2), 16) - parseInt(c.hex.slice(i, i + 2), 16)) > 1,
    );
    check(!off, `${c.id}: oklch round-trips to ${c.hex}`, `${c.oklch} renders ${hex}`);
  }
}
for (const p of P.pairings(palette)) {
  check(p.contrast >= 4.5, `pairing ${p.background} + ${p.text} contrast ${p.contrast}`, "below 4.5:1");
}

/* 2. Tokens ------------------------------------------------------------- */
const leaves = P.colorLeaves(tokens);
const resolve = (p) => resolveTokenValue(tokens, p);
for (const c of palette.colors) {
  const p = P.brandTokenPath(c);
  let v = null;
  try {
    v = resolve(p);
  } catch (e) {
    fail(`${p} exists`, e.message);
  }
  if (v !== null) check(v === c.oklch, `${p} equals palette value`, `${v} vs ${c.oklch}`);
}
const classes = new Map();
for (const { path: p, node } of leaves) {
  const cls = P.classifyToken(p, node, palette);
  if (!cls) fail(`${p} is classified`, "add it to tokenClasses in tokens/brand-palette.json");
  else classes.set(p, cls);
}
ok(`${classes.size} colour tokens classified`);

for (const { path: p, node } of leaves) {
  if (classes.get(p) === "alias" && !(P.referenceOf(node.$value) || "").startsWith("color.brand.")) {
    fail(`${p} alias target`, "alias must reference a color.brand.* token");
  }
}
// Ramp mains that share a name with a brand colour must equal it.
const RAMP_MAIN = {
  "color.orange.500": "orange",
  "color.green.500": "lime",
  "color.blue.500": "blue",
  "color.neutral.900": "charcoal",
};
for (const [p, id] of Object.entries(RAMP_MAIN)) {
  check(resolve(p) === byId.get(id).oklch, `${p} equals brand ${id}`, `${resolve(p)}`);
}

// Reserved names: a non-brand token named like a brand colour must hold that
// colour's value, unless it is a flagged deprecated token.
const reserved = new Map();
for (const c of palette.colors) {
  reserved.set(c.id, c);
  reserved.set(c.name.toLowerCase().replace(/\s+/g, "-"), c);
}
const deprecated = new Set(palette.deprecated.map((d) => d.token));
for (const { path: p } of leaves) {
  const cls = classes.get(p);
  if (cls === "brand" || cls === "ramp") continue;
  const c = reserved.get(p.split(".").pop());
  if (!c || resolve(p) === c.oklch) continue;
  check(
    deprecated.has(p) || p.startsWith("color.legacy."),
    `${p} reuses the name of brand ${c.name}`,
    `value differs from ${c.hex}; rename it under color.legacy.* and list ${p} in "deprecated"`,
  );
}
for (const d of palette.deprecated) {
  check(classes.get(d.token) === "legacy", `${d.token} is classed legacy`, String(classes.get(d.token)));
  let same = false;
  try {
    same = resolve(d.token) === resolve(d.replacement);
  } catch (e) {
    fail(`${d.token} replacement exists`, e.message);
  }
  check(same, `${d.token} equals ${d.replacement}`, "deprecated token and its legacy copy differ");
  const node = leaves.find((l) => l.path === d.token).node;
  check(/DEPRECATED/.test(node.$description), `${d.token} description says DEPRECATED`, node.$description);
}
for (const { path: p, node } of leaves) {
  if (classes.get(p) === "legacy" && !/LEGACY|DEPRECATED/.test(node.$description || "")) {
    fail(`${p} description flags it as legacy`, "start the $description with LEGACY, NOT A BRAND COLOUR.");
  }
}

/* 3. Generated CSS ------------------------------------------------------ */
const css = fs.readFileSync(path.join(ROOT, "css", "custom-properties.css"), "utf8");
for (const c of palette.colors) {
  const v = P.cssVarForColor(P.brandTokenPath(c));
  const m = css.match(new RegExp(`^\\s*${v}:\\s*([^;]+);`, "m"));
  check(m && m[1].trim() === c.oklch, `${v} in generated CSS`, m ? m[1] : "missing");
}
for (const d of palette.deprecated) {
  const v = P.cssVarForColor(d.token);
  const line = css.split("\n").find((l) => l.trim().startsWith(`${v}:`));
  check(line && /DEPRECATED/.test(line), `${v} marked DEPRECATED in generated CSS`, line || "missing");
}

/* 4. Documentation and agent instructions ------------------------------- */
function walk(dir, exts, skip) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    const rel = path.relative(ROOT, full).replace(/\\/g, "/");
    if (skip.some((s) => rel === s || rel.startsWith(`${s}/`) || e.name === s)) continue;
    if (e.isDirectory()) out.push(...walk(full, exts, skip));
    else if (exts.some((x) => e.name.endsWith(x))) out.push(rel);
  }
  return out;
}
const SKIP = ["node_modules", ".next", ".git", ".tmp", ".artifacts", "dist", ".claude/skills", ".agents", "test-results"];
const HISTORY = ["CHANGELOG.md", "docs/plans", "docs/decisions", ".cursor/plans"];
const docFiles = walk(ROOT, [".md", ".txt", ".mdc"], [...SKIP, ...HISTORY, "prototype"]).filter(
  (f) => f !== "spec/brand-palette.md",
);
const FLAGGED =
  /legacy|deprecated|not (a )?brand|not the brand|distinct from|outside (this|the approved)|pending Brand Book|ramp step/i;
const depPatterns = palette.deprecated.map((d) => {
  const cssVar = P.cssVarForColor(d.token);
  return new RegExp(`(?:${cssVar}|${d.token.replace(/\./g, "\\.")})(?![\\w-])`);
});
const knownHex = new Map();
for (const c of palette.colors) knownHex.set(c.hex.toUpperCase(), c.id);
for (const d of palette.deprecated) knownHex.set(d.hex.toUpperCase(), `deprecated ${d.token}`);
const nameRes = palette.colors.map((c) => ({
  c,
  re: new RegExp(`(?<!Warm )\\b${c.name}\\b[^.|\\n]{0,25}?#([0-9A-Fa-f]{6})\\b`, "g"),
}));
let docIssues = 0;
for (const rel of docFiles) {
  const lines = fs.readFileSync(path.join(ROOT, rel), "utf8").split("\n");
  lines.forEach((line, i) => {
    if (FLAGGED.test(line)) return;
    for (const re of depPatterns) {
      if (re.test(line)) {
        docIssues += 1;
        fail(`${rel}:${i + 1} deprecated colour name`, `mention it only with "legacy" or "deprecated": ${line.trim().slice(0, 120)}`);
      }
    }
    for (const { c, re } of nameRes) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line))) {
        const owner = knownHex.get(`#${m[1]}`.toUpperCase());
        if (owner && owner !== c.id) {
          docIssues += 1;
          fail(`${rel}:${i + 1} wrong hex for ${c.name}`, `#${m[1]} is ${owner}: ${line.trim().slice(0, 120)}`);
        }
      }
    }
  });
}
if (!docIssues) ok(`${docFiles.length} docs and agent files carry no stale or misattributed brand colours`);

const MUST_REFERENCE = [
  "AGENTS.md",
  "docs/AGENTS.md",
  "llms.txt",
  "spec/principles.md",
  "skills/_shared/conventions.md",
  "skills/fe-core/SKILL.md",
  "skills/fe-tokens/SKILL.md",
  "skills/fe-redesign/SKILL.md",
  "skills/fe-design-system/SKILL.md",
  "skills/fe-og-image/SKILL.md",
];
for (const rel of MUST_REFERENCE) {
  const text = fs.readFileSync(path.join(ROOT, rel), "utf8");
  check(
    /brand-palette/.test(text),
    `${rel} points agents at the brand palette`,
    "add a reference to spec/brand-palette.json",
  );
}
for (const rel of ["llms.txt", "skills/_shared/conventions.md", "skills/fe-core/SKILL.md", "docs/color-audit-2026.md"]) {
  const text = fs.readFileSync(path.join(ROOT, rel), "utf8");
  const missing = palette.colors.filter((c) => !text.includes(c.hex));
  check(!missing.length, `${rel} lists every approved hex`, missing.map((c) => c.id).join(", "));
}

/* 5. Authored code ------------------------------------------------------ */
const codeFiles = [
  ...walk(path.join(ROOT, "css"), [".css"], ["custom-properties.css"]),
  ...walk(path.join(ROOT, "prototype", "app"), [".css", ".tsx", ".ts"], SKIP),
  ...walk(path.join(ROOT, "prototype", "scripts"), [".mjs", ".js"], SKIP),
  ...walk(path.join(ROOT, "integrations"), [".css"], SKIP),
];
const depVars = palette.deprecated.map((d) => P.cssVarForColor(d.token));
const depUse = new RegExp(`var\\((?:${depVars.join("|")})\\)`);
let codeIssues = 0;
for (const rel of new Set(codeFiles)) {
  const full = path.isAbsolute(rel) ? rel : path.join(ROOT, rel);
  if (!fs.existsSync(full)) continue;
  fs.readFileSync(full, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (depUse.test(line)) {
        codeIssues += 1;
        fail(`${rel}:${i + 1} uses a deprecated colour variable`, line.trim());
      }
    });
}
if (!codeIssues) ok("authored CSS and prototype code use no deprecated colour variables");

console.log(`\n${passed} passed, ${failures} failed`);
process.exit(failures ? 1 : 0);
