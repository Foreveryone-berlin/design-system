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
    const isInputVisible = () => {
      const input = inputRef.current;
      return Boolean(input && input.offsetParent !== null);
    };

    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if (!isInputVisible()) return;
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

    const hashIndex = entry.href.indexOf("#");
    const path = hashIndex === -1 ? entry.href : entry.href.slice(0, hashIndex);
    const hash = hashIndex === -1 ? "" : entry.href.slice(hashIndex + 1);

    router.push(path);

    if (!hash) return;

    // Heading IDs are assigned on the destination page after mount. Wait for
    // the target, scroll/focus, then reflect the hash with replaceState so back
    // through the sidebar does not stop on intermediate hash-only entries.
    let frames = 0;
    const findAndScroll = () => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ block: "start" });
        if (!target.hasAttribute("tabindex"))
          target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        history.replaceState(null, "", `${path}#${hash}`);
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

  const statusMessage =
    open && query.trim()
      ? results.length > 0
        ? `${results.length} result${results.length === 1 ? "" : "s"}`
        : "No results"
      : "";

  return (
    <div className="ds-search">
      <span aria-live="polite" className="fe-visually-hidden">
        {statusMessage}
      </span>
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
