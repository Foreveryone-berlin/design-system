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
              <a href="#workshops" className="fe-nav-link">Workshops</a>
              <a href="#about" className="fe-nav-link">About Us &#x2304;</a>
              <a href="#cafe" className="fe-nav-link">Community Cafe</a>
              <a href="#blog" className="fe-nav-link">Blog</a>
              <a href="#support" className="fe-nav-link">Support &#x2304;</a>
              <a href="#contact" className="fe-nav-link">Contact</a>
            </nav>
            <div className="fe-header__actions">
              <button type="button" className="fe-icon-btn" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                </svg>
              </button>
              <button type="button" className="fe-header__menu-btn" aria-label="Menu">&#x2630;</button>
              <a href="#book" className="fe-btn-primary fe-header__cta">Book a Workshop &rarr;</a>
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
          Mobile: logo + icon button + hamburger (blue). Desktop: nav links + CTA.
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
                  <button type="button" className="fe-btn-primary">Subscribe</button>
                </div>
                <div className="fe-footer__social">
                  <button type="button" className="fe-icon-btn" aria-label="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07z" />
                    </svg>
                  </button>
                  <button type="button" className="fe-icon-btn" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
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
              style={{ margin: 0, fontSize: "var(--font-size-sm)", color: "var(--color-neutral-700)" }}
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

      <section className="ds-section" aria-hidden="true">
        <h2 className="ds-section-title">Wave section</h2>
        <div className="ds-wave-section" style={{ margin: 0 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80 Q300 20 600 80 T1200 80 V120 H0 Z" />
          </svg>
        </div>
      </section>
    </>
  );
}
