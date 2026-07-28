import Image from "next/image";
import Link from "next/link";
import HeaderDemo from "../_components/HeaderDemo";
import ActivityIcon from "../_components/ActivityIcon";
import { CATEGORY_LABELS } from "../_components/CategoryIcon";
import { hero as heroCopy } from "@/content/site-copy";

const PATTERNS_HERO_HEADLINE = "Tokens, Components, and Patterns";

function CheckCircle() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="8.5 12.5 11 15 16 9.5" />
    </svg>
  );
}

function SocialIconButton({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  return (
    <button type="button" className="fe-icon-btn" aria-label={label}>
      <span
        className="fe-social-icon-glyph"
        style={{
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`,
        }}
        aria-hidden="true"
      />
    </button>
  );
}

const upcomingWorkshops = [
  {
    image: "/images/workshop-pottery.jpg",
    alt: "People shaping clay together at a table in a bright art studio.",
    category: "arts-crafts" as const,
    categoryLabel: "Arts and Crafts",
    activity: "pottery" as const,
    spots: "3 free spots",
    date: "Sunday, Sept 15 · 14:00–17:00",
    title: "Pottery and Clay Morning",
    blurb: "A hands-on, welcoming clay session for all levels. No experience needed.",
    price: "From €10",
  },
  {
    image: "/images/workshop-group.jpg",
    alt: "People practice yoga and wellbeing exercises together in a bright studio.",
    category: "wellness" as const,
    categoryLabel: "Balance and Wellness",
    activity: null,
    spots: "5 free spots",
    date: "Tuesday, Sept 17 · 18:30–20:00",
    title: "Yoga and Wellbeing Session",
    blurb: "A calm group session to stretch, breathe, and reset. All levels welcome.",
    price: "From €8",
  },
  {
    image: "/images/workshop-drawing.jpg",
    alt: "People holding up colourful portrait drawings at an outdoor table.",
    category: "expression" as const,
    categoryLabel: "Expression",
    activity: "writing" as const,
    spots: "2 free spots",
    date: "Saturday, Sept 21 · 11:00–13:00",
    title: "Drawing and Expression",
    blurb: "Playful portrait drawing in the open air. Bring yourself, we bring the rest.",
    price: "Free",
  },
];

const FILTER_CATEGORIES = [
  "balance-wellness",
  "movement",
  "arts-crafts",
  "expression",
  "music",
] as const;

export default function PatternsPage() {
  const [headlineFirst, ...headlineRest] = PATTERNS_HERO_HEADLINE.split(" ");

  return (
    <>
      <h1 className="ds-page-title">Patterns</h1>
      <p className="ds-intro">
        Composite UI patterns that combine tokens and components into reusable
        layouts: headers, footers, workshop cards, and more.
      </p>

      <section id="header-pattern" className="ds-section">
        <h2 className="ds-section-title">Header (desktop &amp; mobile)</h2>
        <HeaderDemo />
      </section>

      <section id="footer-pattern" className="ds-section">
        <h2 className="ds-section-title">Footer</h2>
        <footer className="fe-footer">
          <div className="fe-footer__inner">
            <p className="fe-footer__brand">
              <Image
                src="/images/foreveryone-logo.png"
                alt="ForEveryone"
                width={175}
                height={32}
                sizes="175px"
              />
            </p>
            <div className="fe-footer__grid">
              <div className="fe-footer__column">
                <p className="fe-footer__column-title">Column One</p>
                <ul>
                  <li><a href="#l1" className="fe-nav-link">Link One</a></li>
                  <li><a href="#l2" className="fe-nav-link">Link Two</a></li>
                  <li><a href="#l3" className="fe-nav-link">Link Three</a></li>
                  <li><a href="#l4" className="fe-nav-link">Link Four</a></li>
                  <li><a href="#l5" className="fe-nav-link">Link Five</a></li>
                </ul>
              </div>
              <div className="fe-footer__column">
                <p className="fe-footer__column-title">Column Two</p>
                <ul>
                  <li><a href="#l6" className="fe-nav-link">Link One</a></li>
                  <li><a href="#l7" className="fe-nav-link">Link Two</a></li>
                  <li><a href="#l8" className="fe-nav-link">Link Three</a></li>
                </ul>
              </div>
              <div className="fe-footer__column">
                <p className="fe-footer__column-title">Contact</p>
                <p className="fe-body" style={{ fontSize: "var(--font-size-sm)" }}>
                  hello@example.com
                </p>
                <p
                  className="fe-body"
                  style={{
                    marginTop: "var(--spacing-2)",
                    fontSize: "var(--font-size-sm)",
                  }}
                >
                  Example Strasse 52, 10115 Berlin
                </p>
                <div className="fe-footer__social">
                  <SocialIconButton src="/icons/social/instagram.svg" label="Instagram" />
                  <SocialIconButton src="/icons/social/linkedin.svg" label="LinkedIn" />
                </div>
              </div>
              <div className="fe-footer__column">
                <p
                  className="fe-body"
                  style={{
                    marginBottom: "var(--spacing-4)",
                    fontSize: "var(--font-size-sm)",
                  }}
                >
                  Sign up for occasional updates.
                </p>
                <div className="fe-footer__newsletter">
                  <input
                    type="email"
                    className="fe-input"
                    placeholder="Your email"
                    aria-label="Email"
                  />
                  <button type="button" className="ds-btn ds-btn--primary">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="fe-footer__bottom">
              <span>&copy; 2025 Example Organisation. All rights reserved.</span>
              <div className="fe-footer__legal">
                <a href="#privacy">Privacy</a>
                <a href="#legal">Legal notice</a>
              </div>
            </div>
          </div>
        </footer>
      </section>

      <section id="category-filter" className="ds-section">
        <h2 className="ds-section-title">Category filter bar</h2>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          Interactive category pills. Active state uses the category fill colour.
        </p>
        <div
          className="ds-icon-in-context-row"
          style={{ flexWrap: "wrap", gap: "var(--spacing-2)" }}
        >
          {FILTER_CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              type="button"
              className={`fe-tag-pill fe-tag-pill--${cat === "balance-wellness" ? "balance" : cat === "arts-crafts" ? "arts" : cat}${i === 0 ? " active" : ""}`}
              aria-pressed={i === 0}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </section>

      <section id="hero-pattern" className="ds-section">
        <h2 className="ds-section-title">Hero with blob photo</h2>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          Split headline, new double-line sketched underline, and blob-masked
          hero photograph. Same structure as the design-system home page.
        </p>
        <div className="ds-pattern-hero-specimen">
          <div>
            <div className="ds-headline-with-underline">
              <h2 className="ds-hero-title">
                {headlineFirst}
                <br />
                {headlineRest.join(" ")}
                <span className="ds-headline-underline" aria-hidden="true" />
              </h2>
            </div>
            <p className="ds-intro">{heroCopy.tagline}</p>
            <Link href="/components" className="fe-btn-primary">
              Explore components
            </Link>
          </div>
          <div className="ds-hero-image-wrap">
            <Image
              src="/images/community-cafe.png"
              alt="Three people sit and chat at a wooden table in the ForEveryone community cafe, lit by afternoon sun."
              width={1090}
              height={1094}
              sizes="(max-width: 1024px) 100vw, 320px"
            />
          </div>
        </div>
      </section>

      <section id="activity-workshop-card" className="ds-section">
        <h2 className="ds-section-title">Activity workshop card</h2>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          Activity glyph (pottery) on the category badge while the label stays
          canonical (&ldquo;Arts and Crafts&rdquo;).
        </p>
        <div style={{ padding: "var(--spacing-2)", maxWidth: "26rem" }}>
          <div className="fe-card" style={{ maxWidth: "25rem" }}>
            <div className="fe-card__media">
              <Image
                src="/images/workshop-pottery.jpg"
                alt="People shaping clay together at a table in a bright art studio."
                width={360}
                height={225}
                sizes="360px"
              />
              <span className="fe-card-badge">2 free spots</span>
              <span className="fe-card-category">Arts and Crafts</span>
            </div>
            <div className="fe-card__body">
              <div className="fe-card-meta">
                <CheckCircle /> Sunday, Sept 15 · 14:00–17:00
              </div>
              <h3 className="fe-h3" style={{ margin: "0 0 var(--spacing-2)" }}>
                Pottery Workshop
              </h3>
              <p className="fe-body" style={{ margin: 0, fontSize: "var(--font-size-sm)" }}>
                A hands-on clay session for all levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="workshop-card" className="ds-section">
        <h2 className="ds-section-title">Workshop card (full)</h2>
        <div style={{ padding: "var(--spacing-2)", maxWidth: "26rem" }}>
          <div className="fe-card" style={{ maxWidth: "25rem" }}>
            <div className="fe-card__media">
              <Image
                src="/images/workshop-group.jpg"
                alt="People practice yoga and wellbeing exercises together in a bright studio."
                width={360}
                height={225}
                sizes="360px"
              />
              <span className="fe-card-badge">2 free spots</span>
              <span className="fe-card-category">Balance and Wellness</span>
            </div>
            <div className="fe-card__body">
              <div className="fe-card-meta">
                <CheckCircle /> Sunday, Sept 15 · 14:00–17:00
              </div>
              <h3 className="fe-h3" style={{ margin: "0 0 var(--spacing-2)" }}>
                Yoga and Wellbeing
              </h3>
              <p className="fe-body" style={{ margin: 0, fontSize: "var(--font-size-sm)" }}>
                A calm group session to stretch, breathe, and reset.
              </p>
              <div className="fe-card-price" style={{ justifyContent: "flex-end" }}>
                <a href="#book" className="fe-btn-secondary">
                  Book Workshop &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="ds-section">
        <h2 className="ds-section-title">Upcoming workshops</h2>
        <div className="fe-event-tabs" role="group" aria-label="Filter events">
          {["This Week", "This Month", "Next Month", "Choose Date"].map(
            (tab, i) => (
              <button
                key={tab}
                type="button"
                aria-pressed={i === 0}
                className={`fe-event-tab${i === 0 ? " is-active" : ""}`}
              >
                {tab}
              </button>
            ),
          )}
        </div>
        <div className="ds-events-grid">
          {upcomingWorkshops.map((w) => (
            <div className="fe-card" key={w.title}>
              <div className="fe-card__media">
                <Image
                  src={w.image}
                  alt={w.alt}
                  width={360}
                  height={200}
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                <span className="fe-card-badge">{w.spots}</span>
                <span className="fe-card-category">{w.categoryLabel}</span>
              </div>
              <div className="fe-card__body">
                <div className="fe-card-meta">
                  <CheckCircle /> {w.date}
                </div>
                <h3 className="fe-h3" style={{ margin: "0 0 var(--spacing-2)" }}>
                  {w.title}
                </h3>
                <p
                  className="fe-body"
                  style={{
                    margin: 0,
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-brand-dark)",
                  }}
                >
                  {w.blurb}
                </p>
                <div className="fe-card-price">
                  <span className="fe-card-price__amount">{w.price}</span>
                  <a href="#join" className="fe-btn-secondary">
                    Book Workshop &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="benefit-cards" className="ds-section">
        <h2 className="ds-section-title">Card benefit &amp; get involved</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
          <div className="fe-card-benefit">
            <div className="fe-card-benefit__content">
              <h3 className="fe-h3" style={{ margin: "0 0 var(--spacing-2)" }}>
                Meet People Offline
              </h3>
              <p className="fe-body" style={{ margin: 0 }}>
                A safe space to make genuine, real-life connections.
              </p>
            </div>
            <span
              className="fe-card-benefit__illustration ds-illo-mark"
              style={{
                maskImage: "url(/illustrations/flower.svg)",
                WebkitMaskImage: "url(/illustrations/flower.svg)",
              }}
              aria-hidden="true"
            />
          </div>
          <div className="fe-card-get-involved">
            <div className="fe-card-get-involved__content">
              <h3 className="fe-card-get-involved__title">Lead a Workshop or Event</h3>
              <p className="fe-card-get-involved__body">
                Share your hobby with locals and internationals alike.
              </p>
            </div>
            <span className="fe-card-get-involved__icon" aria-hidden="true">
              <ActivityIcon name="writing" size="lg" chip />
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
