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

// Tokens are authored in OKLCH (round-trip-exact to the sRGB hex shown in
// comments) so the palette reads in a perceptual space and is ready for wide
// gamut. Hex equivalents are kept inline for reference only.
const colorCode = `/* Brand */
--color-brand-primary: oklch(0.726 0.179 43.9);    /* #FF7A3A */
--color-brand-secondary: oklch(0.4486 0.2813 275.3); /* #3F00EB */
--color-brand-dark: oklch(0.235 0 89.9);           /* #1E1E1E */
--color-accent: oklch(0.99 0.007 97.3);            /* #FDFCF7 */
--color-focus-button: oklch(0.616 0.149 44.3);     /* #CC622E */

/* Tints & Accents */
--color-light-purple: oklch(0.856 0.081 297.3);    /* #D5C5FF */
--color-soft-lavender: oklch(0.912 0.048 297.2);   /* #E5DCFF */
--color-light-green: oklch(0.896 0.083 121.2);     /* #D4E6A8 */
--color-light-orange: oklch(0.908 0.052 46.9);     /* #FFD7C4 */
--color-pink: oklch(0.792 0.107 357.1);            /* #F39EBC */
--color-teal: oklch(0.7606 0.1291 201.2);          /* #03C9D3 */
--color-purple: oklch(0.732 0.153 327);            /* #DA83DA */
--color-very-light-gray: oklch(0.976 0 89.9);      /* #F7F7F7 */
--color-light-gray: oklch(0.885 0 89.9);           /* #D9D9D9 */

/* Theme (Elementor) */
--color-theme-1: oklch(0.532 0.142 247.7);         /* #0170B9 */
--color-theme-2: oklch(0.235 0 89.9);              /* #1E1E1E */
--color-theme-4: oklch(0.427 0.016 266.5);         /* #4B4F58 */
--color-theme-5: oklch(0.97 0 89.9);               /* #F5F5F5 */
--color-theme-7: oklch(0.922 0 89.9);              /* #E5E5E5 */
--color-theme-8: oklch(0.235 0 89.9);              /* #1E1E1E */

/* Status */
--color-status-error: oklch(0.577 0.215 27.3);     /* #DC2626 */
--color-status-success: oklch(0.896 0.083 121.2);  /* #D4E6A8 */
--color-status-warning: oklch(0.822 0.107 46.2);   /* #FFAF89 */

/* Base */
--color-white: oklch(1 0 89.9);                    /* #FFFFFF */
--color-black: oklch(0.145 0 89.9);                /* #0A0A0A */`;

const typographyCode = `/* Font Families */
--font-family-heading: 'FilsonPro', sans-serif;  /* H1–H3, body, UI */
--font-family-accent: 'Young Serif', serif;      /* PRINT ONLY, not for digital */
--font-family-body: 'FilsonPro', sans-serif;

/* Font Weights (Filson Pro: 6 styles incl. italics) */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-medium-italic: 500;  /* + font-style: italic */
--font-weight-bold: 700;
--font-weight-bold-italic: 700;    /* + font-style: italic */

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
--line-height-normal: 1.5;  /* body — never below 1.5 */

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

const motionDurations = [
  { token: "--transition-fast", value: "150ms", use: "Button hover, focus ring, icon swaps" },
  { token: "--transition-base", value: "250ms", use: "Accordions, dropdowns, card hover-lift" },
  { token: "--transition-slow", value: "400ms", use: "Mobile-nav sheet, page-level fades" },
];

const motionCode = `/* tokens/motion.json → CSS custom properties */
--transition-fast: 150ms ease;   /* snap interactions       */
--transition-base: 250ms ease;   /* default UI              */
--transition-slow: 400ms ease;   /* large surfaces          */

