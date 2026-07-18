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
          afterthought. We also treat the{" "}
          <a
            href="https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en"
            target="_blank"
            rel="noopener noreferrer"
          >
            European Accessibility Act
          </a>{" "}
          as a baseline obligation, not a ceiling. Every token, component, and
          pattern in this system is designed to support an inclusive experience
          by default.
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
        <p className="fe-body" style={{ marginBlockStart: "var(--spacing-4)" }}>
          Verified colour pairs (WebAIM Contrast Checker):
        </p>
        <div className="ds-motion-table" role="table" aria-label="Contrast results">
          <div className="ds-motion-table__head" role="row">
            <span role="columnheader">Pair</span>
            <span role="columnheader">Ratio</span>
            <span role="columnheader">Result</span>
          </div>
          {[
            ["Charcoal text on Warm White / light tints", "12.5:1+", "AA + AAA"],
            ["White text on Brand Blue (alerts)", "8.71:1", "AA + AAA"],
            ["Joy badge: Charcoal on Orange", "6.42:1", "AA"],
            ["Keyboard focus gold on white (non-text)", "3.19:1", "Passes 1.4.11 (3:1)"],
          ].map(([pair, ratio, result]) => (
            <div className="ds-motion-table__row" role="row" key={pair}>
              <span role="cell">{pair}</span>
              <span role="cell">{ratio}</span>
              <span role="cell">{result}</span>
            </div>
          ))}
        </div>
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
        <h2 className="ds-section-title">Alt text</h2>
        <p className="fe-body">
          Alt text is a short written description that screen readers read aloud
          for people who are blind or have low vision. It is a small but meaningful
          way we make sure ForEveryone really means everyone, and it improves
          search visibility too (Brand Book v1.0 p.29, 37).
        </p>
        <div className="ds-dodont">
          <div className="ds-dodont__do">
            <p className="ds-dodont__label">Do</p>
            <ul>
              <li>
                Describe what is <em>happening</em>, not just what is in the frame
                &mdash; mention activity and setting.
              </li>
              <li>Keep it to one sentence.</li>
              <li>Leave alt text empty for purely decorative graphics.</li>
            </ul>
          </div>
          <div className="ds-dodont__dont">
            <p className="ds-dodont__label">Don&rsquo;t</p>
            <ul>
              <li>Start with &ldquo;image of&rdquo; or &ldquo;photo of&rdquo;.</li>
              <li>List only objects with no context.</li>
              <li>Skip alt text on meaningful photos.</li>
            </ul>
          </div>
        </div>
        <p className="fe-callout">
          <strong>Example:</strong> &ldquo;A group of people laughing while painting
          at No. 52 Cafe&rdquo; says more than &ldquo;people in a room&rdquo;. On
          social platforms (Instagram, Facebook, LinkedIn) add alt text in the
          post&rsquo;s advanced settings; on the website the web team manages alt
          text in WordPress &mdash; send suggested alt text alongside each image.
        </p>
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
          This statement was last reviewed on <strong>18 July 2026</strong>. It
          evolves with the design system and the forthcoming brand book. Known
          gaps and partial conformance items are tracked in the{" "}
          <a href="https://github.com/Foreveryone-berlin/design-system/blob/develop/docs/a11y-conformance.md">
            accessibility conformance register
          </a>
          .
        </p>
      </section>
    </>
  );
}
