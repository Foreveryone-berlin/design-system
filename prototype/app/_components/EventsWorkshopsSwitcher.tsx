"use client";

import Image from "next/image";
import { useState } from "react";
import { CATEGORY_LABELS } from "./CategoryIcon";

type Listing = {
  image: string;
  alt: string;
  category: keyof typeof CATEGORY_LABELS;
  categoryLabel: string;
  spots: string;
  date: string;
  title: string;
  blurb: string;
  price: string;
  kind: "event" | "workshop";
};

const listings: Listing[] = [
  {
    image: "/images/workshop-pottery.jpg",
    alt: "People shaping clay together at a table in a bright art studio.",
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
    image: "/images/workshop-group.jpg",
    alt: "People practice yoga and wellbeing exercises together in a bright studio.",
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
    image: "/images/workshop-drawing.jpg",
    alt: "People holding up colourful portrait drawings at an outdoor table.",
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
    image: "/images/Group_2.png",
    alt: "A group of people together at a ForEveryone community gathering.",
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

function CheckCircle() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="8.5 12.5 11 15 16 9.5" />
    </svg>
  );
}

export default function EventsWorkshopsSwitcher() {
  const [kind, setKind] = useState<"event" | "workshop">("workshop");

  const visible = listings.filter((item) => item.kind === kind);

  return (
    <div className="ds-events-switcher">
      <div className="ds-events-switcher__toggle" role="group" aria-label="Listing type">
        {(["event", "workshop"] as const).map((value) => (
          <button
            key={value}
            type="button"
            className={`ds-events-switcher__kind${kind === value ? " is-active" : ""}`}
            aria-pressed={kind === value}
            onClick={() => setKind(value)}
          >
            {value === "event" ? "Events" : "Workshops"}
          </button>
        ))}
      </div>

      <div className="fe-event-tabs" role="group" aria-label="Filter by date">
        {["This Week", "This Month", "Next Month", "Choose Date"].map((tab, i) => (
          <button
            key={tab}
            type="button"
            aria-pressed={i === 0}
            className={`fe-event-tab${i === 0 ? " is-active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="ds-events-grid">
        {visible.map((item) => (
          <div className="fe-card" key={item.title}>
            <div className="fe-card__media">
              <Image
                src={item.image}
                alt={item.alt}
                width={360}
                height={200}
                sizes="(max-width: 768px) 100vw, 320px"
              />
              <span className="fe-card-badge">{item.spots}</span>
              <span className="fe-card-category">{item.categoryLabel}</span>
            </div>
            <div className="fe-card__body">
              <div className="fe-card-meta">
                <CheckCircle /> {item.date}
              </div>
              <h3 className="fe-h3" style={{ margin: "0 0 var(--spacing-2)" }}>
                {item.title}
              </h3>
              <p
                className="fe-body"
                style={{
                  margin: 0,
                  fontSize: "var(--font-size-sm)",
                  color: "var(--color-brand-dark)",
                }}
              >
                {item.blurb}
              </p>
              <div className="fe-card-price">
                <span className="fe-card-price__amount">{item.price}</span>
                <a href="#events-workshops-switcher" className="fe-btn-secondary">
                  {kind === "event" ? "View Event" : "Book Workshop"} &rarr;
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
