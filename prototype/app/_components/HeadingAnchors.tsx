"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  collectPageHeadings,
  ensureHeadingAnchors,
  resetHeadingAnchor,
  setHeadingAnchorCopied,
} from "./page-headings";

export default function HeadingAnchors() {
  const pathname = usePathname();
  const [announcement, setAnnouncement] = useState("");
  const timers = useRef(
    new Map<HTMLAnchorElement, ReturnType<typeof setTimeout>>(),
  );
  const announceTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    const headings = collectPageHeadings(main);
    ensureHeadingAnchors(headings, (_id, anchor, text) => {
      setHeadingAnchorCopied(anchor);
      const prev = timers.current.get(anchor);
      if (prev) clearTimeout(prev);
      timers.current.set(
        anchor,
        setTimeout(() => {
          resetHeadingAnchor(anchor, text);
          timers.current.delete(anchor);
        }, 2000),
      );
      setAnnouncement("Link copied");
      clearTimeout(announceTimer.current);
      announceTimer.current = setTimeout(() => setAnnouncement(""), 2000);
    });

    return () => {
      timers.current.forEach((t) => clearTimeout(t));
      timers.current.clear();
      clearTimeout(announceTimer.current);
    };
  }, [pathname]);

  return (
    <span aria-live="polite" className="ds-visually-hidden">
      {announcement}
    </span>
  );
}
