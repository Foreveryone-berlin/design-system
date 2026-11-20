import type { CategoryIconName } from "@/app/_components/FeIcon";

/** Sample workshop and event listings shared by the patterns and home demos. */
export type Listing = {
  image: string;
  alt: string;
  category: CategoryIconName;
  categoryLabel: string;
  spots: string;
  date: string;
  title: string;
  blurb: string;
  price: string;
  kind: "event" | "workshop";
};

export const listings: Listing[] = [
  {
    image: "/images/card-pottery.jpg",
    alt: "Two clay-covered hands shaping a pot with a wooden tool in a pottery studio.",
    category: "arts-crafts",
    categoryLabel: "Arts and Crafts",
    spots: "3 free spots",
    date: "Sunday, Sept 15 · 14:00–17:00",
    title: "Pottery and Clay Morning",
    blurb: "A hands-on, welcoming clay session for all levels. No experience needed.",
    price: "From €10",
    kind: "workshop",
  },
  {
    image: "/images/card-wellbeing.jpg",
    alt: "Three people stretching forward on mats together in a bright, airy studio.",
    category: "balance-wellness",
    categoryLabel: "Balance and Wellness",
    spots: "5 free spots",
    date: "Tuesday, Sept 17 · 18:30–20:00",
    title: "Yoga and Wellbeing Session",
    blurb: "A calm group session to stretch, breathe, and reset. All levels welcome.",
    price: "From €8",
    kind: "workshop",
  },
  {
    image: "/images/card-drawing.jpg",
    alt: "People painting small canvases on easels at an outdoor art session in a park.",
    category: "expression",
    categoryLabel: "Expression",
    spots: "2 free spots",
    date: "Saturday, Sept 21 · 11:00–13:00",
    title: "Drawing and Expression",
    blurb: "Playful portrait drawing in the open air. Bring yourself, we bring the rest.",
    price: "Free",
    kind: "workshop",
  },
  {
    image: "/images/card-community-evening.jpg",
    alt: "Four people laughing around a wooden table over a card and board game.",
    category: "balance-wellness",
    categoryLabel: "Balance and Wellness",
    spots: "Open to all",
    date: "Friday, Sept 20 · 19:00–21:00",
    title: "Community Cafe Evening",
    blurb: "Drop in for conversation, board games, and a warm drink at No. 52.",
    price: "Free",
    kind: "event",
  },
];
