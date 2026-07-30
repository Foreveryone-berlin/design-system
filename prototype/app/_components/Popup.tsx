"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import FeIcon from "./FeIcon";

export default function Popup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Native dialog closes itself on Escape; keep React state in sync and
  // restore focus to the trigger when the dialog closes for any reason.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setOpen(false);
      triggerRef.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="ds-btn ds-btn--primary"
        onClick={() => setOpen(true)}
      >
        Open popup
      </button>

      <dialog
        ref={dialogRef}
        className="fe-popup"
        aria-modal="true"
        aria-labelledby="fe-popup-title"
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
            <FeIcon set="ui" name="close" size="md" />
          </button>

          <h3 id="fe-popup-title" className="fe-popup__title">
            Subscribe to our Newsletter
          </h3>

          <div className="fe-popup__illustration" aria-hidden="true">
            <Image
              src="/illustrations/megaphone.png"
              alt=""
              width={234}
              height={184}
            />
          </div>

          <p className="fe-popup__lede">
            Get updates from the ForEveryone space with community moments,
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
