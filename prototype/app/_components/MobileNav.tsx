"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navGroups, overviewLink } from "./nav-sections";
import Search from "./Search";

const MOBILE_QUERY = "(max-width: 47.99rem)";

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const syncViewport = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    syncViewport(media);
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    if (!isMobile && open) setOpen(false);
  }, [isMobile, open]);

  useEffect(() => {
    if (!open || !isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const layout = document.querySelector(".ds-layout");
    layout?.setAttribute("inert", "");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      layout?.removeAttribute("inert");
    };
  }, [open, isMobile]);

  return (
    <header className="ds-mobile-header" suppressHydrationWarning>
      <Link href="/" className="ds-mobile-header__logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/foreveryone-logo.png"
          alt="ForEveryone"
          width={120}
          height={22}
        />
      </Link>
      <button
        ref={toggleRef}
        type="button"
        className={`fe-header__menu-btn${open ? " is-open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="ds-mobile-nav"
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        <span className="fe-hamburger" aria-hidden="true">
          <span className="fe-hamburger__line" />
          <span className="fe-hamburger__line" />
          <span className="fe-hamburger__line" />
        </span>
      </button>
      {open && (
        <nav
          ref={navRef}
          id="ds-mobile-nav"
          className="ds-mobile-nav"
          aria-label="Design system"
        >
          <Search onNavigate={() => setOpen(false)} />
          <Link
            href={overviewLink.href}
            aria-current={pathname === overviewLink.href ? "page" : undefined}
            className={`ds-mobile-nav__link${
              pathname === overviewLink.href ? " is-active" : ""
            }`}
            onClick={() => setOpen(false)}
          >
            {overviewLink.label}
          </Link>
          {navGroups.map((group) => {
            // Open the group that contains the current page; collapse the rest
            // so the nav is short on a phone.
            const hasActive = group.links.some((l) => l.href === pathname);
            return (
              <details
                className="ds-mobile-nav__group"
                key={group.label}
                open={hasActive}
              >
                <summary className="ds-mobile-nav__group-title">
                  {group.label}
                  <svg
                    className="ds-mobile-nav__group-chevron"
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
                </summary>
                <ul
                  className="ds-mobile-nav__group-list"
                  aria-label={group.label}
                >
                  {group.links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={pathname === href ? "page" : undefined}
                        className={`ds-mobile-nav__link ds-mobile-nav__link--child${
                          pathname === href ? " is-active" : ""
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
        </nav>
      )}
    </header>
  );
}
