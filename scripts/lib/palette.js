// Shared helpers for the canonical brand palette (tokens/brand-palette.json).
// Consumed by build-palette.js, build-css.js, build-spec.js, validate-palette.js.

const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..", "..");
const PALETTE_PATH = path.join(ROOT_DIR, "tokens", "brand-palette.json");

function loadPalette() {
  return JSON.parse(fs.readFileSync(PALETTE_PATH, "utf8"));
}

/* ---------- colour math ---------- */
const linToSrgb = (c) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
const srgbToLin = (c) =>
  c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

function parseOklch(value) {
  const m = String(value).match(
    /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/,
  );
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function oklchToHex(value) {
  const parsed = parseOklch(value);
  if (!parsed) throw new Error(`Not an oklch() value: ${value}`);
  const [L, C, H] = parsed;
  const a = C * Math.cos((H * Math.PI) / 180);
  const b = C * Math.sin((H * Math.PI) / 180);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  const hex = lin
    .map((c) => Math.round(Math.min(1, Math.max(0, linToSrgb(c))) * 255))
    .map((n) => n.toString(16).padStart(2, "0"))
    .join("");
  return `#${hex}`.toUpperCase();
}

function hexChannels(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function luminance(hex) {
  const [r, g, b] = hexChannels(hex).map((c) => srgbToLin(c / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(hexA, hexB) {
  const [hi, lo] = [luminance(hexA), luminance(hexB)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/* ---------- token classification ---------- */
function matchesPattern(tokenPath, pattern) {
  if (pattern.endsWith(".*")) return tokenPath.startsWith(pattern.slice(0, -1));
  return tokenPath === pattern;
}

function isLeaf(node) {
  return node && typeof node === "object" && "$value" in node;
}

function colorLeaves(tokens) {
  const out = [];
  (function walk(node, trail) {
    if (!node || typeof node !== "object") return;
    if (isLeaf(node)) {
      out.push({ path: trail.join("."), node });
      return;
    }
    for (const [key, child] of Object.entries(node)) {
      if (!key.startsWith("$")) walk(child, [...trail, key]);
    }
  })(tokens.color, ["color"]);
  return out;
}

function referenceOf(value) {
  const m = typeof value === "string" && value.trim().match(/^\{([^}]+)\}$/);
  return m ? m[1] : null;
}

// Class of one colour token: brand | semantic | technical | status | print |
// legacy | ramp | alias. Returns null when the token is not classified.
function classifyToken(tokenPath, node, palette) {
  if (tokenPath.startsWith("color.brand.")) return "brand";
  for (const [cls, patterns] of Object.entries(palette.tokenClasses)) {
    if (patterns.some((p) => matchesPattern(tokenPath, p))) return cls;
  }
  const ref = referenceOf(node.$value);
  if (ref && ref.startsWith("color.brand.")) return "alias";
  return null;
}

function brandTokenPath(color) {
  return `color.brand.${color.id}`;
}

function cssVarForColor(tokenPath) {
  const parts = tokenPath.split(".");
  if (parts[1] === "base") return `--color-${parts.slice(2).join("-")}`;
  return `--color-${parts.slice(1).join("-")}`;
}

/* ---------- generated artefacts ---------- */
function buildBrandTokens(palette) {
  const brand = {};
  for (const c of palette.colors) {
    const bg = c.textOnIt ? ` Text on it: ${c.textOnIt === "white" ? "White" : "Charcoal"} only.` : "";
    brand[c.id] = {
      $value: c.oklch,
      $type: "color",
      $description: `APPROVED BRAND COLOUR: ${c.name} (${c.hex}), ${c.classification}. ${c.usage}${bg} ${c.restrictions.join(" ")}`.replace(/\s+/g, " ").trim(),
    };
  }
  return { color: { brand } };
}

function pairings(palette) {
  return palette.colors
    .filter((c) => c.background && c.textOnIt)
    .map((c) => {
      const textHex = palette.colors.find(
        (t) => t.id === c.textOnIt,
      ).hex;
      return {
        background: c.id,
        text: c.textOnIt,
        contrast: Math.round(contrast(c.hex, textHex) * 100) / 100,
      };
    });
}

function buildBrandSpec(palette, tokens, classes) {
  const aliasesOf = {};
  for (const { path: p, node } of colorLeaves(tokens)) {
    const ref = referenceOf(node.$value);
    if (ref && ref.startsWith("color.brand.")) {
      (aliasesOf[ref] ||= []).push({
        token: p,
        css: cssVarForColor(p),
        class: classes.get(p),
      });
    }
  }
  const byClass = (cls) =>
    [...classes.entries()].filter(([, c]) => c === cls).map(([p]) => p).sort();
  return {
    $schema: "https://foreveryone.berlin/spec/brand-palette.schema.json",
    generated: "node scripts/build-palette.js",
    source: "tokens/brand-palette.json",
    version: palette.version,
    note: "The approved brand palette. Only the colours in `colors` are brand colours. Everything in `notBrand` is a technical, legacy, status, ramp, or print token and must not be presented as a brand colour. Use `css` of a brand colour (--color-brand-*) for brand work.",
    colors: palette.colors.map((c) => ({
      id: c.id,
      name: c.name,
      hex: c.hex,
      oklch: c.oklch,
      token: brandTokenPath(c),
      css: cssVarForColor(brandTokenPath(c)),
      classification: c.classification,
      role: c.role,
      background: c.background,
      textOnIt: c.textOnIt,
      surfaces: c.surfaces,
      usage: c.usage,
      restrictions: c.restrictions,
      exceptions: c.exceptions,
      aliases: (aliasesOf[brandTokenPath(c)] || []).sort((a, b) =>
        a.token.localeCompare(b.token),
      ),
    })),
    pairings: pairings(palette),
    deprecated: palette.deprecated.map((d) => ({
      ...d,
      css: cssVarForColor(d.token),
      replacementCss: cssVarForColor(d.replacement),
      approvedCss: cssVarForColor(d.approved),
    })),
    notBrand: {
      legacy: byClass("legacy"),
      technical: byClass("technical"),
      status: byClass("status"),
      print: byClass("print"),
      ramp: "color.{neutral,orange,green,blue,lavender}.<step>: tonal ramps. Ramp step 500 equals the brand colour only for orange, green (Lime), and blue; lavender.500 is NOT brand Lavender.",
    },
  };
}

const NAMES = {
  charcoal: "Charcoal",
  white: "White",
};

function textLabel(id) {
  return NAMES[id] || id;
}

function brandTable(spec) {
  const rows = spec.colors.map(
    (c) =>
      `| ${c.name} | \`${c.hex}\` | \`${c.css}\` | ${c.classification} | ${[c.usage, ...c.restrictions].join(" ")} |`,
  );
  return [
    "| Colour | HEX | CSS variable | Class | Approved usage |",
    "|---|---|---|---|---|",
    ...rows,
  ].join("\n");
}

function pairingsTable(spec) {
  const byId = Object.fromEntries(spec.colors.map((c) => [c.id, c]));
  const rows = spec.pairings.map(
    (p) =>
      `| ${byId[p.background].name} \`${byId[p.background].hex}\` | \`${byId[p.background].css}\` | ${textLabel(p.text)} \`${byId[p.text].hex}\` | ${p.contrast.toFixed(2)}:1 |`,
  );
  return [
    "| Background | CSS var | Text | Contrast |",
    "|---|---|---|---|",
    ...rows,
  ].join("\n");
}

function deprecatedTable(spec) {
  const rows = spec.deprecated.map(
    (d) =>
      `| \`${d.css}\` | \`${d.hex}\` | Not brand ${d.conflictsWith}. Use \`${d.approvedCss}\` for brand work. Old value kept as \`${d.replacementCss}\`. |`,
  );
  return ["| Deprecated name | Old value | Meaning |", "|---|---|---|", ...rows].join("\n");
}

function compactBlock(spec) {
  return [
    `Approved brand palette (${spec.version}), machine-readable in \`spec/brand-palette.json\`. Only these are brand colours; use the \`--color-brand-*\` names:`,
    "",
    brandTable(spec),
    "",
    `Deprecated names that look like brand colours but are not:`,
    "",
    deprecatedTable(spec),
    "",
    "Technical, status, ramp, legacy, and print tokens are not brand colours. Do not offer them as the palette.",
  ].join("\n");
}

function paletteMarkdown(spec) {
  const byId = Object.fromEntries(spec.colors.map((c) => [c.id, c]));
  const aliasRows = spec.colors
    .filter((c) => c.aliases.length)
    .map(
      (c) =>
        `| ${c.name} | \`${c.css}\` | ${c.aliases.map((a) => `\`${a.css}\``).join(", ")} |`,
    );
  const primary = spec.colors.filter((c) => c.classification === "primary");
  const secondary = spec.colors.filter((c) => c.classification === "secondary");
  const detail = (list) =>
    list
      .map(
        (c) =>
          `- **${c.name}** \`${c.hex}\` (\`${c.css}\`): ${c.usage} ${c.restrictions.join(" ")}${c.exceptions.length ? ` Exceptions: ${c.exceptions.join("; ")}.` : ""}`,
      )
      .join("\n");
  return `# Brand palette (generated)

GENERATED by \`node scripts/build-palette.js\` from [\`tokens/brand-palette.json\`](../tokens/brand-palette.json). Do not edit. Machine-readable twin: [\`brand-palette.json\`](brand-palette.json).

Palette version: ${spec.version}. Only the colours below are brand colours.

## Primary colours

${detail(primary)}

## Secondary colours

${detail(secondary)}

## Approved background and text pairings

${pairingsTable(spec)}

## Canonical names and their aliases

Brand work uses the canonical \`--color-brand-*\` names. Aliases resolve to the same value and stay for backward compatibility.

| Colour | Canonical | Aliases (same value) |
|---|---|---|
${aliasRows.join("\n")}

## Deprecated names (not brand colours)

${deprecatedTable(spec)}

## Not brand colours

Technical, status, ramp, legacy, and print tokens are in \`spec/tokens.json\` with a \`class\` field. Only \`class: "brand"\` tokens, and \`alias\`/\`semantic\` tokens that point at them, are the brand palette.

${byId.orange ? "" : ""}`.trimEnd() + "\n";
}

/* ---------- marker blocks ---------- */
function replaceBlock(text, name, content) {
  const re = new RegExp(
    `(<!--\\s*palette:${name}:start\\s*-->)[\\s\\S]*?(<!--\\s*palette:${name}:end\\s*-->)`,
  );
  if (!re.test(text)) return null;
  return text.replace(re, (_, a, b) => `${a}\n${content}\n${b}`);
}

module.exports = {
  ROOT_DIR,
  PALETTE_PATH,
  loadPalette,
  oklchToHex,
  parseOklch,
  contrast,
  colorLeaves,
  referenceOf,
  classifyToken,
  matchesPattern,
  brandTokenPath,
  cssVarForColor,
  buildBrandTokens,
  buildBrandSpec,
  pairings,
  brandTable,
  pairingsTable,
  deprecatedTable,
  compactBlock,
  paletteMarkdown,
  replaceBlock,
};
