import Image from "next/image";
import HeaderDemo from "../_components/HeaderDemo";
import CategoryIcon from "../_components/CategoryIcon";
import ObfuscatedEmail from "../_components/ObfuscatedEmail";

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

export default function PatternsPage() {
  return (
    <>
      <h1 className="ds-page-title">Patterns</h1>
      <p className="ds-intro">
        Composite UI patterns that combine tokens and components into reusable
        layouts — headers, footers, workshop cards, and more.
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
          Mobile: logo + hamburger (blue). Desktop: nav links + CTA.
        </p>
      </section>

      <section id="footer-pattern" className="ds-section">
        <h2 className="ds-section-title">Footer</h2>
        <footer className="fe-footer">
          <div className="fe-footer__inner">
            <p className="fe-footer__brand">ForEveryone</p>
            <div className="fe-footer__grid">
              <div className="fe-footer__column">
                <p className="fe-footer__column-title">Explore</p>
                <ul>
                  <li><a href="#w" className="fe-nav-link">Workshops</a></li>
                  <li><a href="#a" className="fe-nav-link">About Us</a></li>
                  <li><a href="#c" className="fe-nav-link">Community Cafe</a></li>
                  <li><a href="#i" className="fe-nav-link">Impact</a></li>
                  <li><a href="#b" className="fe-nav-link">Blog</a></li>
                </ul>
              </div>
              <div className="fe-footer__column">
                <p className="fe-footer__column-title">Support</p>
                <ul>
                  <li><a href="#g" className="fe-nav-link">Get Involved</a></li>
                  <li><a href="#p" className="fe-nav-link">Partner with Us</a></li>
                  <li><a href="#m" className="fe-nav-link">Press &amp; Media</a></li>
                </ul>
              </div>
              <div className="fe-footer__column">
                <p className="fe-footer__column-title">Contact</p>
                <ObfuscatedEmail />
                <p className="fe-body" style={{ marginTop: "var(--spacing-2)", fontSize: "var(--font-size-sm)" }}>
                  Boxhagener Platz, 10245 Berlin
                </p>
              </div>
              <div className="fe-footer__column">
                <p className="fe-body" style={{ marginBottom: "var(--spacing-4)", fontSize: "var(--font-size-sm)" }}>
                  Not your average newsletter: heartfelt, human, happy.
                </p>
                <div className="fe-footer__newsletter">
                  <input type="email" className="fe-input" placeholder="Your email" aria-label="Email" />
                  <button type="button" className="ds-btn ds-btn--primary">Subscribe</button>
                </div>
              </div>
            </div>
            <div className="fe-footer__bottom">
              <span>&copy; 2025 ForEveryone. All rights reserved.</span>
              <div className="fe-footer__legal">
                <a href="#privacy">Privacy</a>
                <a href="#impressum">Impressum</a>
              </div>
            </div>
          </div>
        </footer>
      </section>

      <section id="workshop-card" className="ds-section">
        <h2 className="ds-section-title">Workshop card (full)</h2>
        <div className="fe-card" style={{ maxWidth: "360px" }}>
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
              A hands-on, welcoming clay workshop for all levels — no experience needed!
            </p>
            <div className="fe-card-price">
              <span className="fe-card-price__amount">From &euro;10</span>
              <a href="#book" className="fe-btn-primary">Book Now &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="ds-section">
        <h2 className="ds-section-title">Upcoming events</h2>
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
          {[0, 1, 2].map((n) => (
            <div className="fe-card" key={n}>
              <div className="fe-card__media">
                <Image
                  src="/images/workshop-group.jpg"
                  alt="Community members at a ForEveryone workshop"
                  width={360}
                  height={200}
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                  Fluentbody: A Somatic Movement Workshop
                </h3>
                <p
                  className="fe-body"
                  style={{
                    margin: 0,
                    fontSize: "var(--font-size-sm)",
                    color: "var(--color-brand-dark)",
                  }}
                >
                  A hands-on, welcoming workshop for all levels. No experience
                  needed.
                </p>
                <div className="fe-card-price">
                  <a href="#join" className="fe-btn-primary">
                    Join For Free &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "var(--spacing-6)", textAlign: "center" }}>
          <a href="#all-events" className="ds-btn ds-btn--secondary">
            Explore all events
          </a>
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
