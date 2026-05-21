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
    "Colors, typography, spacing, radius, shadows, and motion are defined as design tokens.",
  bodyLine2:
    "Buttons, cards, forms, and layout patterns use those tokens so the main site and this prototype stay consistent.",
} as const;

export const stats = [
  { label: "Color tokens", value: "24" },
  { label: "Spacing scale", value: "8" },
  { label: "Components", value: "12+" },
  { label: "Motion presets", value: "3" },
] as const;

export const benefits = [
  "Tokens drive CSS custom properties.",
  "Components are documented with live examples.",
  "Light theme only in this prototype.",
] as const;

export const ctas = {
  bookWorkshop: "Primary CTA",
  exploreEvents: "Explore",
  exploreWorkshops: "View all",
  learnMore: "Learn more",
  getInTouch: "Get in touch",
  communityCafe: "Link",
} as const;

export const designSystemIntro =
  "This page showcases the design system. Use the sections below to inspect tokens and components.";
