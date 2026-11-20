"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { story } from "@/content/site-copy";
import { listings, type Listing } from "@/content/workshop-listings";

type Choice = { key: string; label: string; token: string; listing: Listing };

function choice(key: string, label: string, token: string, title: string): Choice {
  const listing = listings.find((item) => item.title === title);
  if (!listing) throw new Error(`Missing workshop listing: ${title}`);
  return { key, label, token, listing };
}

const CHOICES: Choice[] = [
  choice("arts", "Arts and Crafts", "--color-lavender-500", "Pottery and Clay Morning"),
  choice("balance", "Balance and Wellness", "--color-green-500", "Yoga and Wellbeing Session"),
  choice("expression", "Expression", "--color-teal-deep", "Drawing and Expression"),
];

export default function HomeStory() {
  const [index, setIndex] = useState(0);
  const current = CHOICES[index];
  const pill = `fe-tag-pill fe-tag-pill--${current.key} active`;

  const stages: ReactNode[] = [
    <div className="ds-story__stage" key="token">
      <span
        className="ds-story__swatch"
        style={{ backgroundColor: `var(${current.token})` }}
        aria-hidden="true"
      />
      <code className="ds-story__code">{current.token}</code>
    </div>,
    <div className="ds-story__stage" key="component">
      <span className={pill}>{current.label}</span>
      <code className="ds-story__code">.fe-tag-pill--{current.key}</code>
    </div>,
    <div className="fe-card ds-story__card" key="pattern">
      <div className="fe-card__media">
        {/* All photos stay mounted and cross-fade, so a switch never waits on an image load. */}
        {CHOICES.map((c, i) => (
          <Image
            key={c.key}
            src={c.listing.image}
            alt={i === index ? c.listing.alt : ""}
            aria-hidden={i === index ? undefined : true}
            width={360}
            height={200}
            sizes="(max-width: 768px) 100vw, 360px"
            className={`ds-story__photo${i === index ? " is-active" : ""}`}
          />
        ))}
        <span className="fe-card-badge">{current.listing.spots}</span>
      </div>
      <div className="fe-card__body">
        <span className={pill}>{current.label}</span>
        <p className="ds-story__card-title">{current.listing.title}</p>
        <p className="fe-card-meta">{current.listing.date}</p>
      </div>
    </div>,
  ];

  return (
    <section className="ds-section ds-story" aria-labelledby="story-heading">
      <h2 id="story-heading" className="ds-home-heading">
        {story.title}
      </h2>
      <p className="fe-body ds-story__lead">{story.lead}</p>

      <div className="ds-story__picker" role="group" aria-label="Workshop category">
        {CHOICES.map((c, i) => (
          <button
            key={c.key}
            type="button"
            className={`fe-tag-pill fe-tag-pill--${c.key}${i === index ? " active" : ""}`}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="ds-visually-hidden" aria-live="polite">
        {`${current.label}: token ${current.token}, card ${current.listing.title}.`}
      </p>

      <ol className="ds-story__layers">
        {story.layers.map((layer, i) => (
          <li className="ds-story__layer" key={layer.name}>
            <h3 className="ds-story__step">
              <span className="ds-story__num" aria-hidden="true">
                {i + 1}
              </span>
              {layer.name}
            </h3>
            {stages[i]}
            <p className="ds-story__text">{layer.body}</p>
            <Link href={layer.href} className="ds-story__link">
              {layer.link}
            </Link>
          </li>
        ))}
      </ol>

      <p className="ds-story__outro">{story.outro}</p>
    </section>
  );
}
