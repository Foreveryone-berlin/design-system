import CodeBlock from "../_components/CodeBlock";

const colorSwatches = [
  { token: "brand-primary", var: "var(--color-brand-primary)" },
  { token: "brand-secondary", var: "var(--color-brand-secondary)" },
  { token: "brand-dark", var: "var(--color-brand-dark)" },
  { token: "white", var: "var(--color-white)" },
  { token: "very-light-gray", var: "var(--color-very-light-gray)" },
  { token: "theme-5", var: "var(--color-theme-5)" },
  { token: "accent", var: "var(--color-accent)" },
  { token: "light-green", var: "var(--color-light-green)" },
  { token: "theme-7", var: "var(--color-theme-7)" },
  { token: "light-orange", var: "var(--color-light-orange)" },
  { token: "light-gray", var: "var(--color-light-gray)" },
  { token: "light-purple", var: "var(--color-light-purple)" },
  { token: "soft-lavender", var: "var(--color-soft-lavender)" },
  { token: "status-success", var: "var(--color-status-success)" },
  { token: "status-warning", var: "var(--color-status-warning)" },
  { token: "pink", var: "var(--color-pink)" },
  { token: "purple", var: "var(--color-purple)" },
  { token: "focus-button", var: "var(--color-focus-button)" },
  { token: "status-error", var: "var(--color-status-error)" },
  { token: "teal", var: "var(--color-teal)" },
  { token: "theme-1", var: "var(--color-theme-1)" },
  { token: "theme-4", var: "var(--color-theme-4)" },
  { token: "theme-8", var: "var(--color-theme-8)" },
  { token: "theme-2", var: "var(--color-theme-2)" },
  { token: "black", var: "var(--color-black)" },
];

const rampHex: Record<string, Record<string, string>> = {
  neutral: { "50": "#FAFAFA", "100": "#F5F5F5", "200": "#E5E5E5", "300": "#D4D4D4", "400": "#A3A3A3", "500": "#737373", "600": "#525252", "700": "#404040", "800": "#262626", "900": "#1E1E1E" },
  orange: { "50": "#FFF2EB", "100": "#FFE4D8", "150": "#FFD7C4", "200": "#FFCAB0", "300": "#FFAF89", "400": "#FF9561", "500": "#FF7A3A", "600": "#CC622E", "700": "#994923", "800": "#663117", "900": "#33180C" },
  green: { "50": "#FBFCF6", "100": "#F6FAEE", "150": "#F2F7E5", "200": "#EEF5DC", "300": "#E5F0CB", "400": "#DDEBB9", "500": "#D4E6A8", "600": "#AAB886", "700": "#7F8A65", "800": "#555C43", "900": "#2A2E22" },
  blue: { "50": "#ECE5FD", "100": "#D9CCFB", "150": "#C5B2F9", "200": "#B299F7", "300": "#8C66F3", "400": "#6533EF", "500": "#3F00EB", "600": "#3200BC", "700": "#26008D", "800": "#19005E", "900": "#0D002F" },
  lavender: { "50": "#FBF9FF", "100": "#F7F3FF", "150": "#F2EEFF", "200": "#EEE8FF", "300": "#E6DCFF", "400": "#DDD1FF", "500": "#D5C5FF", "600": "#AA9ECC", "700": "#807699", "800": "#554F66", "900": "#2B2733" },
};

