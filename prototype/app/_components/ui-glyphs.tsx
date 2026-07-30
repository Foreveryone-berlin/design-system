import type { ReactNode } from "react";

/** Inline stroke glyphs from the Figma icon set (24×24, stroke 2, currentColor). */
export const UI_GLYPHS: { label: string; path: ReactNode }[] = [
  { label: "Chevron down", path: <polyline points="6 9 12 15 18 9" /> },
  {
    label: "Check circle",
    path: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="8.5 12.5 11 15 16 9.5" />
      </>
    ),
  },
  {
    label: "Clock",
    path: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15.5 14" />
      </>
    ),
  },
  {
    label: "Location pin",
    path: (
      <>
        <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15.4 12 21 12 21z" />
        <circle cx="12" cy="10.5" r="2.5" />
      </>
    ),
  },
  { label: "Close", path: <path d="M6 6l12 12M18 6L6 18" /> },
  {
    label: "Mail",
    path: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3 7 12 13 21 7" />
      </>
    ),
  },
  { label: "Plus", path: <path d="M12 5v14M5 12h14" /> },
  { label: "Minus", path: <path d="M5 12h14" /> },
  {
    label: "Phone",
    path: (
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    ),
  },
  {
    label: "Play",
    path: <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />,
  },
  {
    label: "Instagram",
    path: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Copy",
    path: (
      <>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
  },
  { label: "Check", path: <polyline points="20 6 9 17 4 12" /> },
];

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
