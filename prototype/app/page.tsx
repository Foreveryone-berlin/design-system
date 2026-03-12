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

export default function Home() {
  return (
    <main className="ds-page">
      <h1 className="fe-h1">
        ForEveryone <span className="fe-h1--accent">Design System</span>
      </h1>
      <p className="ds-intro">
        Prototype v0.2.0 — future design.foreveryone.berlin. This page showcases
        colors, typography, spacing, radius, shadows, and motion from the
        token-driven CSS.
      </p>

      <section className="ds-section">
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
              Body text uses Filson Pro at base size with normal line height.
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
        <p className="fe-body" style={{ marginTop: "var(--spacing-6)" }}>
          Shadows: <code>--shadow-sm</code>, <code>--shadow-md</code>,{" "}
          <code>--shadow-lg</code>, <code>--shadow-card</code>
        </p>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Motion</h2>
        <p className="fe-body">
          Transitions: <code>--transition-fast</code> (150ms),{" "}
          <code>--transition-base</code> (250ms), <code>--transition-slow</code>{" "}
          (400ms)
        </p>
      </section>
    </main>
  );
}
