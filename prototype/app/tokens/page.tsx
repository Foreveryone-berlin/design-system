const steps = [
  "50", "100", "150", "200", "300", "400", "500", "600", "700", "800", "900",
];

const colorPaletteGroups = [
  { name: "Primary (Orange)", prefix: "primary", path: "primary" },
  { name: "Secondary Green", prefix: "secondary-green", path: "secondary-green" },
  { name: "Secondary Blue", prefix: "secondary-blue", path: "secondary-blue" },
  { name: "Secondary Lavender", prefix: "secondary-lavender", path: "secondary-lavender" },
  {
    name: "Neutral",
    prefix: "neutral",
    path: "neutral",
    steps: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  },
];

const colorSwatches = [
  { token: "primary-50", var: "var(--color-primary-50)" },
  { token: "primary-300", var: "var(--color-primary-300)" },
  { token: "primary-500", var: "var(--color-primary-500)" },
  { token: "primary-600", var: "var(--color-primary-600)" },
  { token: "primary-900", var: "var(--color-primary-900)" },
  { token: "secondary-blue-400", var: "var(--color-secondary-blue-400)" },
  { token: "secondary-blue-500", var: "var(--color-secondary-blue-500)" },
  { token: "secondary-lavender-400", var: "var(--color-secondary-lavender-400)" },
  { token: "secondary-lavender-500", var: "var(--color-secondary-lavender-500)" },
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
  { name: "14", var: "var(--spacing-14)" },
  { name: "16", var: "var(--spacing-16)" },
  { name: "18", var: "var(--spacing-18)" },
  { name: "24", var: "var(--spacing-24)" },
  { name: "32", var: "var(--spacing-32)" },
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

export default function TokensPage() {
  return (
    <>
      <h1 className="ds-page-title">Tokens</h1>
      <p className="ds-intro">
        Design tokens define the visual language — colors, typography, spacing,
        radius, shadows, and motion. All values are exposed as CSS custom
        properties.
      </p>

      <section id="colors" className="ds-section">
        <h2 className="ds-section-title">Colors</h2>
        <div className="ds-swatch-grid">
          {colorSwatches.map(({ token, var: cssVar }) => (
            <div key={token} className="ds-swatch">
              <div className="ds-swatch-color" style={{ backgroundColor: cssVar }} />
              <div className="ds-swatch-label">{token}</div>
            </div>
          ))}
        </div>
        <h3 className="ds-subsection-title">Full palette (50–900)</h3>
        {colorPaletteGroups.map((group) => (
          <div key={group.path} className="ds-palette-group">
            <h4 className="ds-palette-group-title">{group.name}</h4>
            <div className="ds-swatch-grid">
              {(group.steps ?? steps).map((step) => (
                <div key={step} className="ds-swatch">
                  <div
                    className="ds-swatch-color"
                    style={{ backgroundColor: `var(--color-${group.prefix}-${step})` }}
                  />
                  <div className="ds-swatch-label">{step}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section id="typography" className="ds-section">
        <h2 className="ds-section-title">Typography</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-6)" }}>
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
              Body text uses design system tokens. Filson Pro at base size with normal line height.
            </p>
          </div>
          <div>
            <span className="fe-tag">Tag</span>
          </div>
        </div>
      </section>

      <section id="spacing" className="ds-section">
        <h2 className="ds-section-title">Spacing</h2>
        <div className="ds-spacing-demo">
          {spacingScale.map(({ name, var: cssVar }) => (
            <div key={name} className="ds-spacing-box" style={{ width: cssVar, height: cssVar }}>
              {name}
            </div>
          ))}
        </div>
      </section>

      <section id="radius-shadows" className="ds-section">
        <h2 className="ds-section-title">Radius &amp; shadows</h2>
        <div className="ds-radius-demo">
          {radiusScale.map(({ token, var: cssVar }) => (
            <div key={token} className="ds-radius-card" style={{ borderRadius: cssVar }}>
              {token}
            </div>
          ))}
        </div>
        <div className="ds-radius-demo" style={{ marginTop: "var(--spacing-4)" }}>
          <div className="ds-radius-circle-demo" title="circle">&#x25CF;</div>
          <span className="fe-body" style={{ alignSelf: "center" }}>
            circle (icon/avatar)
          </span>
        </div>
        <p className="fe-body" style={{ marginTop: "var(--spacing-4)" }}>Shadows:</p>
        <div className="ds-shadow-demo">
          {shadowTokens.map(({ token, var: cssVar }) => (
            <div key={token} className="ds-shadow-box" style={{ boxShadow: cssVar }}>
              {token}
            </div>
          ))}
        </div>
      </section>

      <section id="motion" className="ds-section">
        <h2 className="ds-section-title">Motion</h2>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          Transitions: <code>--transition-fast</code> (150ms),{" "}
          <code>--transition-base</code> (250ms), <code>--transition-slow</code>{" "}
          (400ms). Hover the card:
        </p>
        <div className="ds-motion-demo-card">Hover me</div>
      </section>
    </>
  );
}
