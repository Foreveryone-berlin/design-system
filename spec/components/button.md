# Button

## One correct class

- **Primary action:** `.fe-btn-primary` — Soft Lavender (`--color-background-soft`)
  fill, Charcoal text, orange decorative border (`--color-accent-border`), pill
  radius. The single default for the main action on a view.
- **Secondary action:** `.fe-btn-secondary` — orange outline with Charcoal/orange
  text; light orange hover tint. The lesser action beside a primary.

Do not invent button colours. Orange is **not** a solid text-button fill
(decorative only); never pair white text on an orange background.

## Anatomy

`<button class="fe-btn-primary">Label</button>` — optional trailing icon uses an
inline `currentColor` SVG (e.g. `arrow-right`).

## States

| State | Behaviour |
|---|---|
| Default | Soft Lavender fill, Charcoal text, orange border |
| Hover | Lavender tint background, deeper orange border (`--color-focus-button`) |
| Active / focused fill demo | Same as hover (`.is-focus` on the Components page) |
| Focus-visible | Gold keyboard ring (`--color-focus-visible-accent`), 0.125rem at 0.1875rem offset |
| Disabled | Reduced opacity; not interactive |

## Do / don't

- Do: one primary action per view; pair with a secondary for the alternative.
- Do: keep label text Filson Pro, sentence case.
- Don't: use Orange or Blue as a solid fill behind white button text.
- Don't: remove the focus-visible ring.

## Minimal snippet

```html
<button class="fe-btn-primary">Book now</button>
<button class="fe-btn-secondary">Learn more</button>
```
