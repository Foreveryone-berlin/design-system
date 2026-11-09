"use client";

import { useState } from "react";
import styles from "./PricingPattern.module.css";

export default function PricingPattern() {
  const [selected, setSelected] = useState<string>();
  return (
    <section id="inclusive-pricing" className={`ds-section ${styles.pattern}`} data-pattern-preview>
      <h3 className="ds-subsection-title">Inclusive pricing tiers</h3>
      <p className={styles.description}>Use when people choose a contribution level for the same experience. Explain what differs, keep the inclusions equal, and avoid a premium-feature comparison.</p>
      <div className={styles.grid}>
        {[
          { name: "Social", price: "25", text: "For a tighter budget." },
          { name: "Regular", price: "40", text: "The standard course price." },
          { name: "Supporter", price: "55", text: "Contribute to more accessible places." },
        ].map((tier) => (
          <article key={tier.name} className={`${styles.card} ${tier.name === "Regular" ? styles.soft : ""} ${selected === tier.name ? styles.selected : ""}`}>
            <h4>{tier.name}</h4>
            <p className={styles.price}>{tier.price}<span> €</span></p>
            <p>{tier.text}</p>
            <p className={styles.small}>The same course and materials.</p>
            <button type="button" className="fe-btn-secondary" aria-pressed={selected === tier.name}
              onClick={() => setSelected(tier.name)}>
              {selected === tier.name ? "Selected" : `Choose ${tier.name.toLowerCase()}`}
            </button>
          </article>
        ))}
      </div>
      <p className={styles.feedback} role="status">
        {selected ? `${selected} ticket selected.` : "Illustrative prices only, not live ticket prices. The experience stays the same across tiers."}
      </p>
    </section>
  );
}
