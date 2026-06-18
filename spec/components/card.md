# Card

## One correct class

`.fe-card` — the base content card (workshop card, content block). Variants:
`.fe-card-benefit` and `.fe-card-get-involved` use a Soft Lavender background;
`.fe-card-category` carries a category icon + label.

## Anatomy

- `.fe-card__media` — optional image (raster images use `next/image` with
  explicit width/height; inline SVGs stay as `<img>`). Often blob-masked.
- `.fe-card__body` — title, meta, copy.
- `.fe-card-meta`, `.fe-card-price` — supporting metadata.

## Rules

- Background: White or Soft Lavender; body text Charcoal (see principles).
- Radius: `--radius-card`; shadow: `--shadow-card`.
- Photography inside cards follows the imagery rules (warm, candid, diverse;
  blob/rounded masks; meaningful alt text).

## Do / don't

- Do: keep one clear action per card; left-align text.
- Don't: place white text on a light card; don't use Orange as the card fill.

## Minimal snippet

```html
<article class="fe-card">
  <div class="fe-card__media"><!-- next/image --></div>
  <div class="fe-card__body">
    <span class="fe-tag-pill fe-tag-pill--arts">Arts and Crafts</span>
    <h3 class="fe-h3">Pottery for beginners</h3>
    <p class="fe-body">No experience needed. Come as you are.</p>
  </div>
</article>
```
