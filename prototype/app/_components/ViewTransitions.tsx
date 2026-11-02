"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function ViewTransitions() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    /* Firefox: forced reflow + animation restart on route change causes visible flicker */
    if (
      typeof navigator !== "undefined" &&
      navigator.userAgent.includes("Firefox")
    ) {
      return;
    }

    const page = document.querySelector<HTMLElement>(".ds-page");
    if (!page) return;

    page.style.animation = "none";
    page.offsetHeight; // force reflow
    page.style.animation = "";
    page.classList.add("vt-fade-in");

    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.target !== page || event.animationName !== "vt-fade-in") return;
      page.classList.remove("vt-fade-in");
      page.removeEventListener("animationend", onAnimationEnd);
    };
    page.addEventListener("animationend", onAnimationEnd);
    return () => {
      page.removeEventListener("animationend", onAnimationEnd);
      page.classList.remove("vt-fade-in");
    };
  }, [pathname]);

  return null;
}
