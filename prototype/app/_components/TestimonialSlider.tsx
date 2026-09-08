"use client";

import { useEffect, useRef, useState } from "react";

export default function TestimonialSlider({
  items,
  label = "Testimonials",
}: {
  items: { quote: string; attribution?: string }[];
  label?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // One observer scoped to the scroller. Slides are 100% wide, so exactly one
  // can ever clear 0.6 — the active index is unambiguous with no debounce, no
  // rAF throttle, and no recompute on resize. A scroll handler would need all
  // three and would fight the snap settle.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = slideRefs.current.indexOf(entry.target as HTMLLIElement);
          if (i !== -1) setActive(i);
        }
      },
      { root: viewport, threshold: 0.6 },
    );

    for (const slide of slideRefs.current) if (slide) io.observe(slide);
    return () => io.disconnect();
  }, [items.length]);

  // Relative scrollLeft, not scrollIntoView: that would scroll ancestors too
  // and jump the page. getBoundingClientRect deltas are gap-, padding- and
  // RTL-safe, unlike i * clientWidth or offsetLeft.
  //
  // No `behavior` argument on purpose, so CSS scroll-behavior decides — which
  // is what makes the prefers-reduced-motion rule in css/utilities.css the
  // whole opt-out. Never add behavior: "smooth" here.
  const goTo = (i: number) => {
    const viewport = viewportRef.current;
    const slide = slideRefs.current[i];
    if (!viewport || !slide) return;
    viewport.scrollLeft +=
      slide.getBoundingClientRect().left - viewport.getBoundingClientRect().left;
  };

  return (
    <div className="fe-testimonial-slider">
      {/* tabindex="0" is mandatory: the scrollbar is hidden, and without it axe
          raises scrollable-region-focusable at serious impact. role="group"
          rather than "region" keeps this out of the landmark rota. */}
      <div
        ref={viewportRef}
        className="fe-testimonial-slider__viewport"
        role="group"
        aria-label={label}
        tabIndex={0}
      >
        {/* role="list" is explicit: list-style: none strips list semantics in
            WebKit/VoiceOver, and the list role is what announces position. */}
        <ul className="fe-testimonial-slider__track" role="list">
          {items.map((item, i) => (
            <li
              key={item.quote}
              ref={(node) => {
                slideRefs.current[i] = node;
              }}
              className="fe-testimonial-slider__slide"
            >
              <figure className="fe-testimonial fe-testimonial--quote">
                <span className="fe-testimonial__marks" aria-hidden="true">
                  &ldquo;&rdquo;
                </span>
                <blockquote className="fe-testimonial__quote">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                {item.attribution && (
                  <figcaption className="fe-testimonial__attribution">
                    {item.attribution}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="fe-testimonial-slider__dots"
        role="group"
        aria-label="Choose a testimonial"
      >
        {items.map((item, i) => (
          <button
            key={item.quote}
            type="button"
            className="fe-testimonial-slider__dot"
            aria-current={i === active}
            aria-label={`Testimonial ${i + 1} of ${items.length}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
