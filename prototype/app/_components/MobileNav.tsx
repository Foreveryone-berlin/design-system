"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navSections = [
  { href: "/", label: "Overview" },
  { href: "/tokens", label: "Tokens" },
  { href: "/components", label: "Components" },
  { href: "/patterns", label: "Patterns" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
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
        type="button"
        className="ds-mobile-header__toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        {open ? "\u2715" : "\u2630"}
      </button>
      {open && (
        <nav className="ds-mobile-nav" aria-label="Design system">
          {navSections.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
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
