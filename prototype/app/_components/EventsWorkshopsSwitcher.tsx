"use client";

import Image from "next/image";
import { useState } from "react";
import FeIcon, { CATEGORY_LABELS, type CategoryIconName } from "./FeIcon";

type Listing = {
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

const listings: Listing[] = [
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

function CheckCircle() {
  return <FeIcon set="ui" name="check-circle" size="sm" />;
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
