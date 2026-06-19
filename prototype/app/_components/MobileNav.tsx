"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { navGroups, overviewLink } from "./nav-sections";
import Search from "./Search";

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
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
  }, [open]);

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
          {navGroups.map((group) => (
            <div className="ds-mobile-nav__group" key={group.label}>
              <p className="ds-mobile-nav__group-title" aria-hidden="true">
                {group.label}
              </p>
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
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
