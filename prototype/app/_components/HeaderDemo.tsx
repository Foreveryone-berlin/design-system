"use client";

import { useEffect, useRef, useState } from "react";

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

// Mirrors the live foreveryone.berlin primary nav (Elementor menu), including
// the two dropdowns. "Book a Workshop" renders as the CTA below.
const navLinks: NavItem[] = [
  { href: "#workshops", label: "Workshops" },
  {
    href: "#eu-projects",
    label: "EU Projects",
    children: [
      { href: "#what-we-do", label: "What We Do" },
      { href: "#toolbox", label: "Toolbox For Integration" },
      { href: "#peer-support", label: "Peer Support & Resilience" },
      { href: "#sheleads", label: "SheLeads" },
    ],
  },
  {
    href: "#community",
    label: "Community",
    children: [
      { href: "#about", label: "About Us" },
      { href: "#partnerships", label: "Partnerships" },
      { href: "#events", label: "Events" },
      { href: "#volunteer", label: "Volunteer" },
      { href: "#contact", label: "Contact" },
    ],
  },
  { href: "#cafe", label: "Cafe" },
  { href: "#blog", label: "Blog" },
];

export default function HeaderDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [openSubMobile, setOpenSubMobile] = useState<string | null>(null);
  const desktopNavRef = useRef<HTMLElement>(null);

  // Close the desktop dropdown when clicking outside the nav. Attached only
  // while a dropdown is open, and after the opening click has completed, so it
  // never interferes with the trigger's own toggle.
  useEffect(() => {
    if (!openSub) return;
    const handleDocumentClick = (event: MouseEvent) => {
      const nav = desktopNavRef.current;
      if (nav && !nav.contains(event.target as Node)) {
        setOpenSub(null);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [openSub]);

  const toggleSub = (href: string) =>
    setOpenSub((prev) => (prev === href ? null : href));
  const toggleSubMobile = (href: string) =>
    setOpenSubMobile((prev) => (prev === href ? null : href));

  return (
    <div className="fe-header">
      <div className="fe-header__inner">
        <div className="fe-header__logo">
          {/* Same brand mark as the design-system header (Navigation/MobileNav). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/foreveryone-logo.png"
            alt="ForEveryone"
            width={120}
            height={22}
          />
        </div>
        <nav className="fe-header__nav" aria-label="Main" ref={desktopNavRef}>
          {navLinks.map(({ href, label, children }) =>
            children ? (
              <div key={href} style={{ position: "relative" }}>
                <button
                  type="button"
                  className="fe-nav-link fe-header__dropdown-trigger"
                  onClick={() => toggleSub(href)}
                  aria-expanded={openSub === href}
                  aria-haspopup="true"
                >
                  {label}
                  <svg
                    className={`fe-nav-chevron${openSub === href ? " is-open" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openSub === href && (
                  <div className="fe-header__dropdown">
                    {children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="fe-nav-link"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a key={href} href={href} className="fe-nav-link">
                {label}
              </a>
            ),
          )}
        </nav>
        <div className="fe-header__actions">
          <button
            type="button"
            className={`fe-header__menu-btn${menuOpen ? " is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="fe-header-mobile-nav"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setOpenSubMobile(null);
            }}
          >
            <span className="fe-hamburger">
              <span className="fe-hamburger__line" />
              <span className="fe-hamburger__line" />
              <span className="fe-hamburger__line" />
            </span>
          </button>
          <a href="#book" className="ds-btn ds-btn--primary fe-header__cta">
            Book a Workshop
          </a>
        </div>
      </div>
      <nav
        id="fe-header-mobile-nav"
        className={`fe-header__mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-label="Main"
        inert={!menuOpen}
      >
          {navLinks.map(({ href, label, children }) =>
            children ? (
              <div key={href}>
                <button
                  type="button"
                  className="fe-nav-link fe-header__dropdown-trigger"
                  onClick={() => toggleSubMobile(href)}
                  aria-expanded={openSubMobile === href}
                  aria-haspopup="true"
                >
                  {label}
                  <svg
                    className={`fe-nav-chevron${openSubMobile === href ? " is-open" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openSubMobile === href && (
                  <div className="fe-header__mobile-sub">
                    {children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="fe-nav-link"
                        onClick={() => setMenuOpen(false)}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={href}
                href={href}
                className="fe-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ),
          )}
          <a
            href="#book"
            className="ds-btn ds-btn--primary fe-header__mobile-cta"
            onClick={() => setMenuOpen(false)}
          >
            Book a Workshop
          </a>
      </nav>
    </div>
  );
}
