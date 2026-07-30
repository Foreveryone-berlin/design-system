"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Next.js can leave the rendered route stale after browser back/forward when
 * the history stack mixes same-pathname hash entries with cross-page navigations
 * (e.g. on-this-page anchor → sidebar link → back). Sync the App Router to the
 * active history entry on popstate without pushing a new one.
 */
export default function NavigationHistory() {
  const pathname = usePathname();
  const router = useRouter();
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const onPopState = () => {
      const target =
        window.location.pathname +
        window.location.search +
        window.location.hash;
      if (window.location.pathname !== pathnameRef.current) {
        router.replace(target);
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [router]);

  return null;
}
