/**
 * Design system prototype copy — focused on tokens, components, and documentation.
 * Agnostic of product/marketing; for design.foreveryone.berlin.
 */

export const hero = {
  headline: "ForEveryone Design System",
  tagline:
    "Design tokens, components, and patterns for the ForEveryone digital experience.",
  ctaPrimary: "View tokens",
  ctaSecondary: "View components",
} as const;

export const mission = {
  title: "What’s in this system",
  bodyLine1:
    "Colours, typography, spacing, radius, and shadows are defined as design tokens.",
  bodyLine2:
    "Buttons, cards, forms, and layout patterns use those tokens so the main site and this prototype stay consistent.",
} as const;

export const stats = [
  { label: "Colour tokens", value: "80+" },
  { label: "Spacing scale", value: "19" },
  { label: "Components", value: "15+" },
  { label: "Breakpoints", value: "3" },
] as const;

export const designSystemIntro =
  "This page showcases the design system. Use the sections below to inspect tokens and components.";
