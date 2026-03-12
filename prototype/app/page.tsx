import {
  hero as heroCopy,
  mission as missionCopy,
  stats as statsCopy,
  designSystemIntro,
  futureSiteUrl,
} from "@/content/site-copy";
import packageJson from "@/package.json";

const colorSwatches = [
  { token: "primary-50", var: "var(--color-primary-50)" },
  { token: "primary-300", var: "var(--color-primary-300)" },
  { token: "primary-500", var: "var(--color-primary-500)" },
  { token: "primary-600", var: "var(--color-primary-600)" },
  { token: "primary-900", var: "var(--color-primary-900)" },
  { token: "secondary-blue-400", var: "var(--color-secondary-blue-400)" },
  { token: "secondary-blue-500", var: "var(--color-secondary-blue-500)" },
  {
    token: "secondary-lavender-400",
    var: "var(--color-secondary-lavender-400)",
  },
  {
    token: "secondary-lavender-500",
    var: "var(--color-secondary-lavender-500)",
  },
  { token: "secondary-green-500", var: "var(--color-secondary-green-500)" },
  { token: "neutral-50", var: "var(--color-neutral-50)" },
  { token: "neutral-200", var: "var(--color-neutral-200)" },
  { token: "neutral-500", var: "var(--color-neutral-500)" },
  { token: "neutral-900", var: "var(--color-neutral-900)" },
  { token: "status-error", var: "var(--color-status-error)" },
  { token: "status-success", var: "var(--color-status-success)" },
  { token: "status-warning", var: "var(--color-status-warning)" },
];

const spacingScale = [
  { name: "1", var: "var(--spacing-1)" },
  { name: "2", var: "var(--spacing-2)" },
  { name: "4", var: "var(--spacing-4)" },
  { name: "6", var: "var(--spacing-6)" },
  { name: "8", var: "var(--spacing-8)" },
  { name: "12", var: "var(--spacing-12)" },
];

const radiusScale = [
  { token: "sm", var: "var(--radius-sm)" },
  { token: "md", var: "var(--radius-md)" },
  { token: "lg", var: "var(--radius-lg)" },
  { token: "xl", var: "var(--radius-xl)" },
  { token: "card", var: "var(--radius-card)" },
  { token: "pill", var: "var(--radius-pill)" },
];

const shadowTokens = [
  { token: "sm", var: "var(--shadow-sm)" },
  { token: "md", var: "var(--shadow-md)" },
  { token: "lg", var: "var(--shadow-lg)" },
  { token: "card", var: "var(--shadow-card)" },
];

