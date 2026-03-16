import {
  hero as heroCopy,
  mission as missionCopy,
  stats as statsCopy,
  designSystemIntro,
  futureSiteUrl,
} from "@/content/site-copy";
import packageJson from "@/package.json";
import FaqDemo from "./FaqDemo";

const steps = [
  "50",
  "100",
  "150",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];
const colorPaletteGroups = [
  { name: "Primary (Orange)", prefix: "primary", path: "primary" },
  {
    name: "Secondary Green",
    prefix: "secondary-green",
    path: "secondary-green",
  },
  { name: "Secondary Blue", prefix: "secondary-blue", path: "secondary-blue" },
  {
    name: "Secondary Lavender",
    prefix: "secondary-lavender",
    path: "secondary-lavender",
  },
  {
    name: "Neutral",
    prefix: "neutral",
    path: "neutral",
    steps: [
      "50",
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
      "1000",
    ],
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
        <h3 className="ds-subsection-title">Full palette (50–900)</h3>
        {colorPaletteGroups.map((group) => (
          <div key={group.path} className="ds-palette-group">
            <h4 className="ds-palette-group-title">{group.name}</h4>
            <div className="ds-swatch-grid">
              {(group.steps ?? steps).map((step) => (
                <div key={step} className="ds-swatch">
                  <div
                    className="ds-swatch-color"
                    style={{
                      backgroundColor: `var(--color-${group.prefix}-${step})`,
                    }}
                  />
                  <div className="ds-swatch-label">{step}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
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
          <button type="button" className="fe-btn-primary">
            Book Event →
          </button>
          <button type="button" className="fe-btn-secondary">
            Book Event →
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

      <section className="ds-section">
        <h2 className="ds-section-title">Icon buttons &amp; Play button</h2>
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
              aria-hidden
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </button>
          <button type="button" className="fe-icon-btn" aria-label="WhatsApp">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
          <button type="button" className="fe-play-btn" aria-label="Play">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">FAQ / Accordion</h2>
        <FaqDemo />
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Header (desktop &amp; mobile)</h2>
        <div className="fe-header">
          <div className="fe-header__inner">
            <div
              className="fe-header__logo"
              style={{
                fontWeight: "var(--font-weight-bold)",
                fontSize: "var(--font-size-lg)",
              }}
            >
              For Everyone
            </div>
            <nav className="fe-header__nav" aria-label="Main">
              <a href="#workshops" className="fe-nav-link">
                Workshops
              </a>
              <a href="#about" className="fe-nav-link">
                About Us ⌄
              </a>
              <a href="#cafe" className="fe-nav-link">
                Community Cafe
              </a>
              <a href="#blog" className="fe-nav-link">
                Blog
              </a>
              <a href="#support" className="fe-nav-link">
                Support ⌄
              </a>
              <a href="#contact" className="fe-nav-link">
                Contact
              </a>
            </nav>
            <div className="fe-header__actions">
              <button
                type="button"
                className="fe-icon-btn"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                </svg>
              </button>
              <button
                type="button"
                className="fe-header__menu-btn"
                aria-label="Menu"
              >
                ☰
              </button>
              <a href="#book" className="fe-btn-primary fe-header__cta">
                Book a Workshop →
              </a>
            </div>
          </div>
        </div>
        <p
          className="fe-body"
          style={{
            marginTop: "var(--spacing-4)",
            fontSize: "var(--font-size-sm)",
            color: "var(--color-neutral-600)",
          }}
        >
          Mobile: logo + icon button + hamburger (blue). Desktop: nav links +
          CTA.
        </p>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Footer</h2>
        <footer className="fe-footer">
          <div className="fe-footer__inner">
            <div className="fe-footer__grid">
              <div className="fe-footer__column">
                <div
                  style={{
                    fontWeight: "var(--font-weight-bold)",
                    marginBottom: "var(--spacing-4)",
                  }}
                >
                  For Everyone
                </div>
                <p
                  className="fe-label"
                  style={{ marginBottom: "var(--spacing-2)" }}
                >
                  Explore
                </p>
                <ul>
                  <li>
                    <a href="#w" className="fe-nav-link">
                      Workshops
                    </a>
                  </li>
                  <li>
                    <a href="#a" className="fe-nav-link">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#c" className="fe-nav-link">
                      Community Cafe
                    </a>
                  </li>
                  <li>
                    <a href="#i" className="fe-nav-link">
                      Impact
                    </a>
                  </li>
                  <li>
                    <a href="#b" className="fe-nav-link">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div className="fe-footer__column">
                <p
                  className="fe-label"
                  style={{ marginBottom: "var(--spacing-2)" }}
                >
                  Support
                </p>
                <ul>
                  <li>
                    <a href="#g" className="fe-nav-link">
                      Get Involved
                    </a>
                  </li>
                  <li>
                    <a href="#p" className="fe-nav-link">
                      Partner with Us
                    </a>
                  </li>
                  <li>
                    <a href="#m" className="fe-nav-link">
                      Press &amp; Media
                    </a>
                  </li>
                </ul>
              </div>
              <div className="fe-footer__column">
                <p
                  className="fe-label"
                  style={{ marginBottom: "var(--spacing-2)" }}
                >
                  Contact
                </p>
                <p
                  className="fe-body"
                  style={{ margin: 0, fontSize: "var(--font-size-sm)" }}
                >
                  info@wellbeing4everyone.com
                </p>
                <p
                  className="fe-body"
                  style={{
                    marginTop: "var(--spacing-2)",
                    fontSize: "var(--font-size-sm)",
                  }}
                >
                  Boxhagener Platz, 10245 Berlin
                </p>
              </div>
              <div className="fe-footer__column">
                <p
                  className="fe-body"
                  style={{
                    marginBottom: "var(--spacing-4)",
                    fontSize: "var(--font-size-sm)",
                  }}
                >
                  Not your average newsletter: heartfelt, human, happy.
                </p>
                <div className="fe-footer__newsletter">
                  <input
                    type="email"
                    className="fe-input"
                    placeholder="Your email"
                    aria-label="Email"
                  />
                  <button type="button" className="fe-btn-primary">
                    Subscribe
                  </button>
                </div>
                <div className="fe-footer__social">
                  <button
                    type="button"
                    className="fe-icon-btn"
                    aria-label="Instagram"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="fe-icon-btn"
                    aria-label="LinkedIn"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="fe-footer__bottom">
              <span>© 2025 ForEveryone. All rights reserved.</span>
              <div className="fe-footer__legal">
                <a href="#privacy">Privacy</a>
                <a href="#terms">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Workshop card (full)</h2>
        <div className="fe-card" style={{ maxWidth: "360px" }}>
          <div className="fe-card__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero.png"
              alt=""
              width={360}
              height={225}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <span className="fe-card-badge">2 free spots</span>
            <span className="fe-card-category">Balance and Wellness</span>
          </div>
          <div className="fe-card__body">
            <div className="fe-card-meta">
              <span aria-hidden>🕐</span> Sunday, Sept 15 · 14:00–17:00
            </div>
            <h3 className="fe-h3" style={{ margin: "0 0 var(--spacing-2)" }}>
              Pottery Workshop
            </h3>
            <p
              className="fe-body"
              style={{
                margin: 0,
                fontSize: "var(--font-size-sm)",
                color: "var(--color-neutral-700)",
              }}
            >
              A hands-on, welcoming clay workshop for all levels — no experience
              needed!
            </p>
            <div className="fe-card-price">
              <span className="fe-card-price__amount">From €10</span>
              <a href="#book" className="fe-btn-primary">
                Book Now →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Category tag variants</h2>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-3)" }}
        >
          <span className="fe-tag-pill">Default</span>
          <span className="fe-tag-pill fe-tag-pill--green">
            Balance and Wellness
          </span>
          <span className="fe-tag-pill fe-tag-pill--orange">Expression</span>
          <span className="fe-tag-pill fe-tag-pill--lavender">
            Arts and Crafts
          </span>
          <span className="fe-tag-pill fe-tag-pill--blue">Music</span>
          <span className="fe-tag-pill active">Active (primary)</span>
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
        <h2 className="ds-section-title">Form elements &amp; input states</h2>
        <div
          style={{
            maxWidth: "20rem",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-6)",
          }}
        >
          <div className="fe-input-group">
            <label className="fe-label" htmlFor="ds-input-demo">
              Label
            </label>
            <input
              id="ds-input-demo"
              type="text"
              className="fe-input"
              placeholder="Placeholder text"
              aria-label="Demo input"
            />
          </div>
          <div className="fe-input-group">
            <label className="fe-label" htmlFor="ds-input-error">
              Required field
            </label>
            <input
              id="ds-input-error"
              type="text"
              className="fe-input fe-input--error"
              placeholder="Label"
              aria-label="Error state"
              aria-invalid="true"
            />
            <span className="fe-input-error-msg">field is required</span>
          </div>
          <div className="fe-input-group">
            <label className="fe-label" htmlFor="ds-input-disabled">
              Disabled
            </label>
            <input
              id="ds-input-disabled"
              type="text"
              className="fe-input"
              placeholder="Label"
              disabled
              aria-label="Disabled"
            />
          </div>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Dropdown</h2>
        <div className="fe-dropdown" style={{ width: "14rem" }}>
          <a href="#about" className="fe-dropdown-item">
            About us <span aria-hidden>→</span>
          </a>
          <a href="#team" className="fe-dropdown-item">
            Meet The Team <span aria-hidden>→</span>
          </a>
          <a href="#blog" className="fe-dropdown-item">
            Blog <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Card benefit &amp; get involved</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-4)",
          }}
        >
          <div className="fe-card-benefit">
            <h3 className="fe-h3" style={{ margin: "0 0 var(--spacing-2)" }}>
              Meet People Offline
            </h3>
            <p className="fe-body" style={{ margin: 0 }}>
              A safe space to make genuine, real-life connections.
            </p>
          </div>
          <div className="fe-card-get-involved">
            <div className="fe-card-get-involved__content">
              <h3 className="fe-card-get-involved__title">
                Lead a Workshop or Event
              </h3>
              <p className="fe-card-get-involved__body">
                Help locals and internationals find belonging by sharing your
                hobby.
              </p>
            </div>
            <div className="fe-card-get-involved__icon" aria-hidden>
              🎭
            </div>
          </div>
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
