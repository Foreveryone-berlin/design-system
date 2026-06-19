"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { slugify } from "./slugify";

type Heading = { id: string; text: string; level: 2 | 3 };

export default function OnThisPage() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    const nodes = Array.from(
      main.querySelectorAll<HTMLElement>(
        "h2.ds-section-title, h3.ds-subsection-title",
      ),
    );

    const used = new Set<string>();
    const collected: Heading[] = nodes.map((node) => {
      let id = node.id || slugify(node.textContent ?? "");
      if (!id) id = "section";
      let unique = id;
      let n = 2;
      while (used.has(unique)) unique = `${id}-${n++}`;
      used.add(unique);
      node.id = unique;
      return {
        id: unique,
        text: node.textContent ?? "",
        level: node.tagName === "H3" ? 3 : 2,
      };
    });

    setHeadings(collected);
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

  function handleClick(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }

  if (pathname === "/" || headings.length < 2) return null;

  return (
    <aside className="ds-on-this-page" aria-labelledby="ds-otp-title">
      <p id="ds-otp-title" className="ds-on-this-page__title">
        On this page
      </p>
      <nav aria-label="On this page">
        <ul className="ds-on-this-page__list">
          {headings.map((h) => (
            <li
              key={h.id}
              className={`ds-on-this-page__item${
                h.level === 3 ? " ds-on-this-page__item--sub" : ""
              }`}
            >
              <a
                href={`#${h.id}`}
                className={`ds-on-this-page__link${
                  activeId === h.id ? " is-active" : ""
                }`}
                aria-current={activeId === h.id ? "page" : undefined}
                onClick={() => handleClick(h.id)}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
