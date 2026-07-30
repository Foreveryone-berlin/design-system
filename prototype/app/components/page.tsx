import dynamic from "next/dynamic";
import FeIcon from "../_components/FeIcon";
import TestimonialCard from "../_components/TestimonialCard";

const FaqDemo = dynamic(() => import("../FaqDemo"));
const Popup = dynamic(() => import("../_components/Popup"));

export default function ComponentsPage() {
  return (
    <>
      <h1 className="ds-page-title">Components</h1>
      <p className="ds-intro">
        Interactive UI elements built on top of design tokens. Buttons, inputs,
        cards, tags, and more.
      </p>

      <h2 className="ds-section-title ds-group-title">Actions</h2>

      <section id="buttons" className="ds-section">
        <h3 className="ds-subsection-title">Buttons</h3>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-4)" }}
        >
          <button type="button" className="fe-btn-primary">
            Book Event
          </button>
          <button type="button" className="fe-btn-secondary">
            Book Event
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--spacing-4)",
            marginTop: "var(--spacing-4)",
          }}
        >
          <button type="button" className="ds-btn ds-btn--primary">
            Primary
          </button>
          <button type="button" className="ds-btn ds-btn--orange">
            Orange
          </button>
          <button type="button" className="ds-btn ds-btn--secondary">
            Secondary
          </button>
          <button type="button" className="ds-btn ds-btn--outline">
            Outline
          </button>
        </div>
      </section>

      <section id="button-states" className="ds-section">
        <h3 className="ds-subsection-title">Button states</h3>
        <p className="ds-section-intro">
          The four pill button variants across Default, Hover, Focused, and
          Disabled per the style guide. Hover and focused are shown statically
          here; on real keyboard focus the button shows the same focused fill
          (no outline). The Focused column is the pressed/selected fill.
        </p>
        <div className="ds-state-grid">
          <span aria-hidden="true" />
          <span className="ds-state-grid__col">Default</span>
          <span className="ds-state-grid__col">Hover</span>
          <span className="ds-state-grid__col">Focused</span>
          <span className="ds-state-grid__col">Disabled</span>

          <span className="ds-state-grid__row-label">Primary</span>
          {["", "is-hover", "is-focus", "disabled"].map((state) => (
            <span className="ds-state-grid__cell" key={`p-${state}`}>
              <button
                type="button"
                className={`fe-btn-primary${state && state !== "disabled" ? ` ${state}` : ""}`}
                disabled={state === "disabled"}
              >
                Book Event
              </button>
            </span>
          ))}

          <span className="ds-state-grid__row-label">Secondary</span>
          {["", "is-hover", "is-focus", "disabled"].map((state) => (
            <span className="ds-state-grid__cell" key={`s-${state}`}>
              <button
                type="button"
                className={`fe-btn-secondary${state && state !== "disabled" ? ` ${state}` : ""}`}
                disabled={state === "disabled"}
              >
                Book Event
              </button>
            </span>
          ))}

          <span className="ds-state-grid__row-label">Orange</span>
          {["", "is-hover", "is-focus", "disabled"].map((state) => (
            <span className="ds-state-grid__cell" key={`o-${state}`}>
              <button
                type="button"
                className={`ds-btn ds-btn--orange${state && state !== "disabled" ? ` ${state}` : ""}`}
                disabled={state === "disabled"}
              >
                Orange
              </button>
            </span>
          ))}

          <span className="ds-state-grid__row-label">Outline</span>
          {["", "is-hover", "is-focus", "disabled"].map((state) => (
            <span className="ds-state-grid__cell" key={`ol-${state}`}>
              <button
                type="button"
                className={`ds-btn ds-btn--outline${state && state !== "disabled" ? ` ${state}` : ""}`}
                disabled={state === "disabled"}
              >
                Outline
              </button>
            </span>
          ))}
        </div>
      </section>

      <section id="icon-buttons" className="ds-section">
        <h3 className="ds-subsection-title">Icon buttons &amp; Play button</h3>
        <p className="ds-intro" style={{ marginTop: 0 }}>
          Neutral circular controls use{" "}
          <code className="ds-code">.fe-icon-btn</code>. Category-style filled
          markers use{" "}
          <code className="ds-code">.fe-icon-btn--filled-brand</code> (orange
          ground, white glyph via <code className="ds-code">currentColor</code>
          ). The WhatsApp slot adds{" "}
          <code className="ds-code">.fe-icon-btn--whatsapp</code>; both social
          buttons darken on hover and press. The play button ships in two sizes
          (<code className="ds-code">.fe-play-btn</code> and{" "}
          <code className="ds-code">--lg</code>) and now has a real hover and
          pressed state. See{" "}
          <code className="ds-code">docs/visual-styles.md</code>.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "var(--spacing-4)",
          }}
        >
          <button type="button" className="fe-icon-btn" aria-label="Instagram">
            <FeIcon set="social" name="instagram" size="md" />
          </button>
          <button
            type="button"
            className="fe-icon-btn fe-icon-btn--whatsapp"
            aria-label="WhatsApp"
          >
            <FeIcon set="social" name="whatsapp" size="md" />
          </button>
          <button
            type="button"
            className="fe-icon-btn--filled-brand"
            aria-label="Workshop category (demo)"
          >
            <FeIcon set="category" name="arts-crafts" size="md" />
          </button>
          <button type="button" className="fe-play-btn" aria-label="Play">
            <FeIcon set="ui" name="play" size="md" />
          </button>
          <button
            type="button"
            className="fe-play-btn fe-play-btn--lg"
            aria-label="Play (large)"
          >
            <FeIcon set="ui" name="play" size="lg" />
          </button>
        </div>
      </section>

      <section id="icon-button-states" className="ds-section">
        <h3 className="ds-subsection-title">Icon button states</h3>
        <p className="ds-section-intro">
          The neutral <code className="ds-code">.fe-icon-btn</code> across
          Default, Hover, Focused, and Disabled per the style guide. Hover and
          focused are shown statically here; on real keyboard focus the button
          shows the same focused fill (no gold ring).
        </p>
        <div className="ds-state-matrix">
          <span className="ds-state-matrix__label">Default</span>
          <button type="button" className="fe-icon-btn" aria-label="Instagram">
            <FeIcon set="social" name="instagram" size="md" />
          </button>
          <span className="ds-state-matrix__label">Hover</span>
          <button
            type="button"
            className="fe-icon-btn is-hover"
            aria-label="Instagram (hover)"
          >
            <FeIcon set="social" name="instagram" size="md" />
          </button>
          <span className="ds-state-matrix__label">Focused</span>
          <button
            type="button"
            className="fe-icon-btn is-focus"
            aria-label="Instagram (focused)"
          >
            <FeIcon set="social" name="instagram" size="md" />
          </button>
          <span className="ds-state-matrix__label">Disabled</span>
          <button
            type="button"
            className="fe-icon-btn"
            aria-label="Instagram (disabled)"
            disabled
          >
            <FeIcon set="social" name="instagram" size="md" />
          </button>
        </div>
      </section>

      <h2 className="ds-section-title ds-group-title">Forms &amp; inputs</h2>

      <section id="forms" className="ds-section">
        <h3 className="ds-subsection-title">Form elements &amp; input states</h3>
        <p className="ds-section-intro">
          Five input states: Default, Hover, Active (focus), Disabled, and Error.
          Hover and active are shown statically; on real focus the input keeps
          its own border and shadow treatment rather than the gold keyboard ring.
        </p>
        <div className="ds-state-matrix" style={{ maxWidth: "28rem" }}>
          <span className="ds-state-matrix__label">Default</span>
          <input
            type="text"
            className="fe-input"
            placeholder="Placeholder text"
            aria-label="Default input"
          />
          <span className="ds-state-matrix__label">Hover</span>
          <input
            type="text"
            className="fe-input is-hover"
            placeholder="Placeholder text"
            aria-label="Hover input"
          />
          <span className="ds-state-matrix__label">Active</span>
          <input
            type="text"
            className="fe-input is-focus"
            placeholder="Placeholder text"
            aria-label="Active input"
          />
          <span className="ds-state-matrix__label">Disabled</span>
          <input
            type="text"
            className="fe-input"
            placeholder="Placeholder text"
            aria-label="Disabled input"
            disabled
          />
          <span className="ds-state-matrix__label">Error</span>
          <div className="fe-input-group">
            <input
              id="ds-input-error"
              type="text"
              className="fe-input fe-input--error"
              placeholder="Placeholder text"
              aria-invalid="true"
              aria-label="Required field"
              aria-describedby="ds-input-error-msg"
            />
            <span id="ds-input-error-msg" className="fe-input-error-msg">
              This field is required
            </span>
          </div>
        </div>
      </section>

      <section id="dropdown" className="ds-section">
        <h3 className="ds-subsection-title">Dropdown</h3>
        <p className="ds-section-intro">
          Menu surface with item states: Default, Hover, Selected, and Disabled.
          Hover and selected are shown statically here.
        </p>
        <div className="fe-dropdown" role="menu" aria-label="Dropdown states demo">
          <a href="#dropdown" className="fe-dropdown-item" role="menuitem">
            Default item
          </a>
          <a href="#dropdown" className="fe-dropdown-item is-hover" role="menuitem">
            Hover item
          </a>
          <a
            href="#dropdown"
            className="fe-dropdown-item is-active"
            role="menuitem"
            aria-current="true"
          >
            Selected item
          </a>
          <span className="fe-dropdown-item" role="menuitem" aria-disabled="true">
            Disabled item
          </span>
        </div>
      </section>

      <h2 className="ds-section-title ds-group-title">Tags &amp; labels</h2>

      <section id="category-tags" className="ds-section">
        <h3 className="ds-subsection-title">Category tag variants</h3>
        <p className="ds-section-intro">
          Five workshop categories. Grey at rest; each takes its category colour
          on hover and when active (selected).
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--spacing-3)",
            marginBlockEnd: "var(--spacing-4)",
          }}
        >
          <span className="fe-tag-pill">Default</span>
          <span className="fe-tag-pill fe-tag-pill--balance">
            Balance and Wellness
          </span>
          <span className="fe-tag-pill fe-tag-pill--movement">
            Movement
          </span>
          <span className="fe-tag-pill fe-tag-pill--arts">
            Arts and Crafts
          </span>
          <span className="fe-tag-pill fe-tag-pill--expression">
            Expression
          </span>
          <span className="fe-tag-pill fe-tag-pill--music">
            Music
          </span>
        </div>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-3)" }}
        >
          <span className="fe-tag-pill fe-tag-pill--balance active">
            Balance and Wellness
          </span>
          <span className="fe-tag-pill fe-tag-pill--movement active">
            Movement
          </span>
          <span className="fe-tag-pill fe-tag-pill--arts active">
            Arts and Crafts
          </span>
          <span className="fe-tag-pill fe-tag-pill--expression active">
            Expression
          </span>
          <span className="fe-tag-pill fe-tag-pill--music active">
            Music
          </span>
        </div>
        <p
          className="ds-section-intro"
          style={{ marginBlockStart: "var(--spacing-5)" }}
        >
          Focused: keyboard focus reuses each category&rsquo;s coloured fill
          (shown statically here); on a real Tab the grey pill also carries the
          gold <code className="ds-code">:focus-visible</code> ring.
        </p>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-3)" }}
        >
          <span className="fe-tag-pill fe-tag-pill--balance is-focus">
            Balance and Wellness
          </span>
          <span className="fe-tag-pill fe-tag-pill--movement is-focus">
            Movement
          </span>
          <span className="fe-tag-pill fe-tag-pill--arts is-focus">
            Arts and Crafts
          </span>
          <span className="fe-tag-pill fe-tag-pill--expression is-focus">
            Expression
          </span>
          <span className="fe-tag-pill fe-tag-pill--music is-focus">
            Music
          </span>
        </div>
      </section>

      <section id="chips" className="ds-section">
        <h3 className="ds-subsection-title">Chips / tags</h3>
        <div className="ds-chip-grid">
          <span className="ds-chip">Tag one</span>
          <span className="ds-chip">Tag two</span>
          <span className="ds-chip">Design tokens</span>
          <span className="ds-chip">Light only</span>
        </div>
      </section>

      <section id="badges" className="ds-section">
        <h3 className="ds-subsection-title">Badges &amp; labels</h3>
        <p className="ds-section-intro">
          The &ldquo;Joy&rdquo; brand badge sits on an orange ground with a
          high-contrast Charcoal label (orange fills never carry white text).
          Label cards group a key with its value.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "var(--spacing-3)",
            marginBlockEnd: "var(--spacing-6)",
          }}
        >
          <span className="fe-badge fe-badge--joy">Joy</span>
          <span className="fe-badge fe-badge--blue">New</span>
          <span className="fe-badge">Default</span>
        </div>
        <div className="fe-label-cards">
          <div className="fe-label-card">
            <span className="fe-label-card__label">Category</span>
            <span className="fe-label-card__value">Arts &amp; Crafts</span>
          </div>
          <div className="fe-label-card">
            <span className="fe-label-card__label">Duration</span>
            <span className="fe-label-card__value">3 hours</span>
          </div>
          <div className="fe-label-card">
            <span className="fe-label-card__label">Level</span>
            <span className="fe-label-card__value">All levels</span>
          </div>
          <div className="fe-label-card">
            <span className="fe-label-card__label">Price</span>
            <span className="fe-label-card__value">From &euro;10</span>
          </div>
        </div>
      </section>

      <h2 className="ds-section-title ds-group-title">Navigation</h2>

      <section id="nav-states" className="ds-section">
        <h3 className="ds-subsection-title">Nav link states</h3>
        <p className="ds-section-intro">
          Header and footer nav links: Default, Hover (orange underline grows
          in), and Disabled. The underline is a decorative accent, not the link
          colour. Focus is keyboard-only &mdash; Tab to the link below to see the
          gold <code className="ds-code">:focus-visible</code> ring.
        </p>
        <div className="ds-state-matrix">
          <span className="ds-state-matrix__label">Default</span>
          <a href="#nav-states" className="fe-nav-link">
            Workshops
          </a>
          <span className="ds-state-matrix__label">Hover</span>
          <a href="#nav-states" className="fe-nav-link is-hover">
            Workshops
          </a>
          <span className="ds-state-matrix__label">Focus (keyboard)</span>
          <a href="#nav-states" className="fe-nav-link">
            Workshops
          </a>
          <span className="ds-state-matrix__label">Disabled</span>
          <span className="fe-nav-link" aria-disabled="true">
            Workshops
          </span>
        </div>
      </section>

      <h2 className="ds-section-title ds-group-title">Content &amp; media</h2>

      <section id="cards" className="ds-section">
        <h3 className="ds-subsection-title">Cards</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(16.25rem, 1fr))",
            gap: "var(--spacing-6)",
            padding: "var(--spacing-4)",
            margin: "calc(-1 * var(--spacing-4))",
          }}
        >
          <div className="ds-card">
            <h3 className="ds-card-title">Card title</h3>
            <p className="ds-card-body">
              Card body text using tokens. Hover for shadow change.
            </p>
          </div>
          <div className="ds-card">
            <h3 className="ds-card-title">Another card</h3>
            <p className="ds-card-body">
              Radius and shadow from design tokens. Consistent spacing.
            </p>
          </div>
          <div className="ds-card">
            <h3 className="ds-card-title">Third card</h3>
            <p className="ds-card-body">
              Transitions use --transition-base for hover.
            </p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="ds-section">
        <h3 className="ds-subsection-title">Testimonials</h3>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          Centered testimonial cards with large orange quote marks and bold
          attribution. Matches the live-site style.
        </p>
        <TestimonialCard />
      </section>

      <section id="faq" className="ds-section">
        <h3 className="ds-subsection-title">FAQ / Accordion</h3>
        <FaqDemo />
      </section>

      <h2 className="ds-section-title ds-group-title">Overlays</h2>

      <section id="popup" className="ds-section">
        <h3 className="ds-subsection-title">Popup</h3>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          Modal dialog built on the native <code>&lt;dialog&gt;</code> element.
          Simplified contact form with blurred backdrop overlay. Press Escape or
          click outside to close.
        </p>
        <Popup />
      </section>
    </>
  );
}
