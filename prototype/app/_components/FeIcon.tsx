import { FILE_GLYPHS, SOCIAL_ICONS } from "./ui-glyphs";
import { UI_GLYPH_MARKUP, UI_GLYPH_ROOT } from "./ui-glyph-markup";

export type IconSize = "sm" | "md" | "lg";

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

type CanonicalCategoryName =
  | "balance-wellness"
  | "movement"
  | "arts-crafts"
  | "expression"
  | "music";

const CATEGORY_ALIASES: Record<string, CanonicalCategoryName> = {
  wellness: "balance-wellness",
  painting: "arts-crafts",
  pottery: "arts-crafts",
  language: "expression",
};

export const CATEGORY_LABELS: Record<CanonicalCategoryName, string> = {
  "balance-wellness": "Balance and Wellness",
  movement: "Movement",
  "arts-crafts": "Arts and Crafts",
  expression: "Expression",
  music: "Music",
};

export const CATEGORY_NAMES: CanonicalCategoryName[] = [
  "balance-wellness",
  "movement",
  "arts-crafts",
  "expression",
  "music",
];

export function resolveCategory(name: CategoryIconName): CanonicalCategoryName {
  if (name in CATEGORY_LABELS) return name as CanonicalCategoryName;
  return CATEGORY_ALIASES[name] ?? "arts-crafts";
}

export type ActivityIconName =
  | "knitting"
  | "pottery"
  | "thread"
  | "chess-filled"
  | "writing";

export const ACTIVITY_LABELS: Record<ActivityIconName, string> = {
  knitting: "Knitting",
  pottery: "Pottery",
  thread: "Thread",
  "chess-filled": "Chess",
  writing: "Writing",
};

export const ACTIVITY_NAMES: ActivityIconName[] = Object.keys(
  ACTIVITY_LABELS,
) as ActivityIconName[];

export type SocialIconName =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "email"
  | "location"
  | "whatsapp";

export const SOCIAL_LABELS: Record<SocialIconName, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  email: "Email",
  location: "Location",
  whatsapp: "WhatsApp",
};

export const SOCIAL_NAMES: SocialIconName[] = Object.keys(SOCIAL_LABELS) as SocialIconName[];

export type FileIconName = "arrow-right" | "external-link";

export const FILE_LABELS: Record<FileIconName, string> = {
  "arrow-right": "Arrow right",
  "external-link": "External link",
};

export const FILE_NAMES: FileIconName[] = Object.keys(FILE_LABELS) as FileIconName[];

export type UiGlyphName =
  | "chevron-down"
  | "check-circle"
  | "check"
  | "clock"
  | "location-pin"
  | "close"
  | "mail"
  | "plus"
  | "minus"
  | "phone"
  | "play"
  | "instagram"
  | "copy";

export const UI_LABELS: Record<UiGlyphName, string> = {
  "chevron-down": "Chevron down",
  "check-circle": "Check circle",
  "check": "Check",
  clock: "Clock",
  "location-pin": "Location pin",
  close: "Close",
  mail: "Mail",
  plus: "Plus",
  minus: "Minus",
  phone: "Phone",
  play: "Play",
  instagram: "Instagram",
  copy: "Copy",
};

export const UI_NAMES: UiGlyphName[] = Object.keys(UI_LABELS) as UiGlyphName[];

const SOCIAL_PATHS: Record<SocialIconName, string> = SOCIAL_ICONS.reduce(
  (acc, { file, label }) => {
    const key = SOCIAL_NAMES.find((n) => SOCIAL_LABELS[n] === label);
    if (key) acc[key] = file;
    return acc;
  },
  {} as Record<SocialIconName, string>,
);

const FILE_PATHS: Record<FileIconName, string> = FILE_GLYPHS.reduce(
  (acc, { src, label }) => {
    const key = FILE_NAMES.find((n) => FILE_LABELS[n] === label);
    if (key) acc[key] = src;
    return acc;
  },
  {} as Record<FileIconName, string>,
);

type BaseProps = {
  size?: IconSize;
  chip?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

type CategoryProps = BaseProps & {
  set: "category";
  name: CategoryIconName;
};

type ActivityProps = BaseProps & {
  set: "activity";
  name: ActivityIconName;
};

type SocialProps = BaseProps & {
  set: "social";
  name: SocialIconName;
};

type FileProps = BaseProps & {
  set: "file";
  name: FileIconName;
};

type UiProps = BaseProps & {
  set: "ui";
  name: UiGlyphName;
};

export type FeIconProps =
  | CategoryProps
  | ActivityProps
  | SocialProps
  | FileProps
  | UiProps;

const maskStyle = (src: string): React.CSSProperties => ({
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
});

function MaskIcon({
  src,
  size,
  chip,
  className,
  style,
}: {
  src: string;
  size: IconSize;
  chip: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const glyph = (
    <span
      className={`fe-icon-glyph${chip ? "" : ` fe-icon-glyph--${size}`}${
        className ? ` ${className}` : ""
      }`}
      style={{ ...maskStyle(src), ...style }}
      aria-hidden="true"
    />
  );

  if (!chip) return glyph;

  return (
    <span className={`fe-workshop-icon fe-workshop-icon--${size}`} aria-hidden="true">
      {glyph}
    </span>
  );
}

export default function FeIcon(props: FeIconProps) {
  const { set, name, size = "md", chip = false, className, style } = props;

  if (set === "ui") {
    const markup = UI_GLYPH_MARKUP[name];
    if (!markup) return null;
    return (
      <svg
        className={`ds-icon-glyph--${size}${className ? ` ${className}` : ""}`}
        aria-hidden="true"
        focusable="false"
        style={style}
        {...UI_GLYPH_ROOT}
        // Static, repo-authored artwork from ui-glyph-markup.ts, shared verbatim
        // with the standalone .svg files so the two can never drift.
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    );
  }

  if (set === "file") {
    const src = FILE_PATHS[name];
    if (!src) return null;
    return (
      <img
        src={src}
        alt=""
        className={`ds-icon-glyph--${size}${className ? ` ${className}` : ""}`}
        aria-hidden="true"
        style={style}
      />
    );
  }

  if (set === "category") {
    return (
      <MaskIcon
        src={`/icons/categories/${resolveCategory(name)}.svg`}
        size={size}
        chip={chip}
        className={className}
        style={style}
      />
    );
  }

  if (set === "activity") {
    return (
      <MaskIcon
        src={`/icons/workshop/${name}.svg`}
        size={size}
        chip={chip}
        className={className}
        style={style}
      />
    );
  }

  if (set === "social") {
    const src = SOCIAL_PATHS[name];
    if (!src) return null;
    return (
      <MaskIcon
        src={src}
        size={size}
        chip={chip}
        className={className}
        style={style}
      />
    );
  }

  return null;
}