/* One ease curve, three speeds. Animate only the properties that
   change (opacity, transform, colour) — never \`all\`. Every animated
   surface sits under the reduced-motion guard. */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`;

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
            <div className="fe-label">Display &middot; Bold</div>
            <h2 className="fe-h1">Real Connections Made Easy</h2>
          </div>
          <div>
            <div className="fe-label">Heading 1 &middot; Bold</div>
            <h3 className="fe-h2">Upcoming Workshop at No. 52</h3>
          </div>
          <div>
            <div className="fe-label">Heading 2 &middot; Bold</div>
            <h4 className="fe-h3">No Experience Needed.</h4>
          </div>
          <div>
            <div className="fe-label">Subheading &middot; Medium</div>
            <p className="fe-body fe-body--medium">
              Every Thursday &middot; Free Entry &middot; No. 52 Cafe
            </p>
          </div>
          <div>
            <div className="fe-label">Body &middot; Regular</div>
            <p className="fe-body">
              Our workshops are open to everyone, regardless of background or
              experience. Come as you are.
            </p>
          </div>
          <div>
            <div className="fe-label">Caption &middot; Medium</div>
            <p className="fe-caption">Photo: ForEveryone Drawing Club, March 2026</p>
          </div>
          <div>
            <div className="fe-label">Emphasis &middot; Italic</div>
            <p className="fe-body">
              Used for publication names, artwork titles, and{" "}
              <em className="fe-em">highlighted phrases</em>.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-2)",
            }}
          >
            <div className="fe-label">Blockquote</div>
            <blockquote className="ds-quote">
              Typography and spacing come from the design system.
            </blockquote>
          </div>
          <div>
            <span className="fe-tag">Tag</span>
          </div>
        </div>
        <p className="fe-callout">
          <strong>Spacing:</strong> keep letter-spacing at 0% for all weights, and
          do not compress body line-height below <strong>1.5</strong> (Brand Book
          v1.0 p.22). Filson Pro ships six styles: Regular, Regular Italic, Medium,
          Medium Italic, Bold, Bold Italic. Young Serif is print only.
        </p>
        <CodeBlock code={typographyCode} />

        <h3 className="ds-subsection-title">Copy format rules</h3>
        <div className="ds-dodont">
          <div className="ds-dodont__do">
            <p className="ds-dodont__label">Do</p>
            <ul>
              <li>Left-align all headlines and body text.</li>
              <li>Use bullet points only for lists of two or more items.</li>
              <li>Keep paragraphs whole; avoid isolated single words or lines.</li>
            </ul>
          </div>
          <div className="ds-dodont__dont">
            <p className="ds-dodont__label">Don&rsquo;t</p>
            <ul>
              <li>Justify text to both the left and right edges.</li>
              <li>Hyphenate words at the end of a line.</li>
              <li>Centre-align body copy of three or more lines.</li>
            </ul>
          </div>
        </div>
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
        <p className="ds-section-intro">
          Motion is calm and purposeful: it confirms an action or eases a
          transition, never performs. One shared <code className="ds-code">ease</code>{" "}
          curve at three durations; the speed reads as proportional to the size
          of the moving surface. Every animated surface respects reduced-motion.
        </p>
        <div
          className="ds-motion-table ds-motion-table--3col"
          role="table"
          aria-label="Motion tokens"
        >
          <div className="ds-motion-table__head" role="row">
            <span role="columnheader">Token</span>
            <span role="columnheader">Duration</span>
            <span role="columnheader">Use for</span>
          </div>
          {motionDurations.map(({ token, value, use }) => (
            <div className="ds-motion-table__row" role="row" key={token}>
              <span role="cell">
                <code className="ds-code">{token}</code>
              </span>
              <span role="cell">{value}</span>
              <span role="cell">{use}</span>
            </div>
          ))}
        </div>
        <CodeBlock code={motionCode} />
      </section>

      <section id="layout" className="ds-section">
        <h2 className="ds-section-title">Layout</h2>
        <p className="ds-section-intro">
          Layouts are open, warm, and well-structured: generous white space,
          photography and community content leading, no visual clutter (Brand Book
          v1.0 p.33). White space is an active design decision &mdash; when in
          doubt, reduce content rather than reduce spacing.
        </p>
        <ul className="ds-rule-list">
          <li>
            <strong>Grid &amp; margins:</strong> 48&ndash;64px on all sides
            (digital); 15&ndash;20mm (print).
          </li>
          <li>
            <strong>Alignment:</strong> left-align body text and headings by
            default. Centre display headlines on full-bleed title slides only.
          </li>
          <li>
            Never align text to both edges; never centre-align body copy of three
            or more lines.
          </li>
        </ul>

        <h3 className="ds-subsection-title">QR codes</h3>
        <p className="fe-body">
          Frame each QR code in a solid <strong>Orange</strong> border with four
          rounded corners, on a White or Warm White background &mdash; Orange in
          its approved role as a border accent. No tilt, no effects; leave even
          breathing space between the code and the border.
        </p>
        <div className="ds-qr-demo">
          <a
            className="ds-qr-frame"
            href="https://foreveryone.berlin"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Real, scannable QR encoding https://foreveryone.berlin.
                eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/illustrations/qr-foreveryone.svg"
              alt="QR code linking to foreveryone.berlin"
              width={132}
              height={132}
              className="ds-qr-code"
            />
          </a>
        </div>
      </section>
    </>
  );
}
