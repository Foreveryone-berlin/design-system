"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { stats } from "@/content/site-copy";
import StatCounter from "./StatCounter";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const counterDuration = 1200;

function subscribe(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const getSnapshot = () => window.matchMedia(reducedMotionQuery).matches;
const getServerSnapshot = () => false;

export default function HomeStats() {
  const [showAll, setShowAll] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const complete = showAll || reducedMotion;

  return (
    <>
      <section
        className="ds-stats"
        aria-label="Design system at a glance"
        data-count-after-reveal
        data-complete={complete}
      >
        {stats.map((stat, index) => (
          <div key={stat.label} className="ds-stat">
            <p className="ds-stat-value">
              <StatCounter
                value={stat.value}
                duration={counterDuration}
                delay={index * counterDuration}
                hideUntilStart
                complete={complete}
              />
            </p>
            <p className="ds-stat-label">
              <Link href={stat.href}>{stat.label}</Link>
            </p>
          </div>
        ))}
      </section>
      <button
        type="button"
        className="ds-stats-reveal"
        disabled={complete}
        onClick={() => setShowAll(true)}
      >
        Skip animation
      </button>
    </>
  );
}
