// Single source of truth for the design-system navigation, shared by the
// desktop sidebar (Navigation) and the mobile nav (MobileNav). Ordered
// broad to specific, leading with the most-used pages (Foundations,
// Components, Patterns) per the design-system IA convention.

export type NavLink = { href: string; label: string };
export type NavGroup = { label: string; links: NavLink[] };

// Top-level Overview link sits above the groups.
export const overviewLink: NavLink = { href: "/", label: "Overview" };

export const navGroups: NavGroup[] = [
  {
    label: "Foundations",
    links: [
      { href: "/foundations", label: "Foundations" },
      { href: "/visual-elements", label: "Visual Elements" },
    ],
  },
  {
    label: "Build",
    links: [
      { href: "/components", label: "Components" },
      { href: "/patterns", label: "Patterns" },
    ],
  },
  {
    label: "Brand",
    links: [
      { href: "/brand", label: "Brand & Voice" },
      { href: "/logo", label: "Logo" },
      { href: "/print", label: "Print & Media" },
    ],
  },
  {
    label: "Guidance",
    links: [
      { href: "/guidelines", label: "Guidelines" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/governance", label: "Governance" },
      { href: "/credits", label: "Credits" },
    ],
  },
];

// Flat list of every navigable page, in IA order, for places that need a
// single sequence (search fallback, sitemaps of intent, etc.).
export const allNavLinks: NavLink[] = [
  overviewLink,
  ...navGroups.flatMap((g) => g.links),
];
