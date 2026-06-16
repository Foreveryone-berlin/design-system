export const metadata = {
  title: "Accessibility",
};

const REPO_URL = "https://github.com/Foreveryone-berlin/design-system";

export default function AccessibilityPage() {
  return (
    <>
      <h1 className="ds-page-title">Accessibility</h1>
      <p className="ds-intro">
        ForEveryone means everyone. This design system is built so the digital
        experience works for people using screen readers, keyboard navigation,
        and assistive technology, and for people with low vision or colour-vision
        differences. This statement explains what we do, how we test, and how to
        give feedback.
      </p>

      <section className="ds-section">
        <h2 className="ds-section-title">Our commitment</h2>
        <p className="fe-body">
          Accessibility is part of being &ldquo;for everyone&rdquo;, not an
          afterthought. We also treat the European Accessibility Act as a
          baseline obligation, not a ceiling. Every token, component, and pattern
          in this system is designed to support an inclusive experience by
          default.
        </p>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Conformance target</h2>
        <ul className="ds-rule-list">
          <li>
            We aim to meet <strong>WCAG 2.1 Level AA</strong> across the design
            system and the surfaces built from it.
          </li>
          <li>
            Text and interactive elements target a contrast ratio of at least{" "}
            <strong>4.5:1</strong> (3:1 for large text and UI boundaries).
          </li>
          <li>
            Where a part is only partially conformant, we record it and resolve
            it rather than leave it undocumented.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">What is built in</h2>
        <ul className="ds-rule-list">
          <li>
            A visible <strong>keyboard focus ring</strong> on every interactive
            element &mdash; a warm-gold outline shown only for keyboard
            navigation (<code>:focus-visible</code>) &mdash; and a{" "}
            <strong>skip link</strong> to main content.
          </li>
          <li>
            <strong>Semantic HTML and ARIA</strong>: landmarks, current-page
            state on navigation, accessible names on icon-only buttons, and a
            native dialog for the popup.
          </li>
          <li>
            Content hidden behind toggles (mobile navigation, collapsed FAQs) is
            removed from the tab order and the accessibility tree.
          </li>
          <li>
            Motion respects <strong>prefers-reduced-motion</strong>; animations
            are reduced or removed for users who ask for that.
          </li>
          <li>
            True values (such as statistics) are exposed to assistive technology
            even when displayed decoratively.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Colour &amp; contrast</h2>
        <ul className="ds-rule-list">
          <li>
            <strong>Charcoal text</strong> on light backgrounds is the primary,
            high-contrast pairing.
          </li>
          <li>
            <strong>Orange is decorative only</strong>: icons, blobs, accents,
            and borders. It is never a background behind text and never used as
            text on white, because those combinations fail contrast.
          </li>
          <li>
            <strong>Blue</strong> is reserved for announcements and alerts, always
            paired with white text.
          </li>
          <li>
            <strong>Lime green</strong> and <strong>soft lavender</strong> are the
            readable section tints, always with charcoal text.
          </li>
          <li>
            The <strong>keyboard focus ring</strong> is a warm gold in the brand
            reference&rsquo;s hue, deepened so it reaches{" "}
            <strong>3.19:1</strong> against white &mdash; clearing the{" "}
            <strong>3:1</strong> non-text-contrast target (WCAG 1.4.11) rather
            than relying on outline thickness alone.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">How we test</h2>
        <ul className="ds-rule-list">
          <li>
            <strong>Automated:</strong> an{" "}
            <a
              href="https://github.com/dequelabs/axe-core"
              target="_blank"
              rel="noopener noreferrer"
            >
              axe-core
            </a>{" "}
            scan runs over the prototype&rsquo;s key routes and fails the build on
            serious or critical WCAG 2.1 AA violations.
          </li>
          <li>
            <strong>Contrast:</strong> colour pairings are checked with the{" "}
            <a
              href="https://webaim.org/resources/contrastchecker/"
              target="_blank"
              rel="noopener noreferrer"
            >
              WebAIM contrast checker
            </a>
            .
          </li>
          <li>
            <strong>Manual:</strong> keyboard-only walkthroughs and screen-reader
            spot checks on core flows.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Feedback</h2>
        <p className="fe-body">
          If you hit an accessibility barrier, please tell us so we can fix it.
          Open an issue in the{" "}
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
            design system repository
          </a>{" "}
          describing the page, what you expected, and what happened. We treat
          accessibility reports as priority issues.
        </p>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Status</h2>
        <p className="fe-body">
          This statement was last reviewed on <strong>15 June 2026</strong>. It
          evolves with the design system and the forthcoming brand book.
        </p>
      </section>
    </>
  );
}
