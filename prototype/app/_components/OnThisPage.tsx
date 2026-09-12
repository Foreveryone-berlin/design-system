"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { collectPageHeadings } from "./page-headings";

type Heading = { id: string; text: string; level: 2 | 3 };

export default function OnThisPage() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const compactRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    const collected = collectPageHeadings(main);
    const nodes = collected.map((h) => h.node);

    setHeadings(
      collected.map(({ id, text, level }) => ({ id, text, level })),
    );
    setActiveId(collected[0]?.id ?? "");

    if (collected.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);

  function handleClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    closeCompact: boolean,
  ) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ block: "start" });
    history.replaceState(null, "", `#${id}`);
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    // Compact disclosure: collapse after a jump so the stuck bar does not
    // cover the section the user just navigated to.
    if (closeCompact && compactRef.current?.open) {
      compactRef.current.open = false;
    }
  }

  if (pathname === "/" || headings.length < 2) return null;

  const list = (idPrefix: string, closeCompact: boolean) => (
    <nav aria-label="On this page">
      <ul className="ds-on-this-page__list">
        {headings.map((h) => (
          <li
            key={`${idPrefix}-${h.id}`}
            className={`ds-on-this-page__item${
              h.level === 3 ? " ds-on-this-page__item--sub" : ""
            }`}
          >
            <a
              href={`#${h.id}`}
              className={`ds-on-this-page__link${
                activeId === h.id ? " is-active" : ""
              }`}
              aria-current={activeId === h.id ? "location" : undefined}
              onClick={(event) => handleClick(event, h.id, closeCompact)}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  // Compact disclosure for narrow viewports (CSS shows it below 1200px and
  // stacks it above main). Sticky rail for wide viewports. Two trees so the
  // rail never depends on <details open> hydration.
  return (
    <>
      <details
        ref={compactRef}
        className="ds-on-this-page ds-on-this-page--compact"
      >
        <summary className="ds-on-this-page__title">On this page</summary>
        {list("compact", true)}
      </details>
      <aside
        className="ds-on-this-page ds-on-this-page--rail"
        aria-labelledby="ds-otp-title"
      >
        <p id="ds-otp-title" className="ds-on-this-page__title">
          On this page
        </p>
        {list("rail", false)}
      </aside>
    </>
  );
}
