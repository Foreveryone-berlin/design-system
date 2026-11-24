/**
 * Design system prototype copy — focused on tokens, components, and documentation.
 * Agnostic of product/marketing; for design.foreveryone.berlin.
 */

export const hero = {
  headline: "ForEveryone Design System",
  tagline:
    "Design tokens, components, and patterns for the ForEveryone digital experience.",
  ctaPrimary: "View tokens",
  ctaSecondary: "Discover more",
} as const;

export const story = {
  title: "From one token to a full page",
  lead: "Everything here is built in three layers. Pick a workshop category and follow its colour from token to component to page pattern.",
  layers: [
    {
      name: "Token",
      href: "/foundations",
      body: "A named value, set once in the design tokens.",
      link: "See the foundations",
    },
    {
      name: "Component",
      href: "/components",
      body: "The category tag reads the token. No colour is typed by hand.",
      link: "See the components",
    },
    {
      name: "Pattern",
      href: "/patterns",
      body: "The workshop card puts the tag next to a photo, a title, and a date.",
      link: "See the patterns",
    },
  ],
  outro: "Change the token and every layer follows, on this site and on the main ForEveryone site.",
} as const;

export const stats = [
  { label: "Color tokens", value: "100", href: "/foundations#colors" },
  { label: "Components", value: "15", href: "/components" },
  { label: "Patterns", value: "15", href: "/patterns" },
  { label: "Agent skills", value: "10", href: "/agent-skills" },
] as const;
