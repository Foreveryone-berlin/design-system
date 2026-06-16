import type { Metadata } from "next";
import MotionSpecimens from "../_components/MotionSpecimens";
import CodeBlock from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Motion",
  description:
    "Motion principles, duration and easing tokens, and how movement is applied across the ForEveryone design system.",
};

const tokenCode = `/* tokens/motion.json → CSS custom properties */
--transition-fast: 150ms ease;   /* snap: button hover, focus ring, icon swaps */
--transition-base: 250ms ease;   /* default UI: accordions, dropdowns, cards   */
--transition-slow: 400ms ease;   /* page-level fades, large surface motion     */

/* Always pair motion with the reduced-motion guard. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`;

const usageCode = `/* Transition only the properties that change — never \`all\`. */
.fe-card {
  transition:
    box-shadow var(--transition-base),
    transform var(--transition-base);
}
.fe-btn-primary {
  transition:
    background-color var(--transition-base),
    transform var(--transition-fast);
}`;

const durations = [
  {
    token: "--transition-fast",
    value: "150ms",
    use: "Snap interactions",
    examples: "Button hover, focus ring, icon-button press, tag colour swap",
  },
  {
    token: "--transition-base",
    value: "250ms",
    use: "Default UI",
    examples: "Accordion expand, dropdown open, card hover-lift, nav underline",
  },
  {
    token: "--transition-slow",
    value: "400ms",
    use: "Large surfaces",
    examples: "Mobile-nav sheet, page-level fades, hero media",
  },
];

const principles = [
  {
    title: "Motion is calm, not loud",
    body: "Movement reassures and guides; it never performs. Prefer short, eased fades and small position shifts over bouncing, spinning, or attention-grabbing animation.",
  },
  {
    title: "Move only what changed",
    body: "Animate the specific properties that change (opacity, transform, colour) — never the `all` keyword. Transform and opacity are cheapest; avoid animating layout properties like width or top.",
  },
  {
    title: "One easing, three speeds",
    body: "The system uses a single `ease` curve at three durations. Faster for direct feedback, slower for larger surfaces, so the speed reads as proportional to the size of the thing moving.",
  },
  {
    title: "Respect reduced motion",
    body: "Every animated surface sits under a `prefers-reduced-motion: reduce` guard that collapses durations to near-zero. Motion is an enhancement, never load-bearing for meaning.",
  },
];

export default function MotionPage() {
  return (
    <>
      <h1 className="ds-page-title">Motion</h1>
      <p className="ds-intro">
        How the system moves. Motion in ForEveryone is calm and purposeful: it
        confirms an action, reveals a relationship, or eases a transition —
        always quietly. Durations and easing come from the{" "}
        <code className="ds-code">motion</code> tokens; every animated surface
        respects reduced-motion.
      </p>

      <section id="principles" className="ds-section">
        <h2 className="ds-section-title">Principles</h2>
        <p className="ds-section-intro">
          Four rules keep movement consistent and accessible across the system.
        </p>
        <div className="ds-motion-principles">
          {principles.map(({ title, body }) => (
            <div key={title} className="ds-motion-principle">
              <h3 className="ds-motion-principle__title">{title}</h3>
              <p className="ds-motion-principle__body">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="durations" className="ds-section">
        <h2 className="ds-section-title">Duration &amp; easing tokens</h2>
        <p className="ds-section-intro">
          Three durations on one shared <code className="ds-code">ease</code>{" "}
          curve. Pick the speed that matches the size of the moving surface.
        </p>
        <div className="ds-motion-table" role="table" aria-label="Motion tokens">
          <div className="ds-motion-table__head" role="row">
            <span role="columnheader">Token</span>
            <span role="columnheader">Duration</span>
            <span role="columnheader">Use for</span>
            <span role="columnheader">Examples</span>
          </div>
          {durations.map(({ token, value, use, examples }) => (
            <div className="ds-motion-table__row" role="row" key={token}>
              <span role="cell">
                <code className="ds-code">{token}</code>
              </span>
              <span role="cell">{value}</span>
              <span role="cell">{use}</span>
              <span role="cell">{examples}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="specimens" className="ds-section">
        <h2 className="ds-section-title">Live specimens</h2>
        <p className="ds-section-intro">
          Each demo runs at its real token duration. Hover the cards, or press{" "}
          <strong>Replay</strong> to play the timed examples. With reduced motion
          enabled in your OS, every transition collapses to near-zero.
        </p>
        <MotionSpecimens />
      </section>

      <section id="tokens" className="ds-section">
        <h2 className="ds-section-title">Tokens in code</h2>
        <CodeBlock code={tokenCode} />
      </section>

      <section id="usage" className="ds-section">
        <h2 className="ds-section-title">Usage</h2>
        <p className="ds-section-intro">
          Reference the duration tokens directly and list the properties you
          animate. Keep hover feedback on <code className="ds-code">fast</code>,
          structural reveals on <code className="ds-code">base</code>.
        </p>
        <CodeBlock code={usageCode} />
      </section>
    </>
  );
}
