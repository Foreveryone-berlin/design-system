"use client";

import { useState } from "react";
import { CATEGORY_LABELS } from "./FeIcon";

const CATEGORIES = ["balance-wellness", "movement", "arts-crafts", "expression", "music"] as const;

const PILL_MODIFIER: Record<(typeof CATEGORIES)[number], string> = {
  "balance-wellness": "balance",
  movement: "movement",
  "arts-crafts": "arts",
  expression: "expression",
  music: "music",
};

export default function CategoryFilter() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>(CATEGORIES[0]);

  return (
    <div
      className="ds-icon-in-context-row"
      role="group"
      aria-label="Filter by category"
      style={{ flexWrap: "wrap", gap: "var(--spacing-2)" }}
    >
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`fe-tag-pill fe-tag-pill--${PILL_MODIFIER[cat]}${active === cat ? " active" : ""}`}
          aria-pressed={active === cat}
          onClick={() => setActive(cat)}
        >
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
}
