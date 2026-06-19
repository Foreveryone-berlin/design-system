"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navGroups, overviewLink } from "./nav-sections";
import Search from "./Search";

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
      <Search />
      <nav className="ds-sidebar__nav" aria-label="Design system">
        <Link
          href={overviewLink.href}
          aria-current={pathname === overviewLink.href ? "page" : undefined}
          className={`ds-sidebar__link${
            pathname === overviewLink.href ? " is-active" : ""
          }`}
        >
          {overviewLink.label}
        </Link>
        {navGroups.map((group) => (
          <div className="ds-sidebar__group" key={group.label}>
            <p className="ds-sidebar__group-title" aria-hidden="true">
              {group.label}
            </p>
            <ul
              className="ds-sidebar__group-list"
              aria-label={group.label}
            >
              {group.links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                    className={`ds-sidebar__link ds-sidebar__link--child${
                      pathname === href ? " is-active" : ""
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
