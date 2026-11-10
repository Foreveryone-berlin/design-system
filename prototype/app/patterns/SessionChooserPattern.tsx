"use client";

import { useState } from "react";
import styles from "./SessionChooserPattern.module.css";

export default function SessionChooserPattern() {
  const [selected, setSelected] = useState<string>();
  return (
    <section id="session-chooser" className={`ds-section ${styles.pattern}`} data-pattern-preview>
      <h3 className="ds-subsection-title">Session chooser</h3>
      <p className={styles.description}>Use when one activity has separately bookable stages. Explain the difference and any prerequisite before presenting the two booking actions.</p>
      <div className={styles.surface}>
        <div className={styles.grid}>
          {[
            { title: "Hand building", tag: "Start here", text: "Shape a piece from clay. Explore pinch pots, coiling, and slab building." },
            { title: "Glazing", tag: "Return to your piece", text: "Add colour and finish to a fired piece. Choose this session after hand building." },
          ].map((session) => (
            <article className={`${styles.card} ${selected === session.title ? styles.selected : ""}`} key={session.title}>
              <p className={styles.eyebrow}>{session.tag}</p>
              <h4>{session.title}</h4>
              <p>{session.text}</p>
              <button type="button" className="fe-btn-secondary" aria-pressed={selected === session.title}
                onClick={() => setSelected(session.title)}>
                {selected === session.title ? "Selected" : `Choose ${session.title.toLowerCase()}`}
              </button>
            </article>
          ))}
        </div>
        <p role="status" className={styles.feedback}>
          {selected ? `${selected} selected. The booking flow would open with this session.` : "Choose a session to preview the selection state."}
        </p>
      </div>
    </section>
  );
}
