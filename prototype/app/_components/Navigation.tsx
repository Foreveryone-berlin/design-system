"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navSections = [
  { href: "/", label: "Overview" },
  { href: "/tokens", label: "Tokens" },
  { href: "/components", label: "Components" },
  { href: "/patterns", label: "Patterns" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <aside className="ds-sidebar" suppressHydrationWarning>
      <div className="ds-sidebar__header">
        <Link href="/" className="ds-sidebar__logo">
          ForEveryone
        </Link>
        <span className="ds-sidebar__badge">Design System</span>
      </div>
      <nav className="ds-sidebar__nav" aria-label="Design system">
        {navSections.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`ds-sidebar__link${pathname === href ? " is-active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
