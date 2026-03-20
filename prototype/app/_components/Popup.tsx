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
        aria-label="Get in touch"
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

          <h3 className="fe-popup__title">Get in touch</h3>

          <form
            className="fe-popup__form"
            onSubmit={(e) => {
              e.preventDefault();
              close();
            }}
          >
            <div className="fe-popup__row">
              <div className="fe-input-group">
                <label className="fe-label" htmlFor="popup-name">
                  Name <span className="fe-popup__required">*</span>
                </label>
                <input
                  id="popup-name"
                  type="text"
                  className="fe-input"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="fe-input-group">
                <label className="fe-label" htmlFor="popup-email">
                  Email <span className="fe-popup__required">*</span>
                </label>
                <input
                  id="popup-email"
                  type="email"
                  className="fe-input"
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>

            <div className="fe-input-group">
              <label className="fe-label" htmlFor="popup-message">
                Message <span className="fe-popup__required">*</span>
              </label>
              <textarea
                id="popup-message"
                className="fe-input fe-popup__textarea"
                placeholder="Message"
                rows={4}
                required
              />
            </div>

            <button type="submit" className="fe-btn-primary fe-popup__submit">
              Send
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
