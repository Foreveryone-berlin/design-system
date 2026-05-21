import type { ReactNode } from "react";

export type CategoryIconName = "painting" | "pottery" | "wellness" | "language";

const ICONS: Record<CategoryIconName, ReactNode> = {
  painting: (
    <>
      <path d="M6 3v14a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3v-3h6a2 2 0 0 0 2-2V8a5 5 0 0 0-5-5z" />
      <circle cx="9" cy="17" r="1" fill="currentColor" />
    </>
  ),
  pottery: (
    <>
      <path d="M5 8h14l-1 12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" />
      <path d="M5 8c0-2 2-3 7-3s7 1 7 3" />
      <path d="M9 13c1 1 5 1 6 0" />
    </>
  ),
  wellness: (
    <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
  ),
  language: (
    <>
      <path d="M4 7h10" />
      <path d="M9 4v3" />
      <path d="M5 18s2-5 4-5 3 5 5 5" />
      <path d="M14 14h6" />
      <path d="M17 14l3 6m0-6l-3 6" />
    </>
  ),
};

export default function CategoryIcon({ name }: { name: CategoryIconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  );
}
