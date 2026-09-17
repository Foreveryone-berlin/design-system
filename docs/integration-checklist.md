# Integration checklist

Run this on any surface that consumes the design system: the Next.js prototype, a framework app, or a CMS-hosted site. It is platform-neutral by design; per-target steps live in [`integrations/README.md`](../integrations/README.md).

Automated repo checks are in [validation.md](validation.md). Known gaps are in [a11y-conformance.md](a11y-conformance.md).

## 1. Token CSS is loaded

- `css/custom-properties.css` is loaded before any authored layer, so `:root` custom properties resolve.
- In devtools, inspect `:root` and confirm `--color-brand-primary`, `--font-family-body`, and `--spacing-4` are present.
- Buttons, headings, body text, and inputs use the expected colours and fonts. If headings fall back to a generic sans-serif, the brand font is not loading; register Filson Pro (or the current `--font-family-*` values) on that host. Per-target font notes: [`integrations/README.md`](../integrations/README.md).
- Hard refresh and clear any CDN or page cache before judging the result.

## 2. Skip link

The skip link ships as `.fe-skip-link` in `css/utilities.css`, but the **host page must supply the markup**. It is visually hidden until focused.

As the first element inside `<body>`:

```html
<a href="#main-content" class="fe-skip-link">Skip to content</a>
```

And on the primary content wrapper:

```html
<main id="main-content" tabindex="-1">…</main>
```

Verify: load the page, press Tab once, confirm the link appears and jumps past the navigation.

## 3. Focus order and visible focus

- Tab through header, mobile menu, main content, and footer. Focus order follows the visual order.
- Focus stays visible throughout: a gold ring on nav links and tags, an orange fill on pill buttons.
- No element traps focus, and no focusable element sits inside collapsed content.

## 4. Icon-only controls

Every icon-only control has an `aria-label`: social links, play buttons, the menu toggle, close buttons. The SVG inside carries `aria-hidden="true"` and `fill="currentColor"`.

## 5. Accordion and FAQ semantics

The trigger is a `<button>` with `aria-expanded` and `aria-controls`; collapsed content is not focusable. See [`spec/components/faq.md`](../spec/components/faq.md).

## 6. Images and alt text

- Meaningful photos get a one-sentence alt describing the activity and the setting. "Two people cooking together at No. 52 Cafe" says more than "people in a room".
- Purely decorative graphics use an empty `alt`.
- For a photo inside a blob mask, the alt text belongs on the photo, not on the decorative shape.
- See [`prototype/public/images/ASSETS.md`](../prototype/public/images/ASSETS.md) and [logo-usage.md](logo-usage.md).

## 7. Layout and spacing spot check

Section spacing, container width, and the responsive stacking of cards and grids match the specimens on [design.foreveryone.berlin](https://design.foreveryone.berlin). The shared layer breaks mobile-first at `min-width` 640px, 768px, and 1024px; some components size against their own container instead of the viewport, so also check them in a narrow column, not only at a narrow window.
