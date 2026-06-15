"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navSections = [
  { href: "/", label: "Overview" },
  { href: "/foundations", label: "Foundations" },
  { href: "/components", label: "Components" },
  { href: "/patterns", label: "Patterns" },
  { href: "/guidelines", label: "Guidelines" },
  { href: "/governance", label: "Governance" },
];

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
        className="ds-mobile-header__toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="ds-mobile-nav"
        aria-label={open ? "Close navigation" : "Open navigation"}
      >
        <span aria-hidden="true">{open ? "✕" : "☰"}</span>
      </button>
      {open && (
        <nav
          ref={navRef}
          id="ds-mobile-nav"
          className="ds-mobile-nav"
          aria-label="Design system"
        >
          {navSections.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`ds-mobile-nav__link${pathname === href ? " is-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
