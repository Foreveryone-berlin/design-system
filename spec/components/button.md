# Button

## One correct class

- **Primary action:** `.fe-btn-primary` — Blue (`--color-brand-secondary`) fill,
  white text, pill radius. The single default for the main action on a view.
- **Secondary action:** `.fe-btn-secondary` — outline/quiet style for the
  lesser action beside a primary.

Do not invent button colours. Orange is **not** a button background (decorative
only); there is no orange-filled text button.

## Anatomy

`<button class="fe-btn-primary">Label</button>` — optional trailing icon uses an
inline `currentColor` SVG (e.g. `arrow-right`).

## States

| State | Behaviour |
|---|---|
| Default | Blue fill, white text |
| Hover | Shifts to Orange tint via `--color-focus-button` accent |
| Active | Pressed/darkened |
| Focus-visible | Gold keyboard ring (`--color-focus-visible-accent`), 0.125rem at 0.1875rem offset |
| Disabled | Reduced emphasis; not interactive |

## Do / don't

- Do: one primary action per view; pair with a secondary for the alternative.
- Do: keep label text Filson Pro, sentence case.
- Don't: use Orange as a button fill; don't place white text on Orange.
- Don't: remove the focus-visible ring.

## Minimal snippet

```html
<button class="fe-btn-primary">Book now</button>
<button class="fe-btn-secondary">Learn more</button>
```
