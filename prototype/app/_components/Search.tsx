"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchDocs, type SearchEntry } from "./search-index";

export default function Search({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const results: SearchEntry[] = open ? searchDocs(query) : [];

  // Global shortcut: "/" or Cmd/Ctrl+K focuses the search input.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key === "k")) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setActive(0);
  }, [query]);

  function go(entry: SearchEntry | undefined) {
    if (!entry) return;
    setOpen(false);
    setQuery("");
    onNavigate?.();
    router.push(entry.href);

    // The heading IDs are assigned on the destination page by OnThisPage's
    // mount effect, so the #hash target does not exist yet when router.push
    // runs (and Next's client navigation does not scroll to the hash on its
    // own). Wait for the element to appear, then scroll to it and move focus
    // there for keyboard users. scroll-margin-top on the headings clears the
    // sticky header; prefers-reduced-motion is honoured via scroll-behavior in
    // globals.css.
    const hash = entry.href.split("#")[1];
    if (!hash) return;
    let frames = 0;
    const findAndScroll = () => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ block: "start" });
        if (!target.hasAttribute("tabindex"))
          target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        return;
      }
      if (frames++ < 40) requestAnimationFrame(findAndScroll);
    };
    requestAnimationFrame(findAndScroll);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    }
  }

  const optionId = (i: number) => `${listId}-opt-${i}`;

  return (
    <div className="ds-search">
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open && results.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          open && results.length ? optionId(active) : undefined
        }
        aria-label="Search the design system"
        placeholder="Search…"
        className="ds-search__input"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          // Delay so a click on a result registers before the list closes.
          window.setTimeout(() => setOpen(false), 120);
        }}
        onKeyDown={onKeyDown}
      />
      {open && results.length > 0 && (
        <ul id={listId} role="listbox" className="ds-search__results">
          {results.map((entry, i) => (
            <li
              key={entry.href}
              id={optionId(i)}
              role="option"
              aria-selected={i === active}
              className={`ds-search__result${
                i === active ? " is-active" : ""
              }`}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                // mousedown fires before blur, so the navigation still runs.
                e.preventDefault();
                go(entry);
              }}
            >
              <span className="ds-search__result-title">{entry.title}</span>
              {entry.section && (
                <span className="ds-search__result-section">
                  {entry.section}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
