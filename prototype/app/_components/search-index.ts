// Static search index for the design-system docs. Each page contributes one
// page-level entry plus one entry per major section, so a query resolves to
// /route#section-id. Section IDs use the same slugify as the on-this-page
// rail (see slugify.ts), so links land on the right heading.
//
// Kept in sync by hand with the section titles (h2.ds-section-title) on each
// page. When you add or rename a section, update the matching list here.
import { slugify } from "./slugify";

type PageDef = {
  route: string;
  title: string;
  description: string;
  sections: string[];
};

const pages: PageDef[] = [
  {
    route: "/foundations",
    title: "Foundations",
    description:
      "Colour, typography, spacing, radius, shadows, and layout as design tokens.",
    sections: [
      "Colours",
      "Colour ramps",
      "Approved colour combinations",
      "Typography",
      "Spacing",
      "Radius & shadows",
      "Motion",
      "Layout",
    ],
  },
  {
    route: "/visual-elements",
    title: "Visual Elements",
    description:
      "Workshop icons, line illustrations, accent marks, and graphic shapes.",
    sections: [
      "Workshop icons",
      "Line illustrations",
      "Decorative accent marks",
      "Graphic shapes",
    ],
  },
  {
    route: "/components",
    title: "Components",
    description:
      "Buttons, inputs, cards, tags, navigation, icons, and overlays.",
    sections: [
      "Actions",
      "Forms & inputs",
      "Tags & labels",
      "Navigation",
      "Content & media",
      "Iconography",
      "Overlays",
    ],
  },
  {
    route: "/patterns",
    title: "Patterns",
    description:
      "Header, footer, workshop cards, and composite layouts built from components.",
    sections: [
      "Header (desktop & mobile)",
      "Footer",
      "Category filter bar",
      "Hero with blob photo",
      "Activity workshop card",
      "Workshop card (full)",
      "Upcoming workshops",
      "Card benefit & get involved",
    ],
  },
  {
    route: "/brand",
    title: "About & Brand",
    description:
      "Who we are, mission and vision, values, personality, voice and tone.",
    sections: [
      "Who we are",
      "Mission & vision",
      "Our values",
      "Brand personality",
      "Voice & tone",
      "How to represent us",
    ],
  },
  {
    route: "/logo",
    title: "Logo",
    description:
      "Logo variants, clear space, background combinations, and incorrect usage.",
    sections: [
      "Variants",
      "At a glance",
      "Clear space",
      "Background combinations",
      "Logo on photography",
      "Incorrect usage",
    ],
  },
  {
    route: "/print",
    title: "Print & Media",
    description:
      "The digital to print boundary: Young Serif, CMYK values, document greys, cafe signs.",
    sections: [
      "Digital vs print at a glance",
      "Young Serif (print only)",
      "CMYK values",
      "Print purple (substitutes Blue)",
      "Document greys",
      "Cafe signs",
      "Adjusting photos (Canva)",
    ],
  },
  {
    route: "/guidelines",
    title: "Guidelines",
    description:
      "How to combine colour, type, and illustration on-brand, with do and don't rules.",
    sections: [
      "Colour usage",
      "Typography",
      "Illustration & blobs",
      "Do & don't",
      "How to represent us",
    ],
  },
  {
    route: "/accessibility",
    title: "Accessibility",
    description:
      "Our commitment, conformance target, what is built in, contrast, alt text, and testing.",
    sections: [
      "Our commitment",
      "Conformance target",
      "What is built in",
      "Colour & contrast",
      "How we test",
      "Alt text",
      "Feedback",
      "Status",
    ],
  },
  {
    route: "/governance",
    title: "Governance",
    description:
      "Source of truth, versioning, contribution, ethics, and the changelog.",
    sections: [
      "Source of truth",
      "Versioning",
      "Contribution",
      "Ethical representation",
      "Contact & permissions",
      "Changelog",
    ],
  },
  {
    route: "/credits",
    title: "Credits",
    description:
      "Contributors, tools, and licence terms for the ForEveryone design system.",
    sections: [
      "Contributors",
      "Built with",
      "Accessibility tooling",
      "Licence",
    ],
  },
];

export type SearchEntry = {
  title: string;
  route: string;
  href: string;
  section?: string;
  description?: string;
  // Lowercased haystack for matching.
  haystack: string;
};

export const searchIndex: SearchEntry[] = pages.flatMap((page) => {
  const pageEntry: SearchEntry = {
    title: page.title,
    route: page.route,
    href: page.route,
    description: page.description,
    haystack: `${page.title} ${page.description}`.toLowerCase(),
  };
  const sectionEntries: SearchEntry[] = page.sections.map((section) => ({
    title: page.title,
    route: page.route,
    href: `${page.route}#${slugify(section)}`,
    section,
    haystack: `${page.title} ${section}`.toLowerCase(),
  }));
  return [pageEntry, ...sectionEntries];
});

// Substring match with light ranking: page-title hits and prefix hits rank
// above mid-string section hits. Returns at most `limit` entries.
export function searchDocs(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored = searchIndex
    .map((entry) => {
      const idx = entry.haystack.indexOf(q);
      if (idx === -1) return null;
      let score = idx; // earlier match = better
      if (!entry.section) score -= 50; // prefer landing on the page entry
      if (entry.title.toLowerCase().startsWith(q)) score -= 100;
      if ((entry.section ?? "").toLowerCase().startsWith(q)) score -= 25;
      return { entry, score };
    })
    .filter((x): x is { entry: SearchEntry; score: number } => x !== null)
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((x) => x.entry);
  return scored;
}
