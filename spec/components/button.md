# Button

## One correct class

- **Primary action:** `.fe-btn-primary` — Blue (`--color-brand-secondary`) fill,
  white text, pill radius. The single default for the main action on a view.
- **Secondary action:** `.fe-btn-secondary` — outline/quiet style for the
  lesser action beside a primary.

Do not invent button colours beyond the state table below.

## Anatomy

`<button class="fe-btn-primary">Label</button>` — optional trailing icon uses an
inline `currentColor` SVG (e.g. `arrow-right`).

## States

Primary and secondary share the same fill progression; secondary starts as
outline-only at rest.

| State | Behaviour |
|---|---|
| Default | Primary: Blue fill, white text. Secondary: Blue outline, Blue text, transparent fill. |
| Hover | Orange (`--color-brand-primary`) fill, white text (secondary: Orange fill + border). |
| Active / focus-visible | Pressed fill `--color-focus-button` (#CC622E), white text; no gold ring on pill buttons (outline suppressed; fill is the indicator). |
| Disabled | Primary: `--color-light-purple` fill, white text. Secondary: light-purple border and text, transparent fill. |

Hover and pressed fills are legacy UI choices (Elementor / live-site parity)
pending brand-book interactive-state rules. Orange at rest as a CTA fill is
disallowed; Orange on hover is intentional for primary/secondary pills.

## Do / don't

- Do: one primary action per view; pair with a secondary for the alternative.
- Do: keep label text Filson Pro, sentence case.
- Don't: use Orange as the **default** button fill; don't add new button hues
  outside the state table.
- Don't: remove the focused/pressed fill on pill buttons.

Other controls (category tags, nav links) use the gold
`--color-focus-visible-accent` ring; pill buttons do not.

## Minimal snippet

```html
<button class="fe-btn-primary">Book now</button>
<button class="fe-btn-secondary">Learn more</button>
```
