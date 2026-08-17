import Image from "next/image";
import dynamic from "next/dynamic";
import HeaderDemo from "../_components/HeaderDemo";
import FeIcon, {
  CATEGORY_LABELS,
  type SocialIconName,
} from "../_components/FeIcon";
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

// Specimen copy is deliberately placeholder: these blocks document layout and
// semantics, not live workshop content. Labels stay real because they define
// the pattern; values do not.
const workshopFacts: { label: string; value: string; illoSrc: string }[] = [
  {
    label: "Location",
    value: "Placeholder venue, Berlin",
    illoSrc: "/illustrations/cloud.svg",
  },
  {
    label: "Dates",
    value: "Placeholder date range",
    illoSrc: "/illustrations/flower.svg",
  },
  {
    label: "Duration",
    value: "Placeholder duration",
    illoSrc: "/illustrations/sprout.svg",
  },
  {
    label: "Group size",
    value: "Placeholder group size",
    illoSrc: "/illustrations/smiley.svg",
  },
  {
    label: "Language",
    value: "Placeholder language",
    illoSrc: "/illustrations/coffee-cup.svg",
  },
  {
    label: "Price",
    value: "From €00 per session",
    illoSrc: "/illustrations/donation-box.svg",
  },
];

const courseSteps = [
  {
    title: "Step One",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel sapien a nulla fermentum tincidunt.",
  },
  {
    title: "Step Two",
    body: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.",
  },
  {
    title: "Step Three",
    body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
  },
  {
    title: "Step Four",
    body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.",
  },
];

const listItems = [
  "List item one",
  "List item two",
  "List item three",
  "List item four",
  "List item five",
];

function SocialIconButton({ name, label }: { name: SocialIconName; label: string }) {
  return (
    <button type="button" className="fe-icon-btn" aria-label={label}>
      <FeIcon set="social" name={name} size="md" />
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
                  <SocialIconButton name="instagram" label="Instagram" />
                  <SocialIconButton name="linkedin" label="LinkedIn" />
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

      <section id="hero-pattern" className="ds-section">
        <h2 className="ds-section-title">Hero with blob photo</h2>
        <div className="ds-pattern-hero-specimen">
          <div>
            <div className="ds-headline-with-underline">
              <h2 className="ds-hero-title">
                {headlineFirst}
                <br />
                {headlineRest.join(" ")}
              </h2>
            </div>
            <p className="ds-intro">{heroCopy.tagline}</p>
            <button type="button" className="fe-btn-primary">
              Explore components
            </button>
          </div>
          <div className="ds-hero-image-wrap">
            <Image
              src="/images/community-cafe-home.png"
              alt="A warm community gathering in a bright cafe."
              width={1090}
              height={1094}
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

      <section id="facts-card" className="ds-section">
        <h2 className="ds-section-title">Workshop facts card</h2>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          The &ldquo;Course Details&rdquo; block from a workshop landing page:
          six label-and-value tiles led by a line illustration, closed by a
          booking action. Marked up as a description list, so each value is
          programmatically tied to its label. Values shown are placeholders.
        </p>
        <div className="fe-facts-card">
          <dl className="fe-facts-card__grid">
            {workshopFacts.map((fact) => (
              <div
                className="fe-facts-card__item"
                key={fact.label}
                style={
                  {
                    "--fe-facts-illo": `url(${fact.illoSrc})`,
                  } as React.CSSProperties
                }
              >
                <dt className="fe-facts-card__label">{fact.label}</dt>
                <dd className="fe-facts-card__value">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="fe-facts-card__cta">
            <button type="button" className="fe-btn-primary">
              Book your spot
            </button>
          </p>
        </div>
      </section>

      <section id="step-progression" className="ds-section">
        <h2 className="ds-section-title">Step progression (week by week)</h2>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          Numbered sequence for multi-week courses. Steps alternate sides on
          desktop with a doodle-arrow connector between them; below 1024px they
          stack in one column and the connectors are dropped.
        </p>
        <ol className="fe-steps">
          {courseSteps.map((step, i) => (
            <li className="fe-step-item" key={step.title}>
              <div className="fe-step">
                <h3 className="fe-step__title fe-h3">
                  <span className="fe-step__number" aria-hidden="true">
                    {i + 1}
                  </span>
                  Week {i + 1}. {step.title}
                </h3>
                <p className="fe-step__body">{step.body}</p>
              </div>
              {i < courseSteps.length - 1 ? (
                <span
                  className="fe-step__connector"
                  style={{
                    maskImage: "url(/illustrations/accents/doodle-arrow.svg)",
                    WebkitMaskImage:
                      "url(/illustrations/accents/doodle-arrow.svg)",
                  }}
                  aria-hidden="true"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section id="split-list-band" className="ds-section">
        <h2 className="ds-section-title">Split list band</h2>
        <p className="fe-body" style={{ marginBottom: "var(--spacing-4)" }}>
          Heading on the left, checked list on the right, on the decorative soft
          background. Used for &ldquo;Who is this for&rdquo;, &ldquo;What you
          will learn&rdquo;, and &ldquo;Everything you need is included&rdquo;.
          Pass two columns when the items are short labels.
        </p>
        <div className="fe-split-list">
          <h3 className="fe-split-list__heading fe-h3">Section Heading</h3>
          <div>
            <p className="fe-split-list__lead">Placeholder lead line.</p>
            <ul className="fe-split-list__items">
              {listItems.map((item) => (
                <li className="fe-split-list__item" key={item}>
                  <FeIcon set="ui" name="check" size="sm" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
