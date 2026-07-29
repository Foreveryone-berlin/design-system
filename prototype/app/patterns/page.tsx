import Image from "next/image";
import dynamic from "next/dynamic";
import HeaderDemo from "../_components/HeaderDemo";
import ActivityIcon, { type ActivityIconName } from "../_components/ActivityIcon";
import CategoryIcon, { CATEGORY_LABELS, type CategoryIconName } from "../_components/CategoryIcon";
import { hero as heroCopy } from "@/content/site-copy";

const StatCounter = dynamic(() => import("../_components/StatCounter"));
const EventsWorkshopsSwitcher = dynamic(
  () => import("../_components/EventsWorkshopsSwitcher"),
);

const PATTERNS_HERO_HEADLINE = "Tokens, Components, and Patterns";

const liveStats = [
  { value: "200+", label: "Monthly participants" },
  { value: "12+", label: "Locations" },
  { value: "40+", label: "Workshops & events" },
  { value: "100+", label: "Volunteers" },
];

const benefits: {
  title: string;
  body: string;
  icon:
    | { type: "category"; name: CategoryIconName }
    | { type: "activity"; name: ActivityIconName };
}[] = [
  {
    title: "Meet People Offline",
    body: "A safe space to make genuine, real-life connections.",
    icon: { type: "category", name: "movement" },
  },
  {
    title: "Learn Something New",
    body: "Try pottery, yoga, chess, and more in a welcoming group.",
    icon: { type: "activity", name: "pottery" },
  },
  {
    title: "Boost Mental Wellbeing",
    body: "Creative connection that helps you recharge and belong.",
    icon: { type: "category", name: "balance-wellness" },
  },
  {
    title: "No Expectations",
    body: "Drop in when it suits you. No membership, no pressure.",
    icon: { type: "category", name: "expression" },
  },
  {
    title: "Beginner-Friendly",
    body: "Every workshop welcomes first-timers. Come as you are.",
    icon: { type: "activity", name: "knitting" },
  },
  {
    title: "Fair Pricing",
    body: "Most sessions from €8, with free spots where we can.",
    icon: { type: "category", name: "music" },
  },
];

function SocialIconButton({ src, label }: { src: string; label: string }) {
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

export default function PatternsPage() {
  const [headlineFirst, ...headlineRest] = PATTERNS_HERO_HEADLINE.split(" ");

  return (
    <>
      <h1 className="ds-page-title">Patterns</h1>
      <p className="ds-intro">
        Composite UI patterns that combine tokens and components into reusable
        layouts from the live ForEveryone site: headers, stats, benefit grids,
        event switchers, and more.
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
                  hello@foreveryone.berlin
                </p>
                <p
                  className="fe-body"
                  style={{
                    marginTop: "var(--spacing-2)",
                    fontSize: "var(--font-size-sm)",
                  }}
                >
                  Torstraße 52, 10119 Berlin
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
              <span>&copy; 2025 ForEveryone Berlin. All rights reserved.</span>
              <div className="fe-footer__legal">
                <a href="#privacy">Privacy</a>
                <a href="#legal">Legal notice</a>
              </div>
            </div>
          </div>
        </footer>
      </section>

      <section id="stats-strip" className="ds-section">
        <h2 className="ds-section-title">Stats strip with animated counters</h2>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          Compact KPI row for home and campaign pages. Counters animate on
          scroll; reduced-motion users see the final value immediately.
        </p>
        <div className="ds-stats" aria-label="ForEveryone impact in numbers">
          {liveStats.map((stat) => (
            <div key={stat.label} className="ds-stat">
              <p className="ds-stat-value">
                <StatCounter value={stat.value} />
              </p>
              <p className="ds-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
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
          {(["balance-wellness", "movement", "arts-crafts", "expression", "music"] as const).map(
            (cat, i) => (
              <button
                key={cat}
                type="button"
                className={`fe-tag-pill fe-tag-pill--${
                  cat === "balance-wellness"
                    ? "balance"
                    : cat === "arts-crafts"
                      ? "arts"
                      : cat
                }${i === 0 ? " active" : ""}`}
                aria-pressed={i === 0}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ),
          )}
        </div>
      </section>

      <section id="benefit-grid" className="ds-section">
        <h2 className="ds-section-title">Benefit grid (6-point value proposition)</h2>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          Two-by-three card grid with a category or activity icon lead and short
          copy from the live-site value proposition.
        </p>
        <div className="ds-benefit-grid">
          {benefits.map((item) => (
            <div className="fe-card-benefit" key={item.title}>
              <span className="fe-card-benefit__icon" aria-hidden="true">
                {item.icon.type === "category" ? (
                  <CategoryIcon name={item.icon.name} size="sm" chip />
                ) : (
                  <ActivityIcon name={item.icon.name} size="sm" chip />
                )}
              </span>
              <div className="fe-card-benefit__content">
                <h3 className="fe-h3" style={{ margin: "0 0 var(--spacing-2)" }}>
                  {item.title}
                </h3>
                <p className="fe-body" style={{ margin: 0 }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="hero-pattern" className="ds-section">
        <h2 className="ds-section-title">Hero with blob photo</h2>
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
            <button type="button" className="fe-btn-primary">
              Explore components
            </button>
          </div>
          <div className="ds-hero-image-wrap">
            <Image
              src="/images/Group_2.png"
              alt="A group of people together at a ForEveryone community gathering."
              width={1090}
              height={770}
              sizes="(max-width: 1024px) 100vw, 320px"
            />
          </div>
        </div>
      </section>

      <section id="events-workshops-switcher" className="ds-section">
        <h2 className="ds-section-title">Events and workshops switcher block</h2>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          One block with a top-level Events vs Workshops toggle and date tabs over the
          card grid.
        </p>
        <EventsWorkshopsSwitcher />
      </section>
    </>
  );
}
