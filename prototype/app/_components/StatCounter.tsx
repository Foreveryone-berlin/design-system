"use client";

import { useEffect, useRef, useState } from "react";

function parse(value: string) {
  const m = /^(\D*)(\d[\d,]*)(.*)$/.exec(value);
  if (!m) return { prefix: "", target: null as number | null, suffix: value, grouped: false };
  return {
    prefix: m[1],
    target: parseInt(m[2].replace(/,/g, ""), 10),
    suffix: m[3],
    // Keep thousands separators while animating when the source value has them.
    grouped: m[2].includes(","),
  };
}

export default function StatCounter({
  value,
  duration = 1200,
  delay = 0,
  hideUntilStart = false,
  complete = false,
}: {
  value: string;
  duration?: number;
  delay?: number;
  hideUntilStart?: boolean;
  complete?: boolean;
}) {
  const { prefix, target, suffix, grouped } = parse(value);
  const [display, setDisplay] = useState(0);
  const [visible, setVisible] = useState(!hideUntilStart);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (target === null || complete) return;
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      setVisible(true);
      return;
    }

    let cancelled = false;
    let started = false;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started) {
          started = true;
          io.disconnect();
          timer = setTimeout(() => {
            if (cancelled) return;
            setVisible(true);
            const start = performance.now();
            const tick = (now: number) => {
              if (cancelled) return;
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(Math.round(eased * target));
              if (t < 1) frame = requestAnimationFrame(tick);
            };
            frame = requestAnimationFrame(tick);
          }, delay);
        }
      },
      { threshold: 0.4 },
    );
    const reveal = node.closest("[data-count-after-reveal]");
    const animations = reveal?.getAnimations() ?? [];
    Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      if (!cancelled) io.observe(node);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      io.disconnect();
    };
  }, [target, duration, delay, complete]);

  if (target === null) return <span>{value}</span>;
  const shown = complete || visible;
  const number = complete ? target : display;

  return (
    <>
      <span
        ref={ref}
        aria-hidden="true"
        data-counter-visible={shown}
        style={{ visibility: shown ? "visible" : "hidden" }}
      >
        {prefix}
        {grouped ? number.toLocaleString("en-US") : number}
        {suffix}
      </span>
      <span className="ds-visually-hidden">{value}</span>
    </>
  );
}
