import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export const RECOLOR_BRAND = ["#ff7a3a", "#FF7A3A", "#f47a3f", "#F47A3F", "#d4e6a8", "#D4E6A8"];
export const RECOLOR_DARK = ["#1e1e1e", "#1E1E1E"];

/**
 * Fill used when the asset is opened on its own (downloaded file, `<img>`,
 * Figma/Canva import). Paths stay `currentColor` so CSS mask/inline use keeps
 * tinting from a token; this is the `color` presentation attribute on the root,
 * which any CSS `color` rule overrides because presentation attributes carry
 * zero specificity. Without it a standalone asset resolves `currentColor` to the
 * initial value and renders black.
 */
export const STANDALONE_COLOR = {
  category: "#FF7A3A", // Brand orange — filled category markers
  workshop: "#FF7A3A", // Brand orange — activity glyphs
  illo: "#FF7A3A", // Brand orange — line illustrations
  accent: "#FF7A3A", // Brand orange — doodle strokes and decorations
  blob: "#E5DCFF", // Soft Lavender — blobs must never be orange (Brand Book p.27)
  wave: "#D4E6A8", // Lime Green — wave dividers are always lime
  social: "#1E1E1E", // Charcoal — social/contact glyphs are neutral
  ui: "#1E1E1E", // Charcoal — functional stroke glyphs are neutral
};

/** Figma exports use clipPath rects; crop viewBox before defs are stripped. */
export function extractClipViewBox(svg) {
  const clipRects = [];
  const clipPathBlocks = svg.match(/<clipPath[\s\S]*?<\/clipPath>/gi) || [];
  for (const block of clipPathBlocks) {
    const pathMatch = block.match(/<path d="M\s*([^"]+)"/i);
    if (!pathMatch) continue;
    const nums = pathMatch[1].match(/[-+]?[\d.]+(?:e[-+]?[\d]+)?/gi);
    if (!nums || nums.length < 4) continue;
    const coords = nums.map(Number).filter((n) => !Number.isNaN(n));
    const xs = [];
    const ys = [];
    for (let i = 0; i + 1 < coords.length; i += 2) {
      xs.push(coords[i]);
      ys.push(coords[i + 1]);
    }
    if (xs.length === 0) continue;
    clipRects.push({
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    });
  }
  if (clipRects.length === 0) return null;
  const minX = Math.min(...clipRects.map((r) => r.minX));
  const minY = Math.min(...clipRects.map((r) => r.minY));
  const maxX = Math.max(...clipRects.map((r) => r.maxX));
  const maxY = Math.max(...clipRects.map((r) => r.maxY));
  return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
}

/** Paths without clipPath (e.g. Doodle_Underline): crop to path bounds. */
export function extractPathViewBox(svg) {
  let pathBbox;
  try {
    pathBbox = require("svg-path-bbox").svgPathBbox;
  } catch {
    return null;
  }

  const paths = [...svg.matchAll(/\sd="([^"]+)"/g)].map((m) => m[1]);
  if (paths.length === 0) return null;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const d of paths) {
    const [x0, y0, x1, y1] = pathBbox(d);
    minX = Math.min(minX, x0);
    minY = Math.min(minY, y0);
    maxX = Math.max(maxX, x1);
    maxY = Math.max(maxY, y1);
  }

  if (!Number.isFinite(minX)) return null;

  const pad = 2;
  return `${minX - pad} ${minY - pad} ${maxX - minX + 2 * pad} ${maxY - minY + 2 * pad}`;
}

function applyViewBox(svg, viewBox) {
  if (svg.includes('viewBox="')) {
    return svg.replace(/viewBox="[^"]*"/, `viewBox="${viewBox}"`);
  }
  return svg.replace(/<svg/i, `<svg viewBox="${viewBox}"`);
}

function recolorHexes(svg, hexes, replacement) {
  let out = svg;
  for (const hex of hexes) {
    const re = new RegExp(`fill="${hex}"`, "gi");
    out = out.replace(re, `fill="${replacement}"`);
    const strokeRe = new RegExp(`stroke="${hex}"`, "gi");
    out = out.replace(strokeRe, `stroke="${replacement}"`);
  }
  return out;
}

/**
 * @param {string} raw
 * @param {"category" | "illo" | "accent" | "blob" | "wave" | "social" | "workshop"} kind
 */
export function normalizeSvg(raw, kind) {
  let svg = raw;
  const cropViewBox = extractClipViewBox(svg) ?? extractPathViewBox(svg);
  const stripDefs = kind !== "social";

  svg = svg.replace(/<rect[^>]*fill="#ffffff"[^>]*\/>/gi, "");
  svg = svg.replace(/<rect[^>]*fill="#fff"[^>]*\/>/gi, "");
  svg = svg.replace(/<rect[^>]*fill="#FFFFFF"[^>]*\/>/gi, "");
  svg = svg.replace(/xmlns:xlink="[^"]*"/g, "");
  svg = svg.replace(/\s(width|height|zoomAndPan|version)="[^"]*"/gi, "");
  svg = svg.replace(/<style[\s\S]*?<\/style>/gi, "");
  svg = svg.replace(/fill="#FF7A3A"/gi, 'fill="currentColor"');
  svg = svg.replace(/fill="#ff7a3a"/gi, 'fill="currentColor"');
  svg = svg.replace(/fill-opacity="[^"]*"/gi, "");
  svg = svg.replace(/\sclass="st[^"]*"/gi, "");

  svg = recolorHexes(svg, RECOLOR_BRAND, "currentColor");
  if (kind === "social" || kind === "category" || kind === "workshop") {
    if (kind === "social") {
      svg = recolorHexes(svg, RECOLOR_DARK, "currentColor");
    }
    svg = svg.replace(/\sclass="cls-[^"]*"/gi, "");
    svg = svg.replace(/<path(?![^>]*fill=)/gi, '<path fill="currentColor"');
  }

  svg = svg.replace(/fill="#ffffff"/gi, 'fill="none"');
  svg = svg.replace(/fill="#fff"/gi, 'fill="none"');

  if (stripDefs) {
    // Illustrator nests clip rects in <defs> and references them from <clipPath>
    // + style="clip-path:…". Strip defs first, then remove orphan clip scaffolding
    // so CSS mask-image glyphs stay visible.
    svg = svg.replace(/<defs>[\s\S]*?<\/defs>/gi, "");
    svg = svg.replace(/<clipPath[\s\S]*?<\/clipPath>/gi, "");
    svg = svg.replace(/\sstyle="[^"]*clip-path:[^"]*"/gi, "");
    svg = svg.replace(/<g clip-path="url\([^)]+\)">/gi, "<g>");
    svg = svg.replace(/clip-path="url\([^)]+\)"/gi, "");
    svg = svg.replace(/clip-rule="nonzero"/gi, "");
    svg = svg.replace(/\sxlink:href="[^"]*"/gi, "");
    svg = svg.replace(/<g>\s*<\/g>/gi, "");
  }

  const waveAttrs = kind === "wave" ? ' preserveAspectRatio="none"' : "";
  const focusable =
    kind === "category" || kind === "workshop" ? ' focusable="false"' : "";
  const standalone = STANDALONE_COLOR[kind];
  const colorAttr = standalone ? ` color="${standalone}"` : "";

  svg = svg.replace(
    /<svg[^>]*>/i,
    `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"${colorAttr} aria-hidden="true"${focusable}${waveAttrs}>`,
  );

  if (cropViewBox) {
    svg = applyViewBox(svg, cropViewBox);
  }

  return svg.trim();
}
