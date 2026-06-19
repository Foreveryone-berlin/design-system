import Image from "next/image";
import HeaderDemo from "../_components/HeaderDemo";
import CategoryIcon from "../_components/CategoryIcon";

// Check-circle used on the workshop-card date row (per Figma), inline so it
// inherits currentColor and the system's 24x24 / stroke-2 geometry.
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

// Three distinct upcoming-workshop cards, each with its own photo, category,
// and details, so the grid reads as a real programme rather than one repeated
// card. Photos are ForEveryone workshop images, resized and cropped to the
// card ratio; see prototype/public/images/ASSETS.md.
const upcomingWorkshops = [
  {
    image: "/images/workshop-pottery.jpg",
    alt: "People shaping clay together at a table in a bright art studio.",
    category: "arts-crafts" as const,
    categoryLabel: "Arts and Crafts",
    spots: "3 free spots",
    date: "Sunday, Sept 15 · 14:00–17:00",
    title: "Pottery and Clay Morning",
    blurb: "A hands-on, welcoming clay session for all levels. No experience needed.",
    price: "From €10",
  },
  {
    image: "/images/workshop-movement.jpg",
    alt: "A group seated in a circle on a wooden floor during a movement session.",
    category: "movement" as const,
    categoryLabel: "Movement",
    spots: "5 free spots",
    date: "Tuesday, Sept 17 · 18:30–20:00",
    title: "Somatic Movement Workshop",
    blurb: "Gentle, guided movement to reconnect with the body. All bodies welcome.",
    price: "From €8",
  },
  {
    image: "/images/workshop-drawing.jpg",
    alt: "People holding up colourful portrait drawings at an outdoor table.",
    category: "expression" as const,
    categoryLabel: "Expression",
    spots: "2 free spots",
    date: "Saturday, Sept 21 · 11:00–13:00",
    title: "Drawing and Expression",
    blurb: "Playful portrait drawing in the open air. Bring yourself, we bring the rest.",
    price: "Free",
  },
];

export default function PatternsPage() {
  return (
    <>
      <h1 className="ds-page-title">Patterns</h1>
      <p className="ds-intro">
        Composite UI patterns that combine tokens and components into reusable
        layouts: headers, footers, workshop cards, and more.
      </p>
      <p
        className="fe-body"
        style={{
          fontSize: "var(--font-size-sm)",
          color: "var(--color-theme-8)",
        }}
      >
        The header and footer below are structural examples with placeholder
        content, showing the reusable shape rather than any specific site.
      </p>

      <section id="header-pattern" className="ds-section">
        <h2 className="ds-section-title">Header (desktop &amp; mobile)</h2>
        <HeaderDemo />
        <p
          className="fe-body"
          style={{
            marginTop: "var(--spacing-4)",
            fontSize: "var(--font-size-sm)",
            color: "var(--color-theme-8)",
          }}
        >
          Mobile: logo + hamburger. Desktop: nav links, dropdowns, and a CTA
          slot.
        </p>
      </section>

      <section id="footer-pattern" className="ds-section">
        <h2 className="ds-section-title">Footer</h2>
        <footer className="fe-footer">
          <div className="fe-footer__inner">
            <p className="fe-footer__brand">
              {/* Generic logo placeholder: the pattern shows the slot, not a brand. */}
              <span className="ds-logo-placeholder" aria-label="Logo">
                Logo
              </span>
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
                <p className="fe-body" style={{ marginTop: "var(--spacing-2)", fontSize: "var(--font-size-sm)" }}>
                  123 Example Street, City
                </p>
              </div>
              <div className="fe-footer__column">
                <p className="fe-body" style={{ marginBottom: "var(--spacing-4)", fontSize: "var(--font-size-sm)" }}>
                  Sign up for occasional updates.
                </p>
                <div className="fe-footer__newsletter">
                  <input type="email" className="fe-input" placeholder="Your email" aria-label="Email" />
                  <button type="button" className="ds-btn ds-btn--primary">Subscribe</button>
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

      <section id="workshop-card" className="ds-section">
        <h2 className="ds-section-title">Workshop card (full)</h2>
        {/* Pad the wrapper so the card's hover-lift shadow clears the section's
            overflow:hidden clip. */}
        <div style={{ padding: "var(--spacing-2)", maxWidth: "23rem" }}>
        <div className="fe-card" style={{ maxWidth: "22rem" }}>
          <div className="fe-card__media">
            <Image
              src="/images/workshop-group.jpg"
              alt="Community members laughing around a table in the ForEveryone cafe"
              width={360}
              height={225}
              sizes="360px"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
            <span className="fe-card-badge">2 free spots</span>
            <span className="fe-card-category">
              <span className="fe-card-category__icon" aria-hidden="true">
                <CategoryIcon name="wellness" />
              </span>
              Balance and Wellness
            </span>
          </div>
          <div className="fe-card__body">
            <div className="fe-card-meta">
              <CheckCircle /> Sunday, Sept 15 &middot; 14:00–17:00
            </div>
            <h3 className="fe-h3" style={{ margin: "0 0 var(--spacing-2)" }}>
              Pottery Workshop
            </h3>
            <p
              className="fe-body"
              style={{ margin: 0, fontSize: "var(--font-size-sm)", color: "var(--color-brand-dark)" }}
            >
              A hands-on, welcoming clay workshop for all levels. No experience needed.
            </p>
            <div className="fe-card-price" style={{ justifyContent: "flex-end" }}>
              <a href="#book" className="fe-btn-secondary">Book Workshop &rarr;</a>
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
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span className="fe-card-badge">{w.spots}</span>
                <span className="fe-card-category">
                  <span className="fe-card-category__icon" aria-hidden="true">
                    <CategoryIcon name={w.category} />
                  </span>
                  {w.categoryLabel}
                </span>
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
              <h3 className="fe-h3" style={{ margin: "0 0 var(--spacing-2)" }}>Meet People Offline</h3>
              <p className="fe-body" style={{ margin: 0 }}>
                A safe space to make genuine, real-life connections.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="fe-card-benefit__illustration"
              src="/illustrations/flower.png"
              alt=""
              width={96}
              height={96}
              aria-hidden="true"
            />
          </div>
          <div className="fe-card-get-involved">
            <div className="fe-card-get-involved__content">
              <h3 className="fe-card-get-involved__title">Lead a Workshop or Event</h3>
              <p className="fe-card-get-involved__body">
                Help locals and internationals find belonging by sharing your hobby.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="fe-card-benefit__illustration"
              src="/illustrations/smiley.png"
              alt=""
              width={96}
              height={96}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>
    </>
  );
}