export default function Home() {
  const version = packageJson.version;

  return (
    <main className="ds-page">
      {/* Hero with copy + image */}
      <section className="ds-hero-with-image">
        <div>
          <h1 className="ds-hero-title">
            {heroCopy.headline.split(" ")[0]}
            <br />
            <span className="ds-hero-accent">
              {heroCopy.headline.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <span className="ds-hero-version">v{version}</span>
          <p className="ds-intro">{heroCopy.tagline}</p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--spacing-4)",
              marginTop: "var(--spacing-4)",
            }}
          >
            <a href="#tokens" className="ds-btn ds-btn--primary">
              {heroCopy.ctaPrimary}
            </a>
            <a href="#components" className="ds-btn ds-btn--secondary">
              {heroCopy.ctaSecondary}
            </a>
          </div>
        </div>
        <div className="ds-hero-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero.png"
            alt=""
            width={335}
            height={231}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </section>

      {/* Intro: mission + design system */}
      <p className="ds-intro">
        {designSystemIntro} In the future, it will live at{" "}
        <a
          href={futureSiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--color-secondary-blue-500)" }}
        >
          {futureSiteUrl}
        </a>
        .
      </p>
      <section className="ds-section" aria-labelledby="mission-heading">
        <h2 id="mission-heading" className="ds-section-title">
          {missionCopy.title}
        </h2>
        <p className="fe-body">{missionCopy.bodyLine1}</p>
        <p className="fe-body">{missionCopy.bodyLine2}</p>
      </section>

      {/* Stats strip */}
      <section className="ds-stats" aria-label="Design system at a glance">
        {statsCopy.map((stat) => (
          <div key={stat.label} className="ds-stat">
            <p className="ds-stat-value">{stat.value}</p>
            <p className="ds-stat-label">{stat.label}</p>
          </div>
        ))}
      </section>

      <section id="tokens" className="ds-section">
        <h2 className="ds-section-title">Colors</h2>
        <div className="ds-swatch-grid">
          {colorSwatches.map(({ token, var: cssVar }) => (
            <div key={token} className="ds-swatch">
              <div
                className="ds-swatch-color"
                style={{ backgroundColor: cssVar }}
              />
              <div className="ds-swatch-label">{token}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Typography</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-6)",
          }}
        >
          <div>
            <div className="fe-label">H1</div>
            <h2 className="fe-h1">Heading 1</h2>
          </div>
          <div>
            <div className="fe-label">H2</div>
            <h3 className="fe-h2">Heading 2</h3>
          </div>
          <div>
            <div className="fe-label">H3</div>
            <h4 className="fe-h3">Heading 3</h4>
          </div>
          <div>
            <div className="fe-label">Body</div>
            <p className="fe-body">
              Body text uses design system tokens. Filson Pro at base size with
              normal line height.
            </p>
          </div>
          <div>
            <span className="fe-tag">Tag</span>
          </div>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Spacing</h2>
        <div className="ds-spacing-demo">
          {spacingScale.map(({ name, var: cssVar }) => (
            <div
              key={name}
              className="ds-spacing-box"
              style={{ width: cssVar, height: cssVar }}
            >
              {name}
            </div>
          ))}
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Radius &amp; shadows</h2>
        <div className="ds-radius-demo">
          {radiusScale.map(({ token, var: cssVar }) => (
            <div
              key={token}
              className="ds-radius-card"
              style={{ borderRadius: cssVar }}
            >
              {token}
            </div>
          ))}
        </div>
        <div
          className="ds-radius-demo"
          style={{ marginTop: "var(--spacing-4)" }}
        >
          <div className="ds-radius-circle-demo" title="circle">
            ●
          </div>
          <span className="fe-body" style={{ alignSelf: "center" }}>
            circle (icon/avatar)
          </span>
        </div>
        <p className="fe-body" style={{ marginTop: "var(--spacing-4)" }}>
          Shadows:
        </p>
        <div className="ds-shadow-demo">
          {shadowTokens.map(({ token, var: cssVar }) => (
            <div
              key={token}
              className="ds-shadow-box"
              style={{ boxShadow: cssVar }}
            >
              {token}
            </div>
          ))}
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Motion</h2>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          Transitions: <code>--transition-fast</code> (150ms),{" "}
          <code>--transition-base</code> (250ms), <code>--transition-slow</code>{" "}
          (400ms). Hover the card:
        </p>
        <div className="ds-motion-demo-card">Hover me</div>
      </section>

      <section id="components" className="ds-section">
        <h2 className="ds-section-title">Buttons</h2>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-4)" }}
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

      <section className="ds-section">
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

      <section className="ds-section">
        <h2 className="ds-section-title">Icons</h2>
        <div className="ds-icon-demo">
          <div className="ds-icon-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/favicon.svg" alt="" width={24} height={24} aria-hidden />
            <span>Favicon</span>
          </div>
          <div className="ds-icon-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/arrow-right.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden
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
              aria-hidden
            />
            <span>External link</span>
          </div>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Form elements</h2>
        <div
          style={{
            maxWidth: "20rem",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-4)",
          }}
        >
          <label className="ds-label" htmlFor="ds-input-demo">
            Label
          </label>
          <input
            id="ds-input-demo"
            type="text"
            className="ds-input"
            placeholder="Placeholder text"
            aria-label="Demo input"
          />
          <input
            type="email"
            className="ds-input"
            placeholder="Email"
            aria-label="Email"
          />
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Chips / tags</h2>
        <div className="ds-chip-grid">
          <span className="ds-chip">Tag one</span>
          <span className="ds-chip">Tag two</span>
          <span className="ds-chip">Design tokens</span>
          <span className="ds-chip">Light only</span>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Blockquote</h2>
        <blockquote className="ds-quote">
          Typography and spacing come from the design system.
        </blockquote>
      </section>

      {/* Wave section */}
      <section className="ds-wave-section" aria-hidden>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 80 Q300 20 600 80 T1200 80 V120 H0 Z" />
        </svg>
      </section>

      <footer className="ds-footer">
        <p className="ds-footer-version">Design System v{version}</p>
        <p style={{ margin: 0 }}>design.foreveryone.berlin</p>
      </footer>
    </main>
  );
}
