"use client";

import { useEffect, useRef, useState } from "react";

function parse(value: string) {
  const m = /^(\D*)(\d[\d,]*)(.*)$/.exec(value);
  if (!m) return { prefix: "", target: null as number | null, suffix: value };
  return {
    prefix: m[1],
    target: parseInt(m[2].replace(/,/g, ""), 10),
    suffix: m[3],
  };
}

export default function StatCounter({
  value,
  duration = 1200,
}: {
  value: string;
  duration?: number;
}) {
  const { prefix, target, suffix } = parse(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true;
          io.disconnect();
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [target, duration]);

  if (target === null) return <span>{value}</span>;

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
      <span className="ds-visually-hidden">{value}</span>
    </>
  );
}
