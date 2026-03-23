"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ViewTransitions() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const page = document.querySelector<HTMLElement>(".ds-page");
    if (!page) return;

    page.style.animation = "none";
    page.offsetHeight; // force reflow
    page.style.animation = "";
    page.classList.add("vt-fade-in");

    const cleanup = () => page.classList.remove("vt-fade-in");
    page.addEventListener("animationend", cleanup, { once: true });
    return () => {
      page.removeEventListener("animationend", cleanup);
      page.classList.remove("vt-fade-in");
    };
  }, [pathname]);

  return null;
}
