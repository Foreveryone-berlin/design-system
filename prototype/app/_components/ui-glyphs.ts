import { UI_GLYPH_MARKUP } from "./ui-glyph-markup";

/**
 * Catalog order of the inline stroke glyphs. The artwork itself lives in
 * `ui-glyph-markup.ts`, which the standalone-file generator reads too.
 */
export const UI_GLYPHS: { label: string; name: string }[] = [
  { label: "Chevron down", name: "chevron-down" },
  { label: "Check circle", name: "check-circle" },
  { label: "Clock", name: "clock" },
  { label: "Location pin", name: "location-pin" },
  { label: "Close", name: "close" },
  { label: "Mail", name: "mail" },
  { label: "Plus", name: "plus" },
  { label: "Minus", name: "minus" },
  { label: "Phone", name: "phone" },
  { label: "Play", name: "play" },
  { label: "Instagram", name: "instagram" },
  { label: "Copy", name: "copy" },
  { label: "Check", name: "check" },
].filter(({ name }) => name in UI_GLYPH_MARKUP);

export const FILE_GLYPHS = [
  { label: "Arrow right", src: "/icons/arrow-right.svg" },
  { label: "External link", src: "/icons/external-link.svg" },
] as const;

export const SOCIAL_ICONS = [
  { file: "/icons/social/facebook.svg", label: "Facebook" },
  { file: "/icons/social/instagram.svg", label: "Instagram" },
  { file: "/icons/social/linkedin.svg", label: "LinkedIn" },
  { file: "/icons/social/email.svg", label: "Email" },
  { file: "/icons/social/location.svg", label: "Location" },
  { file: "/icons/social/whatsapp.svg", label: "WhatsApp" },
] as const;
