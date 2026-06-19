import type { ReactNode } from "react";

/**
 * Workshop category icons. Per Brand Book v1.0 p.24, Workshop Icons are SOLID,
 * filled (orange) silhouettes — never outline/stroke, never shadows/gradients.
 * Single colour via fill="currentColor"; the control sets the colour (orange
 * ground + white glyph, or grey at rest). Always paired with a text label.
 *
 * Canonical five categories; legacy names are kept as aliases so existing
 * prototype usages and live content do not break.
 */
export type CategoryIconName =
  | "balance-wellness"
  | "movement"
  | "arts-crafts"
  | "expression"
  | "music"
  // legacy aliases → canonical glyph
  | "wellness"
  | "painting"
  | "pottery"
  | "language";

type CanonicalName =
  | "balance-wellness"
  | "movement"
  | "arts-crafts"
  | "expression"
  | "music";

const ALIASES: Record<string, CanonicalName> = {
  wellness: "balance-wellness",
  painting: "arts-crafts",
  pottery: "arts-crafts",
  language: "expression",
};

// Solid filled glyphs on a 48×48 grid. fill="currentColor". Redrawn to match the
// Brand Book p.24 exemplars (palette + brush, pottery, fountain pen + ink, etc.):
// bold, recognisable, filled silhouettes — no outline, shadow, or gradient.
const ICONS: Record<CanonicalName, ReactNode> = {
  // Balance & Wellness — a leaf/sprout with a stem (calm, growth).
  "balance-wellness": (
    <>
      <path d="M24 7c-7 0-13 5-13 14 0 1.6.2 3.1.6 4.5C14 21 19 18 24 17c-4 2.5-8 6.4-10.4 11.6C16 32 19.6 34 24 34c8 0 13-6 13-14C37 12 31 7 24 7z" />
      <path d="M22 30h4v11h-4z" />
    </>
  ),
  // Movement — a running figure mid-stride.
  movement: (
    <>
      <circle cx="30" cy="10" r="5" />
      <path d="M27 18c-1.8.4-3.2 1.6-4 3.3l-2.6 5.6-6.6-3-2 3.6 8.4 3.8c1.4.6 3 .2 4-1l1-1.3 1 6.6-6.8 7.2 3 2.8 7.6-8c.7-.7 1-1.7.9-2.7l-.9-6.6 3 4.2 6.8 2.4 1.4-3.8-5.8-2-4.2-6c-1-1.4-2.6-2.2-4.3-2.1z" />
    </>
  ),
  // Arts & Crafts — a paint palette with a brush (Brand Book p.24 exemplar).
  "arts-crafts": (
    <>
      <path d="M21 7C12 7 5 13 5 22c0 8 6 14 15 14 2.6 0 4.4-1.8 4.4-4.2 0-1.2-.5-2.2-1.2-3-.5-.6-.8-1.2-.8-2 0-1.8 1.5-3.2 3.4-3.2H29c7 0 12-5 12-12C41 11.5 31 7 21 7zM12 26a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm3-10a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm9-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm8 3a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
      <path d="M37 28l5.6-5.6c.8-.8.8-2 0-2.8l-1.2-1.2c-.8-.8-2-.8-2.8 0L33 24l1.4 1.4-7 7 1.4 1.4 7-7z" />
    </>
  ),
  // Expression — a fountain-pen nib with a flowing ink stroke (p.24 exemplar).
  expression: (
    <>
      <path d="M14 30 33 11l4 4-19 19-6.4 1.4zm5.4 3.2 1.4-1.4-2.6-2.6-1.4 1.4z" />
      <path d="M6 42c1.6-3 4-4.6 7-4.6 1.6 0 3 .5 4.4 1.4-1.4 1.6-3.6 2.6-6.4 3.1-1.6.3-3.2.4-5 .1z" />
    </>
  ),
  // Music — an eighth-note pair (beamed).
  music: (
    <>
      <path d="M19 9l20-3.5v6.5L23 15v17.5A7 7 0 1 1 19 26V9z" />
      <path d="M39 12v9.5A7 7 0 1 1 35 15V12.4z" />
    </>
  ),
};

const LABELS: Record<CanonicalName, string> = {
  "balance-wellness": "Balance and Wellness",
  movement: "Movement",
  "arts-crafts": "Arts and Crafts",
  expression: "Expression",
  music: "Music",
};

function resolve(name: CategoryIconName): CanonicalName {
  if (name in ICONS) return name as CanonicalName;
  return ALIASES[name] ?? "arts-crafts";
}

export default function CategoryIcon({ name }: { name: CategoryIconName }) {
  const key = resolve(name);
  return (
    <svg
      viewBox="0 0 48 48"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[key]}
    </svg>
  );
}

export const CATEGORY_NAMES: CanonicalName[] = [
  "balance-wellness",
  "movement",
  "arts-crafts",
  "expression",
  "music",
];

export { LABELS as CATEGORY_LABELS };
