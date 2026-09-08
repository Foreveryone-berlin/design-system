# Testimonial (card and slider)

## One correct class

`.fe-testimonial` is the quote itself, always a `<figure>`. It takes one display
variant, and sits inside one of two containers.

| What you need | Class | When |
|---|---|---|
| Quote, card display | `.fe-testimonial` | Default. Left-aligned, card chrome. Any quote length. |
| Quote, centred display | `.fe-testimonial fe-testimonial--quote` | Short quotes only — **two lines or fewer**. Glyph above, centred, no card chrome. |
| Several quotes at once | `.fe-testimonial-grid` | Static responsive grid, auto-fills from 280px. |
| One quote at a time | `.fe-testimonial-slider` | Scroll-snap slider with dot pagination. Manual only. |

The slider and the grid are alternatives, never nested. The centred variant is
the one to use inside the slider; the card variant is the one to use in the grid.

## Anatomy

**Card or grid.**

| Element | Class | Notes |
|---|---|---|
| `<figure>` | `.fe-testimonial` | The quote container. |
| `<span>` | `.fe-testimonial__marks` | Decorative glyph. **Must** carry `aria-hidden="true"`. |
| `<blockquote>` | `.fe-testimonial__quote` | The quote. `48ch` measure on the card, `32ch` centred. |
| `<figcaption>` | `.fe-testimonial__attribution` | Optional. Omit entirely when there is no attribution. |

**Slider.** Every attribute in this table is required, not decorative.

| Element | Class | Required attributes |
|---|---|---|
| `<div>` | `.fe-testimonial-slider` | — |
| `<div>` | `.fe-testimonial-slider__viewport` | `role="group"`, `aria-label`, `tabindex="0"` |
| `<ul>` | `.fe-testimonial-slider__track` | `role="list"` |
| `<li>` | `.fe-testimonial-slider__slide` | One per quote; the `<figure>` goes inside it |
| `<div>` | `.fe-testimonial-slider__dots` | `role="group"`, `aria-label` |
| `<button>` | `.fe-testimonial-slider__dot` | `type="button"`, `aria-label`, `aria-current` |

## States

| Surface | State | Treatment |
|---|---|---|
| Dot | rest | `--color-neutral-400` circle, `--spacing-3` square |
| Dot | hover | `--color-neutral-500` |
| Dot | `aria-current="true"` | `--color-accent-icon` fill **and** widened to a `--spacing-6` pill |
| Dot | `:focus-visible` | Gold `--color-focus-visible-accent` ring |
| Viewport | `:focus-visible` | Gold ring at the card radius |
| Either | `prefers-reduced-motion` | Dot transitions off; viewport `scroll-behavior: auto` |

The current dot changes both fill and shape, so the state never rests on colour
alone (WCAG 1.4.1).

## Accessibility

- **Viewport is focusable.** `tabindex="0"` is mandatory. The scrollbar is
  hidden, and a scrollable region that cannot take focus fails axe's
  `scrollable-region-focusable` rule at *serious* impact.
- **`role="group"`, not `role="region"`.** `region` is a landmark, and one
  landmark per carousel pollutes the landmark rota on a page with many.
- **`role="list"` is stated explicitly** on the track. `list-style: none` strips
  list semantics in WebKit/VoiceOver, and it is the list role that announces
  "3 of 5" for free — which is why no per-slide labelling is needed.
- **Not a tablist.** The APG tabbed-carousel pattern requires non-current slides
  to be hidden panels. Here every slide stays in the DOM and reachable by
  scrolling, so `role="tablist"` / `aria-selected` would misdescribe it.
  `aria-current` is a global attribute and valid on a button.
- **No live region** while the slider is manual. Slides are permanently in the
  DOM, so a live region would re-announce on every swipe frame.
- **Dot hit area is 44px.** The button carries `--spacing-4` padding and the
  visible dot is a `::before`; sizing the button down to the dot would leave a
  12px target and fail WCAG 2.5.8.
- **Keyboard:** Tab reaches the viewport, then arrow keys, Home and End scroll it
  natively and snap to a slide. Tab again reaches each dot; Enter or Space moves
  the track.

## Do / don't

- **Do** use `--quote` only for quotes of two lines or fewer.
- **Do** keep `tabindex="0"` on the viewport whenever the scrollbar is hidden.
- **Don't** pass `behavior: "smooth"` from JavaScript. `scrollTo` and
  `scrollIntoView` with that option bypass CSS `scroll-behavior` *and* the
  reduced-motion media query, silently breaking the opt-out. Assign `scrollLeft`
  and let CSS decide.
- **Don't** centre-align a quote of three or more lines (Brand Book v1.0 p.23) —
  use the default card variant.
- **Don't** add autoplay without a visible pause control, plus pause on hover and
  focus-within (WCAG 2.2.2). The shipped slider is manual for this reason.
- **Don't** use `--color-brand-primary` as the dot fill: it is decorative-only
  and never a background. Use `--color-accent-icon`.
- **Don't** add `-webkit-overflow-scrolling: touch`. It is obsolete and breaks
  scroll snap on iOS.

## Minimal snippet

```html
<div class="fe-testimonial-slider">
  <div class="fe-testimonial-slider__viewport" role="group" aria-label="Testimonials" tabindex="0">
    <ul class="fe-testimonial-slider__track" role="list">
      <li class="fe-testimonial-slider__slide">
        <figure class="fe-testimonial fe-testimonial--quote">
          <span class="fe-testimonial__marks" aria-hidden="true">&ldquo;&rdquo;</span>
          <blockquote class="fe-testimonial__quote">&ldquo;It was beautiful making connections.&rdquo;</blockquote>
        </figure>
      </li>
      <li class="fe-testimonial-slider__slide">
        <figure class="fe-testimonial fe-testimonial--quote">
          <span class="fe-testimonial__marks" aria-hidden="true">&ldquo;&rdquo;</span>
          <blockquote class="fe-testimonial__quote">&ldquo;Everyone was welcome, and it showed.&rdquo;</blockquote>
          <figcaption class="fe-testimonial__attribution">Name, Role</figcaption>
        </figure>
      </li>
    </ul>
  </div>
  <div class="fe-testimonial-slider__dots" role="group" aria-label="Choose a testimonial">
    <button type="button" class="fe-testimonial-slider__dot" aria-current="true" aria-label="Testimonial 1 of 2"></button>
    <button type="button" class="fe-testimonial-slider__dot" aria-current="false" aria-label="Testimonial 2 of 2"></button>
  </div>
</div>
```

Static grid:

```html
<div class="fe-testimonial-grid">
  <figure class="fe-testimonial">
    <span class="fe-testimonial__marks" aria-hidden="true">&ldquo;&rdquo;</span>
    <blockquote class="fe-testimonial__quote">&ldquo;A longer quote keeps the left-aligned card variant.&rdquo;</blockquote>
    <figcaption class="fe-testimonial__attribution">Name, Role</figcaption>
  </figure>
</div>
```
