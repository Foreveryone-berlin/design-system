"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navSections = [
  { href: "/", label: "Overview" },
  { href: "/brand", label: "Brand & Voice" },
  { href: "/logo", label: "Logo" },
  { href: "/foundations", label: "Foundations" },
  { href: "/components", label: "Components" },
  { href: "/patterns", label: "Patterns" },
  { href: "/guidelines", label: "Guidelines" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/governance", label: "Governance" },
  { href: "/credits", label: "Credits" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <aside className="ds-sidebar" suppressHydrationWarning>
      <div className="ds-sidebar__header">
        <Link href="/" className="ds-sidebar__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/foreveryone-logo.png"
            alt="ForEveryone"
            width={120}
            height={22}
          />
        </Link>
        <span className="ds-sidebar__badge">Design System</span>
      </div>
      <nav className="ds-sidebar__nav" aria-label="Design system">
        {navSections.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            className={`ds-sidebar__link${pathname === href ? " is-active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
