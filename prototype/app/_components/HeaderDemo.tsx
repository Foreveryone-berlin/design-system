"use client";

import { useEffect, useRef, useState } from "react";
import FeIcon from "./FeIcon";

interface NavItem {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

// A content-agnostic header pattern showing the reusable structure: logo slot,
// primary nav with a flat link and two dropdown menus, mobile toggle, and a CTA
// slot. Labels are generic placeholders on purpose so the pattern reads as
// reusable shape, not a specific site's information architecture.
const navLinks: NavItem[] = [
  { href: "#link-1", label: "Link" },
  {
    href: "#link-2",
    label: "Submenu",
    children: [
      { href: "#item-1", label: "Item" },
      { href: "#item-2", label: "Item" },
      { href: "#item-3", label: "Item" },
      { href: "#item-4", label: "Item" },
    ],
  },
  {
    href: "#link-3",
    label: "Submenu",
    children: [
      { href: "#sub-1", label: "Item" },
      { href: "#sub-2", label: "Item" },
      { href: "#sub-3", label: "Item" },
    ],
  },
  { href: "#link-4", label: "Link" },
  { href: "#link-5", label: "Link" },
];

export default function HeaderDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [openSubMobile, setOpenSubMobile] = useState<string | null>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  const dropdownId = (href: string) =>
    `fe-header-dropdown-${href.replace(/^#/, "")}`;

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenSub(null);
    };
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openSub]);

  useEffect(() => {
    if (menuOpen) {
      mobileNavRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setOpenSubMobile(null);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const toggleSub = (href: string) =>
    setOpenSub((prev) => (prev === href ? null : href));
  const toggleSubMobile = (href: string) =>
    setOpenSubMobile((prev) => (prev === href ? null : href));

  return (
    <div className="fe-header">
      <div className="fe-header__inner">
        <div className="fe-header__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/foreveryone-logo.png"
            alt="ForEveryone"
            width={142}
            height={26}
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
                  aria-controls={dropdownId(href)}
                >
                  {label}
                  <FeIcon
                    set="ui"
                    name="chevron-down"
                    size="md"
                    className={`fe-nav-chevron${openSub === href ? " is-open" : ""}`}
                  />
                </button>
                {openSub === href && (
                  <div
                    id={dropdownId(href)}
                    className="fe-header__dropdown"
                  >
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
            ref={menuBtnRef}
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
            <span className="fe-hamburger" aria-hidden="true">
              <span className="fe-hamburger__line" />
              <span className="fe-hamburger__line" />
              <span className="fe-hamburger__line" />
            </span>
          </button>
          <a href="#cta" className="ds-btn ds-btn--primary fe-header__cta">
            Book workshop
          </a>
        </div>
      </div>
      <nav
        ref={mobileNavRef}
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
                  aria-controls={`${dropdownId(href)}-mobile`}
                >
                  {label}
                  <FeIcon
                    set="ui"
                    name="chevron-down"
                    size="md"
                    className={`fe-nav-chevron${openSubMobile === href ? " is-open" : ""}`}
                  />
                </button>
                {openSubMobile === href && (
                  <div
                    id={`${dropdownId(href)}-mobile`}
                    className="fe-header__mobile-sub"
                  >
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
            href="#cta"
            className="ds-btn ds-btn--primary fe-header__mobile-cta"
            onClick={() => setMenuOpen(false)}
          >
            Book workshop
          </a>
      </nav>
    </div>
  );
}
