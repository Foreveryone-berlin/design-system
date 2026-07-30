# Card

## One correct class

`.fe-card` — the base content card (workshop card, content block). Variants:
`.fe-card-benefit` and `.fe-card-get-involved` use a Soft Lavender background;
`.fe-card-category` carries a category label on the card media.

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

## Accessibility

- Wrap each card in `<article>` when it represents a distinct content item.
- **Photo alt:** One sentence describing what is happening in the frame (activity
  and setting). Do not repeat the card `<h3>` title verbatim; the title names
  the event, the alt describes the scene.
- **Decorative illustration** (benefit/get-involved doodles): `alt=""` and
  `aria-hidden="true"` when the card heading already conveys meaning.
- **Category label:** Visible text on `.fe-card-category`; no icon required.
- **Actions:** Use real links or buttons with visible labels; one clear action
  per card.

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
