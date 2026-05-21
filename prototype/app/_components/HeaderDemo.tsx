"use client";

import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const navLinks: NavItem[] = [
  { href: "#workshops", label: "Workshops" },
  {
    href: "#eu-projects",
    label: "EU Projects",
    children: [
      { href: "#what-we-do", label: "What We Do" },
      { href: "#toolbox", label: "Toolbox For Integration" },
      { href: "#peer-support", label: "Peer Support & Resilience" },
    ],
  },
  {
    href: "#about",
    label: "About Us",
    children: [
      { href: "#foreveryone", label: "ForEveryone" },
      { href: "#partnerships", label: "Partnerships" },
      { href: "#volunteer", label: "Volunteer" },
    ],
  },
  { href: "#cafe", label: "Cafe" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function HeaderDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleSub = (href: string) =>
    setOpenSub((prev) => (prev === href ? null : href));

  return (
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
          {navLinks.map(({ href, label, children }) =>
            children ? (
              <div key={href} style={{ position: "relative" }}>
                <button
                  type="button"
                  className="fe-nav-link fe-header__dropdown-trigger"
                  onClick={() => toggleSub(href)}
                  aria-expanded={openSub === href}
                >
                  {label}{" "}
                  <span aria-hidden="true">
                    {openSub === href ? "\u25B2" : "\u25BC"}
                  </span>
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
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen(!menuOpen);
              setOpenSub(null);
            }}
          >
            <span className="fe-hamburger">
              <span className="fe-hamburger__line" />
              <span className="fe-hamburger__line" />
              <span className="fe-hamburger__line" />
            </span>
          </button>
          <a href="#book" className="ds-btn ds-btn--primary fe-header__cta">
            Book a Workshop &rarr;
          </a>
        </div>
      </div>
      <nav
        className={`fe-header__mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-label="Main"
        aria-hidden={!menuOpen}
      >
          {navLinks.map(({ href, label, children }) =>
            children ? (
              <div key={href}>
                <button
                  type="button"
                  className="fe-nav-link fe-header__dropdown-trigger"
                  onClick={() => toggleSub(href)}
                  aria-expanded={openSub === href}
                >
                  {label}{" "}
                  <span aria-hidden="true">
                    {openSub === href ? "\u25B2" : "\u25BC"}
                  </span>
                </button>
                {openSub === href && (
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
            className="ds-btn ds-btn--primary"
            style={{ marginTop: "var(--spacing-2)", alignSelf: "flex-start" }}
            onClick={() => setMenuOpen(false)}
          >
            Book a Workshop &rarr;
          </a>
      </nav>
    </div>
  );
}
