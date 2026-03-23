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

const colorCode = `/* Brand */
--color-brand-primary: #FF7A3A;
--color-brand-secondary: #3F00EB;
--color-brand-dark: #404040;
--color-accent: #F1F1EA;
--color-focus-button: #CC622E;

/* Tints & Accents */
--color-light-purple: #D9CCFB;
--color-light-green: #F1F7E5;
--color-light-orange: #FFD7C4;
--color-pink: #F39EBC;
--color-teal: #03C9D3;
--color-purple: #DA83DA;
--color-very-light-gray: #F7F7F7;
--color-light-gray: #D9D9D9;

/* Theme (Elementor) */
--color-theme-1: #0170B9;
--color-theme-2: #3A3A3A;
--color-theme-4: #4B4F58;
--color-theme-5: #F5F5F5;
--color-theme-7: #E5E5E5;
--color-theme-8: #424242;

/* Status */
--color-status-error: #DC2626;
--color-status-success: #D4E8A8;
--color-status-warning: #FFAF89;

/* Base */
--color-white: #FFFFFF;
--color-black: #0A0A0A;`;

const typographyCode = `/* Font Families */
--font-family-heading: 'Filson Pro', sans-serif;
--font-family-accent: 'Young Serif', serif;
--font-family-body: 'Filson Pro', sans-serif;

/* Font Weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
--font-weight-black: 900;

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
--shadow-card: 0 2px 8px rgba(0,0,0,0.08);`;

const motionCode = `/* Motion / Transitions */
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 400ms ease;`;

export default function TokensPage() {
  return (
    <>
      <h1 className="ds-hero-title">
        Design
        <br />
        <span className="ds-hero-accent">Tokens</span>
      </h1>
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
              Body text uses design system tokens. Filson Pro at base size with
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

      <section id="motion" className="ds-section">
        <h2 className="ds-section-title">Motion</h2>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          Transitions: <code>--transition-fast</code> (150ms),{" "}
          <code>--transition-base</code> (250ms), <code>--transition-slow</code>{" "}
          (400ms). Hover the card:
        </p>
        <div className="ds-motion-demo-card">Hover me</div>
        <CodeBlock code={motionCode} />
      </section>
    </>
  );
}
