"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";
import FeIcon from "./FeIcon";

export default function ContentSlider({ items, label, itemLabel, gallery = false }: {
  items: { id: string; content: ReactNode }[];
  label: string;
  itemLabel: string;
  gallery?: boolean;
}) {
  const viewportId = useId();
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [perPage, setPerPage] = useState(1);
  const [active, setActive] = useState(0);
  const pageCount = Math.ceil(items.length / perPage);

  const pageStart = (page: number, count: number) =>
    Math.min(page * count, Math.max(0, items.length - count));

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let count = 1;
    const updateActive = () => {
      const pages = Math.ceil(items.length / count);
      const edge = viewport.getBoundingClientRect().left;
      let closest = 0;
      let distance = Infinity;
      for (let page = 0; page < pages; page++) {
        const index = Math.min(page * count, Math.max(0, items.length - count));
        const slide = slideRefs.current[index];
        if (!slide) continue;
        const delta = Math.abs(slide.getBoundingClientRect().left - edge);
        if (delta < distance) { closest = page; distance = delta; }
      }
      setActive(closest);
    };
    const resize = new ResizeObserver(() => {
      const first = slideRefs.current[0];
      if (!first) return;
      const gap = parseFloat(getComputedStyle(first.parentElement!).columnGap) || 0;
      count = Math.max(1, Math.round((viewport.clientWidth + gap) / (first.getBoundingClientRect().width + gap)));
      setPerPage(count);
      updateActive();
    });
    resize.observe(viewport);
    viewport.addEventListener("scroll", updateActive, { passive: true });
    return () => {
      resize.disconnect();
      viewport.removeEventListener("scroll", updateActive);
    };
  }, [items.length]);

  const goTo = (page: number) => {
    const viewport = viewportRef.current;
    const slide = slideRefs.current[pageStart(page, perPage)];
    if (!viewport || !slide) return;
    // CSS owns smooth scrolling and its reduced-motion opt-out.
    viewport.scrollLeft += slide.getBoundingClientRect().left - viewport.getBoundingClientRect().left;
  };

  return (
    <div className={`fe-testimonial-slider fe-testimonial-slider--arrows${gallery ? " fe-facilitator-gallery" : ""}`}>
      <div ref={viewportRef} id={viewportId} className="fe-testimonial-slider__viewport"
        role="group" aria-label={label} tabIndex={0}>
        <ul className="fe-testimonial-slider__track" role="list">
          {items.map((item, i) => (
            <li key={item.id} ref={(node) => { slideRefs.current[i] = node; }}
              className="fe-testimonial-slider__slide">{item.content}</li>
          ))}
        </ul>
      </div>
      {pageCount > 1 && <>
        <button type="button" className="fe-icon-btn fe-testimonial-slider__arrow fe-testimonial-slider__arrow--previous"
          aria-label={`Previous ${itemLabel.toLowerCase()}`} aria-controls={viewportId}
          onClick={() => goTo((active - 1 + pageCount) % pageCount)}>
          <FeIcon set="ui" name="chevron-down" size="md" />
        </button>
        <div className="fe-testimonial-slider__dots" role="group" aria-label={`Choose a ${itemLabel.toLowerCase()}`}>
          {Array.from({ length: pageCount }, (_, i) => (
            <button key={i} type="button" className="fe-testimonial-slider__dot"
              aria-current={i === active} aria-label={`${itemLabel} ${i + 1} of ${pageCount}`}
              aria-controls={viewportId} onClick={() => goTo(i)} />
          ))}
        </div>
        <button type="button" className="fe-icon-btn fe-testimonial-slider__arrow fe-testimonial-slider__arrow--next"
          aria-label={`Next ${itemLabel.toLowerCase()}`} aria-controls={viewportId}
          onClick={() => goTo((active + 1) % pageCount)}>
          <FeIcon set="ui" name="chevron-down" size="md" />
        </button>
      </>}
    </div>
  );
}
