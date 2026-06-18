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

// Solid filled glyphs on a 48×48 grid. fill="currentColor".
const ICONS: Record<CanonicalName, ReactNode> = {
  // Balance & Wellness — a lotus / leaf cluster (calm, growth).
  "balance-wellness": (
    <>
      <path d="M24 6c-4 5-6 10-6 15 0 4 2.6 7.4 6 9 3.4-1.6 6-5 6-9 0-5-2-10-6-15z" />
      <path d="M11 19c-1 6 1.4 11 7 14-1-6-3.4-10.4-7-14z" />
      <path d="M37 19c1 6-1.4 11-7 14 1-6 3.4-10.4 7-14z" />
      <path d="M14 38c3-2 6.4-3 10-3s7 1 10 3c-3 2-6.4 3-10 3s-7-1-10-3z" />
    </>
  ),
  // Movement — a figure mid-motion.
  movement: (
    <>
      <circle cx="28" cy="9" r="4.5" />
      <path d="M30 15c-2 0-3.6 1.2-4.4 3l-3.2 7-7-2.4-1.4 4 9.4 3.4 1.8-4 1.6 4.8L19 42l3.4 2.6 6-9.4c.6-1 .7-2.2.3-3.3l-1.6-4.6 3.5 2.1 2.8 6.4 3.8-1.6-3.3-7.6c-.5-1.1-1.5-2-2.7-2.4L30 19z" />
    </>
  ),
  // Arts & Crafts — a paint palette with brush (Brand Book p.24 exemplar).
  "arts-crafts": (
    <>
      <path d="M22 6C13 6 6 12.5 6 21c0 7 5 12 12 12 2.2 0 3.6-1.4 3.6-3.4 0-1-.4-1.8-1-2.6-.5-.7-.9-1.4-.9-2.3 0-1.8 1.5-3.2 3.4-3.2H27c6 0 11-4.6 11-11C38 10.6 31 6 22 6zM13 24a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2zm3-9a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2zm8-1.4a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2zm8 3a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2z" />
      <path d="M33 30l7-7 3 3-7 7-3.6.6z" />
    </>
  ),
  // Expression — a fountain pen / quill nib with an ink stroke.
  expression: (
    <>
      <path d="M34 6l8 8-19 19-9 1.6 1.6-9z" />
      <path d="M10 38c2-1 5-1 7 0-2 2-5 3-9 4 .4-1.6 1-2.8 2-4z" />
    </>
  ),
  // Music — an eighth-note pair.
  music: (
    <>
      <path d="M20 8l18-3v6L24 14v18.5A6.5 6.5 0 1 1 20 26.4V8z" />
      <path d="M38 11v9.5A6.5 6.5 0 1 1 34 14.4V11z" />
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
