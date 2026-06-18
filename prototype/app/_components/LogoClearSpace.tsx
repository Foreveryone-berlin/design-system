"use client";

import { useState } from "react";

/**
 * Interactive clear-space demo for the primary logo. Toggles a 1X safe-zone
 * overlay (X = cap-height of the "F" in the wordmark). Digital-only affordance
 * the static Brand Book cannot offer.
 */
export default function LogoClearSpace() {
  const [show, setShow] = useState(true);

  return (
    <div className="ds-logo-clearspace">
      <button
        type="button"
        className="ds-toggle-btn"
        aria-pressed={show}
        onClick={() => setShow((v) => !v)}
      >
        {show ? "Hide" : "Show"} clear-space overlay
      </button>
      <div
        className={`ds-logo-clearspace__stage${show ? " is-showing" : ""}`}
        data-x="X = cap-height of F"
      >
        <span className="ds-logo-clearspace__zone" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo/foreveryone-horizontal.png"
          alt="ForEveryone primary horizontal logo"
          width={300}
          height={55}
          className="ds-logo-clearspace__logo"
        />
      </div>
      <p className="ds-logo-clearspace__caption">
        Maintain <strong>1X</strong> of clear space on all four sides, where{" "}
        <strong>X = the cap-height of the &ldquo;F&rdquo;</strong> in the
        wordmark. No text, graphics, or page edges may enter this zone.
      </p>
    </div>
  );
}
