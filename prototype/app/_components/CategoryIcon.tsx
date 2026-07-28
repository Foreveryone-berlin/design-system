/**
 * Workshop category icons. Per Brand Book v1.0 p.24, Workshop Icons are SOLID,
 * filled (orange) silhouettes — never outline/stroke, never shadows/gradients.
 * Glyphs load from prototype/public/icons/categories/*.svg (Figma exports).
 * CSS mask + currentColor so the parent control sets white on orange ground.
 *
 * Canonical five categories; legacy names are kept as aliases so existing
 * prototype usages and live content do not break.
 */
import type { IconSize } from "./ActivityIcon";

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

const LABELS: Record<CanonicalName, string> = {
  "balance-wellness": "Balance and Wellness",
  movement: "Movement",
  "arts-crafts": "Arts and Crafts",
  expression: "Expression",
  music: "Music",
};

function resolve(name: CategoryIconName): CanonicalName {
  if (name in LABELS) return name as CanonicalName;
  return ALIASES[name] ?? "arts-crafts";
}

function sizeClass(size: IconSize): string {
  if (size === "sm") return "fe-workshop-icon--sm";
  if (size === "lg") return "fe-workshop-icon--lg";
  return "fe-workshop-icon--md";
}

export default function CategoryIcon({
  name,
  size = "md",
  chip = false,
}: {
  name: CategoryIconName;
  size?: IconSize;
  chip?: boolean;
}) {
  const key = resolve(name);
  const src = `/icons/categories/${key}.svg`;

  const glyph = (
    <span
      className="fe-category-icon-glyph"
      style={{
        display: "block",
        backgroundColor: "currentColor",
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
      aria-hidden="true"
    />
  );

  if (!chip) return glyph;

  return (
    <span className={`fe-workshop-icon ${sizeClass(size)}`} aria-hidden="true">
      {glyph}
    </span>
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
