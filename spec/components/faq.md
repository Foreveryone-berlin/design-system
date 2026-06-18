# FAQ accordion

## One correct class

`.fe-faq-item` — a bordered-card accordion item. The clickable header is
`.fe-faq-item__trigger`; the collapsible region is
`.fe-faq-item__content-wrapper` wrapping `.fe-faq-item__content`.

## Anatomy

- `.fe-faq-item__trigger` — a `<button>` with the question; includes a chevron
  SVG that rotates on open.
- `.fe-faq-item__content-wrapper` — animates open/closed height; respects
  `prefers-reduced-motion`.

## Accessibility

- The trigger is a real `<button>` with `aria-expanded` reflecting open state
  and `aria-controls` pointing at the content region.
- Keyboard operable (Enter/Space); focus-visible shows the gold ring.

## Do / don't

- Do: one question per trigger; left-align text.
- Don't: animate height for reduced-motion users; don't hide content from
  assistive tech when collapsed via `display:none` without `aria`.

## Minimal snippet

```html
<div class="fe-faq-item">
  <button class="fe-faq-item__trigger" aria-expanded="false" aria-controls="a1">
    Do I need experience?
  </button>
  <div id="a1" class="fe-faq-item__content-wrapper">
    <div class="fe-faq-item__content">
      <p class="fe-body">No experience needed. Come as you are.</p>
    </div>
  </div>
</div>
```
