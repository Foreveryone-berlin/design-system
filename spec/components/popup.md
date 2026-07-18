# Popup (modal dialog)

## One correct class

`.fe-popup` on a native `<dialog>` element with `.fe-popup__content` inside.

## Accessibility

- Use native `<dialog>` with `showModal()` / `close()`; set `aria-modal="true"`.
- Label the dialog with `aria-labelledby` pointing at the title heading (`id` on
  `.fe-popup__title`).
- Close control: `<button type="button">` with `aria-label="Close"`; decorative
  × glyph `aria-hidden="true"`.
- On close (any path): return focus to the element that opened the dialog.
- Decorative illustration inside the dialog: `aria-hidden="true"` wrapper and
  `alt=""` on any `<img>`.
- Form fields: visible `<label>` associated with `for` / `id`; do not rely on
  placeholder alone.

## Do / don't

- Do: trap focus inside the open dialog (native `<dialog>` handles this).
- Don't: build modals from `<div role="dialog">` without full focus management.

## Minimal snippet

```html
<button type="button" class="fe-btn-primary" id="open-newsletter">Subscribe</button>
<dialog class="fe-popup" aria-labelledby="popup-title">
  <div class="fe-popup__content">
    <button type="button" class="fe-popup__close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <h2 id="popup-title" class="fe-popup__title">Newsletter</h2>
    …
  </div>
</dialog>
```
