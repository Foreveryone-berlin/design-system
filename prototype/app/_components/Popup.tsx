"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function Popup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [close]);

  return (
    <>
      <button
        type="button"
        className="ds-btn ds-btn--primary"
        onClick={() => setOpen(true)}
      >
        Open popup
      </button>

      <dialog
        ref={dialogRef}
        className="fe-popup"
        aria-label="Subscribe to our Newsletter"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="fe-popup__content">
          <button
            type="button"
            className="fe-popup__close"
            onClick={close}
            aria-label="Close"
          >
            &times;
          </button>

          <h3 className="fe-popup__title">Subscribe to our Newsletter</h3>

          <div className="fe-popup__illustration" aria-hidden="true">
            <svg
              viewBox="0 0 120 100"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              role="img"
            >
              <path
                d="M22 56 L22 44 L74 22 L74 78 Z"
                fill="var(--color-brand-primary)"
                stroke="var(--color-brand-primary)"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <rect
                x="14"
                y="42"
                width="14"
                height="16"
                rx="3"
                fill="var(--color-brand-primary)"
              />
              <path
                d="M36 78 L46 92 L56 84 L48 70 Z"
                fill="var(--color-brand-primary)"
              />
              <path
                d="M84 30 L96 22"
                stroke="var(--color-brand-primary)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M86 50 L100 50"
                stroke="var(--color-brand-primary)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M84 70 L96 78"
                stroke="var(--color-brand-primary)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="fe-popup__lede">
            Get updates from the For Everyone space with community moments,
            upcoming events, and thoughtful ideas and stories from Berlin.
          </p>

          <form
            className="fe-popup__form"
            onSubmit={(e) => {
              e.preventDefault();
              close();
            }}
          >
            <div className="fe-input-group">
              <label className="fe-label fe-popup__sr-label" htmlFor="popup-newsletter-email">
                Email Address
              </label>
              <input
                id="popup-newsletter-email"
                type="email"
                className="fe-input fe-popup__input"
                placeholder="Email Address"
                required
              />
            </div>

            <button
              type="submit"
              className="ds-btn ds-btn--primary fe-popup__submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
