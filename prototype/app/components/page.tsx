import type { ReactNode } from "react";
import FaqDemo from "../FaqDemo";
import TestimonialCard from "../_components/TestimonialCard";
import Popup from "../_components/Popup";

// Functional UI glyphs from the Figma icon set, inline so they inherit
// currentColor and the 24x24 / stroke-2 geometry used across the system.
const UI_ICONS: { label: string; path: ReactNode }[] = [
  { label: "Chevron down", path: <polyline points="6 9 12 15 18 9" /> },
  {
    label: "Check circle",
    path: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="8.5 12.5 11 15 16 9.5" />
      </>
    ),
  },
  {
    label: "Clock",
    path: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15.5 14" />
      </>
    ),
  },
  {
    label: "Location pin",
    path: (
      <>
        <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 1 1 13 0C18.5 15.4 12 21 12 21z" />
        <circle cx="12" cy="10.5" r="2.5" />
      </>
    ),
  },
  { label: "Close", path: <path d="M6 6l12 12M18 6L6 18" /> },
  {
    label: "Mail",
    path: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3 7 12 13 21 7" />
      </>
    ),
  },
  { label: "Plus", path: <path d="M12 5v14M5 12h14" /> },
  { label: "Minus", path: <path d="M5 12h14" /> },
  {
    label: "Phone",
    path: (
      <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    ),
  },
  {
    label: "Play",
    path: <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />,
  },
  {
    label: "Instagram",
    path: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

export default function ComponentsPage() {
  return (
    <>
      <h1 className="ds-page-title">Components</h1>
      <p className="ds-intro">
        Interactive UI elements built on top of design tokens. Buttons, inputs,
        cards, tags, and more.
      </p>

      <section id="buttons" className="ds-section">
        <h2 className="ds-section-title">Buttons</h2>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-4)" }}
        >
          <button type="button" className="fe-btn-primary">
            Book Event &rarr;
          </button>
          <button type="button" className="fe-btn-secondary">
            Book Event &rarr;
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
        <h2 className="ds-section-title">Button states</h2>
        <p className="ds-section-intro">
          The four button types across Default, Hover, Focused, and Disabled per
          the style guide. Hover and focused are shown statically here; the gold
          keyboard ring fires on real <code className="ds-code">:focus-visible</code>.
          The Focused column is the pressed/selected fill, drawn without an
          outline.
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

          <span className="ds-state-grid__row-label">Icon</span>
          {["", "is-hover", "is-focus", "disabled"].map((state) => (
            <span className="ds-state-grid__cell" key={`i-${state}`}>
              <button
                type="button"
                className={`fe-icon-btn${state && state !== "disabled" ? ` ${state}` : ""}`}
                aria-label="Instagram"
                disabled={state === "disabled"}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </button>
            </span>
          ))}

          <span className="ds-state-grid__row-label">Play</span>
          {["", "is-hover", "is-focus", "disabled"].map((state) => (
            <span className="ds-state-grid__cell" key={`pl-${state}`}>
              <button
                type="button"
                className={`fe-play-btn${state && state !== "disabled" ? ` ${state}` : ""}`}
                aria-label="Play"
                disabled={state === "disabled"}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      </section>

      <section id="icon-buttons" className="ds-section">
        <h2 className="ds-section-title">Icon buttons &amp; Play button</h2>
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
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </button>
          <button
            type="button"
            className="fe-icon-btn fe-icon-btn--whatsapp"
            aria-label="WhatsApp"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
          <button
            type="button"
            className="fe-icon-btn--filled-brand"
            aria-label="Workshop category (demo)"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5S18.33 12 17.5 12z" />
            </svg>
          </button>
          <button type="button" className="fe-play-btn" aria-label="Play">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <button
            type="button"
            className="fe-play-btn fe-play-btn--lg"
            aria-label="Play (large)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </section>

      <section id="faq" className="ds-section">
        <h2 className="ds-section-title">FAQ / Accordion</h2>
        <FaqDemo />
      </section>

      <section id="category-tags" className="ds-section">
        <h2 className="ds-section-title">Category tag variants</h2>
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
          <span className="fe-tag-pill fe-tag-pill--movement">Movement</span>
          <span className="fe-tag-pill fe-tag-pill--arts">Arts and Crafts</span>
          <span className="fe-tag-pill fe-tag-pill--expression">Expression</span>
          <span className="fe-tag-pill fe-tag-pill--music">Music</span>
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
          <span className="fe-tag-pill fe-tag-pill--music active">Music</span>
        </div>
      </section>

      <section id="nav-states" className="ds-section">
        <h2 className="ds-section-title">Nav link states</h2>
        <p className="ds-section-intro">
          Header and footer nav links: Default, Hover (orange underline grows
          in), Focused (gold keyboard ring), and Disabled. The underline is a
          decorative accent, not the link colour.
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
          <span className="ds-state-matrix__label">Focused</span>
          <a href="#nav-states" className="fe-nav-link is-focus">
            Workshops
          </a>
          <span className="ds-state-matrix__label">Disabled</span>
          <span className="fe-nav-link" aria-disabled="true">
            Workshops
          </span>
        </div>
      </section>

      <section id="cards" className="ds-section">
        <h2 className="ds-section-title">Cards</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "var(--spacing-6)",
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

      <section id="icons" className="ds-section">
        <h2 className="ds-section-title">Icons</h2>
        <div className="ds-icon-demo">
          <div className="ds-icon-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/favicon.svg"
              alt=""
              width={32}
              height={32}
              aria-hidden="true"
            />
            <span>Favicon (site)</span>
          </div>
          <div className="ds-icon-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/arrow-right.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
            <span>Arrow right</span>
          </div>
          <div className="ds-icon-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/external-link.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
            <span>External link</span>
          </div>
          {UI_ICONS.map(({ label, path }) => (
            <div className="ds-icon-item" key={label}>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                {path}
              </svg>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="illustrations" className="ds-section">
        <h2 className="ds-section-title">Line illustrations</h2>
        <p className="ds-section-intro">
          Decorative hand-drawn doodles in brand orange: warmth, never
          wayfinding. Use sparingly behind blobs and beside headings; the
          sketched underline sits under a headline (see the home hero). Exact
          artwork is maintained in Figma.
        </p>
        <div className="ds-icon-demo">
          {[
            ["flower.png", "Flower"],
            ["cloud.svg", "Cloud"],
            ["smiley.png", "Smiley"],
            ["swirl.png", "Swirl"],
            ["strategy.png", "Strategy"],
            ["chess.svg", "Chess"],
            ["vase.svg", "Vase"],
          ].map(([file, label]) => (
            <div className="ds-icon-item" key={file}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/illustrations/${file}`}
                alt=""
                width={64}
                height={64}
                aria-hidden="true"
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "var(--spacing-6)" }}>
          <div className="fe-label">Headline underline</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/headline-underline.svg"
            alt=""
            aria-hidden="true"
            style={{ display: "block", width: "220px", height: "auto" }}
          />
        </div>
      </section>

      <section id="forms" className="ds-section">
        <h2 className="ds-section-title">Form elements &amp; input states</h2>
        <p className="ds-section-intro">
          Five input states: Default, Hover, Active (focus), Disabled, and Error.
          Hover and active are shown statically; the gold keyboard ring fires on
          real <code className="ds-code">:focus-visible</code>.
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

      <section id="chips" className="ds-section">
        <h2 className="ds-section-title">Chips / tags</h2>
        <div className="ds-chip-grid">
          <span className="ds-chip">Tag one</span>
          <span className="ds-chip">Tag two</span>
          <span className="ds-chip">Design tokens</span>
          <span className="ds-chip">Light only</span>
        </div>
      </section>

      <section id="blockquote" className="ds-section">
        <h2 className="ds-section-title">Blockquote</h2>
        <blockquote className="ds-quote">
          Typography and spacing come from the design system.
        </blockquote>
      </section>

      <section id="testimonials" className="ds-section">
        <h2 className="ds-section-title">Testimonials</h2>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          Centered testimonial cards with large orange quote marks and bold
          attribution. Matches the live-site style.
        </p>
        <TestimonialCard />
      </section>

      <section id="popup" className="ds-section">
        <h2 className="ds-section-title">Popup</h2>
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