// Pick a legible step label: white on dark swatches, charcoal on light ones.
function labelColor(hex: string): string {
  const toLin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const r = toLin(parseInt(hex.slice(1, 3), 16) / 255);
  const g = toLin(parseInt(hex.slice(3, 5), 16) / 255);
  const b = toLin(parseInt(hex.slice(5, 7), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.35 ? "#FFFFFF" : "#1E1E1E";
}

const colorRamps = Object.entries(rampHex).map(([family, steps]) => ({
  family,
  steps: Object.entries(steps).map(([step, hex]) => ({
    step,
    var: `var(--color-${family}-${step})`,
    label: labelColor(hex),
  })),
}));

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
  { token: "header", var: "var(--shadow-header)" },
];

const colorCode = `/* Brand */
--color-brand-primary: #FF7A3A;
--color-brand-secondary: #3F00EB;
--color-brand-dark: #1E1E1E;
--color-accent: #FDFCF7;
--color-focus-button: #CC622E;

/* Tints & Accents */
--color-light-purple: #D5C5FF;
--color-soft-lavender: #E5DCFF;
--color-light-green: #D4E6A8;
--color-light-orange: #FFD7C4;
--color-pink: #F39EBC;
--color-teal: #03C9D3;
--color-purple: #DA83DA;
--color-very-light-gray: #F7F7F7;
--color-light-gray: #D9D9D9;

/* Theme (Elementor) */
--color-theme-1: #0170B9;
--color-theme-2: #1E1E1E;
--color-theme-4: #4B4F58;
--color-theme-5: #F5F5F5;
--color-theme-7: #E5E5E5;
--color-theme-8: #1E1E1E;

/* Status */
--color-status-error: #DC2626;
--color-status-success: #D4E6A8;
--color-status-warning: #FFAF89;

/* Base */
--color-white: #FFFFFF;
--color-black: #0A0A0A;`;

const typographyCode = `/* Font Families */
--font-family-heading: 'FilsonPro', sans-serif;  /* H1–H3, body, UI */
--font-family-accent: 'Young Serif', serif;      /* PRINT ONLY, not for digital */
--font-family-body: 'FilsonPro', sans-serif;

/* Font Weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;

/* Font Sizes */
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 3rem;      /* 48px */
--font-size-4xl: 5.25rem;   /* 84px */

/* Line Heights */
--line-height-tight: 0.8;
--line-height-snug: 1.0;
--line-height-normal: 1.4;

/* Letter Spacing */
--letter-spacing-tight: -0.02em;
--letter-spacing-normal: 0em;`;

const spacingCode = `/* Spacing (4px base grid) */
--spacing-1: 0.25rem;   /*  4px */
--spacing-2: 0.5rem;    /*  8px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
--spacing-14: 3.5rem;   /* 56px */
--spacing-16: 4rem;     /* 64px */
--spacing-18: 4.5rem;   /* 72px */
--spacing-24: 6rem;     /* 96px */
--spacing-32: 8rem;     /* 128px */`;

const radiusShadowCode = `/* Border Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-card: 16px;
--radius-pill: 9999px;
--radius-circle: 50%;

/* Shadows */
--shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
--shadow-md: 0 4px 12px rgba(0,0,0,0.08);
--shadow-lg: 0 8px 24px rgba(0,0,0,0.12);
--shadow-card: 0 2px 8px rgba(0,0,0,0.08);
--shadow-header: 0 2px 12px rgba(0,0,0,0.1);`;

export default function TokensPage() {
  return (
    <>
      <h1 className="ds-page-title">Foundations</h1>
      <p className="ds-intro">
        The visual base of the system: colour, typography, spacing, radius, and
        shadows, defined as design tokens and exposed as CSS custom properties.
        Iconography and illustrations live under Components.
      </p>

      <section id="colors" className="ds-section">
        <h2 className="ds-section-title">Colours</h2>
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
        <CodeBlock code={colorCode} />
      </section>

      <section id="color-ramps" className="ds-section">
        <h2 className="ds-section-title">Colour ramps</h2>
        <p className="ds-section-intro">
          Numeric tints (50–900) from the 2026 style guide. 500 is the brand
          &ldquo;main&rdquo; for orange, green, blue, and lavender; neutral 900
          is Charcoal. Orange stays decorative, never a text background.
        </p>
        <div className="ds-ramps">
          {colorRamps.map(({ family, steps }) => (
            <div key={family} className="ds-ramp">
              <div className="ds-ramp-name">{family}</div>
              <div className="ds-ramp-row">
                {steps.map(({ step, var: cssVar, label }) => (
                  <div
                    key={step}
                    className="ds-ramp-swatch"
                    style={{ backgroundColor: cssVar }}
                    title={`--color-${family}-${step}`}
                  >
                    <span className="ds-ramp-step" style={{ color: label }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="color-combinations" className="ds-section">
        <h2 className="ds-section-title">Approved colour combinations</h2>
        <p
          className="fe-body"
          style={{
            marginBottom: "var(--spacing-4)",
            fontSize: "var(--font-size-sm)",
            color: "var(--color-theme-8)",
          }}
        >
          Background ⇄ text pairs allowed by the 2026 brand guide. Orange is
          decorative only — never use it as a background containing text.
        </p>
        <div className="ds-combos">
          <div
            className="ds-combo"
            style={{
              background: "var(--color-background-default)",
              color: "var(--color-brand-dark)",
            }}
          >
            <strong>Warm White</strong>
            <span>Charcoal text — text-heavy content</span>
          </div>
          <div
            className="ds-combo"
            style={{
              background: "var(--color-background-soft)",
              color: "var(--color-brand-dark)",
            }}
          >
            <strong>Soft Lavender</strong>
            <span>Charcoal text — cards, decorative blocks</span>
          </div>
          <div
            className="ds-combo"
            style={{
              background: "var(--color-background-title)",
              color: "var(--color-brand-dark)",
            }}
          >
            <strong>Lime Green</strong>
            <span>Charcoal text — title areas</span>
          </div>
          <div
            className="ds-combo"
            style={{
              background: "var(--color-background-alert)",
              color: "var(--color-white)",
            }}
          >
            <strong>Blue</strong>
            <span>White text — announcements / alerts only</span>
          </div>
          <div
            className="ds-combo"
            style={{
              background: "var(--color-brand-dark)",
              color: "var(--color-accent)",
            }}
          >
            <strong>Charcoal</strong>
            <span>Warm White text — dark sections (rare)</span>
          </div>
          <div
            className="ds-combo ds-combo--disallowed"
            style={{
              background: "var(--color-background-default)",
              color: "var(--color-brand-dark)",
              border: "2px dashed var(--color-status-error)",
            }}
          >
            <strong>Orange #FF7A3A</strong>
            <span>
              Disallowed as background. Decorative only: icons, blobs, borders,
              accents.
            </span>
          </div>
        </div>
      </section>

      <section id="typography" className="ds-section">
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
              Body text uses design system tokens. FilsonPro at base size with
              normal line height.
            </p>
          </div>
          <div>
            <span className="fe-tag">Tag</span>
          </div>
        </div>
        <CodeBlock code={typographyCode} />
      </section>

      <section id="spacing" className="ds-section">
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
        <CodeBlock code={spacingCode} />
      </section>

      <section id="radius-shadows" className="ds-section">
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
            &#x25CF;
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
        <CodeBlock code={radiusShadowCode} />
      </section>
    </>
  );
}
