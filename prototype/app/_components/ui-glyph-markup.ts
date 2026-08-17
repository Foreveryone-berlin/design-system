/**
 * Inner markup of the stroke glyphs from the Figma icon set (24×24, stroke 2,
 * `currentColor`), as plain strings so one definition feeds both renderers:
 * `FeIcon` injects it inline, and `scripts/build-ui-glyphs.mjs` writes the
 * standalone `.svg` files the Visual Elements page links to. Keeping it as JSX
 * would force the file generator to duplicate the paths, and the two copies
 * would drift.
 *
 * Root attributes live in UI_GLYPH_ROOT below; anything a single glyph needs to
 * override (a solid fill, say) stays on its own element here.
 */
export const UI_GLYPH_MARKUP: Record<string, string> = {
  "chevron-down": `<polyline points="6 9 12 15 18 9" />`,
  "check-circle": `<circle cx="12" cy="12" r="9" /><polyline points="8.5 12.5 11 15 16 9.5" />`,
  clock: `<circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" />`,
  "location-pin": `<path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15.4 12 21 12 21z" /><circle cx="12" cy="10.5" r="2.5" />`,
  close: `<path d="M6 6l12 12M18 6L6 18" />`,
  mail: `<rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" />`,
  plus: `<path d="M12 5v14M5 12h14" />`,
  minus: `<path d="M5 12h14" />`,
  phone: `<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />`,
  play: `<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />`,
  instagram: `<rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />`,
  copy: `<rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />`,
  check: `<polyline points="20 6 9 17 4 12" />`,
};

/** Shared root attributes, so the inline SVG and the shipped file match. */
export const UI_GLYPH_ROOT = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Where `build-ui-glyphs.mjs` writes the standalone files. */
export const UI_GLYPH_DIR = "/icons/ui";
