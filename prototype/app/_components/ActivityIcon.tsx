/**
 * Activity-level workshop icons (knitting, pottery, etc.). Distinct from the
 * five canonical category icons in CategoryIcon. Solid orange silhouettes via
 * CSS mask + currentColor on an orange chip ground.
 */
export type ActivityIconName =
  | "knitting"
  | "pottery"
  | "thread"
  | "chess-filled"
  | "writing";

export type IconSize = "sm" | "md" | "lg";

const LABELS: Record<ActivityIconName, string> = {
  knitting: "Knitting",
  pottery: "Pottery",
  thread: "Thread",
  "chess-filled": "Chess",
  writing: "Writing",
};

export const ACTIVITY_NAMES = Object.keys(LABELS) as ActivityIconName[];

export { LABELS as ACTIVITY_LABELS };

function sizeClass(size: IconSize): string {
  if (size === "sm") return "fe-workshop-icon--sm";
  if (size === "lg") return "fe-workshop-icon--lg";
  return "fe-workshop-icon--md";
}

export default function ActivityIcon({
  name,
  size = "md",
  chip = true,
}: {
  name: ActivityIconName;
  size?: IconSize;
  chip?: boolean;
}) {
  const src = `/icons/workshop/${name}.svg`;

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
