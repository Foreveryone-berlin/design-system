"use client";

import Image from "next/image";
import { useState } from "react";
import { listings } from "@/content/workshop-listings";
import FeIcon from "./FeIcon";

function CheckCircle() {
  return <FeIcon set="ui" name="check-circle" size="sm" />;
}

export default function EventsWorkshopsSwitcher() {
  const [kind, setKind] = useState<"event" | "workshop">("workshop");
  const [dateTab, setDateTab] = useState(0);

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
            aria-pressed={dateTab === i}
            className={`fe-event-tab${dateTab === i ? " is-active" : ""}`}
            onClick={() => setDateTab(i)}
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
                  {kind === "event" ? "View Event" : "Book workshop"} &rarr;
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
