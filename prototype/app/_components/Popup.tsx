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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/megaphone.png"
              alt=""
              width={234}
              height={184}
            />
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
