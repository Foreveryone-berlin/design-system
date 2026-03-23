import HeaderDemo from "../_components/HeaderDemo";

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
            <div className="fe-footer__grid">
              <div className="fe-footer__column">
                <div style={{ fontWeight: "var(--font-weight-bold)", marginBottom: "var(--spacing-4)" }}>
                  For Everyone
                </div>
                <p className="fe-label" style={{ marginBottom: "var(--spacing-2)" }}>Explore</p>
                <ul>
                  <li><a href="#w" className="fe-nav-link">Workshops</a></li>
                  <li><a href="#a" className="fe-nav-link">About Us</a></li>
                  <li><a href="#c" className="fe-nav-link">Community Cafe</a></li>
                  <li><a href="#i" className="fe-nav-link">Impact</a></li>
                  <li><a href="#b" className="fe-nav-link">Blog</a></li>
                </ul>
              </div>
              <div className="fe-footer__column">
                <p className="fe-label" style={{ marginBottom: "var(--spacing-2)" }}>Support</p>
                <ul>
                  <li><a href="#g" className="fe-nav-link">Get Involved</a></li>
                  <li><a href="#p" className="fe-nav-link">Partner with Us</a></li>
                  <li><a href="#m" className="fe-nav-link">Press &amp; Media</a></li>
                </ul>
              </div>
              <div className="fe-footer__column">
                <p className="fe-label" style={{ marginBottom: "var(--spacing-2)" }}>Contact</p>
                <p className="fe-body" style={{ margin: 0, fontSize: "var(--font-size-sm)" }}>
                  info@wellbeing4everyone.com
                </p>
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
                <a href="#terms">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </section>

      <section id="workshop-card" className="ds-section">
        <h2 className="ds-section-title">Workshop card (full)</h2>
        <div className="fe-card" style={{ maxWidth: "360px" }}>
          <div className="fe-card__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero.png"
              alt=""
              width={360}
              height={225}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", transform: "scale(1.25)" }}
            />
            <span className="fe-card-badge">2 free spots</span>
            <span className="fe-card-category">Balance and Wellness</span>
          </div>
          <div className="fe-card__body">
            <div className="fe-card-meta">
              <span aria-hidden="true">&#x1F550;</span> Sunday, Sept 15 &middot; 14:00–17:00
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

      <section id="benefit-cards" className="ds-section">
        <h2 className="ds-section-title">Card benefit &amp; get involved</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
          <div className="fe-card-benefit">
            <h3 className="fe-h3" style={{ margin: "0 0 var(--spacing-2)" }}>Meet People Offline</h3>
            <p className="fe-body" style={{ margin: 0 }}>
              A safe space to make genuine, real-life connections.
            </p>
          </div>
          <div className="fe-card-get-involved">
            <div className="fe-card-get-involved__content">
              <h3 className="fe-card-get-involved__title">Lead a Workshop or Event</h3>
              <p className="fe-card-get-involved__body">
                Help locals and internationals find belonging by sharing your hobby.
              </p>
            </div>
            <div className="fe-card-get-involved__icon" aria-hidden="true">&#x1F3AD;</div>
          </div>
        </div>
      </section>
    </>
  );
}
