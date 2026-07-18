# Header

## One correct class

`.fe-header` — site header bar with logo, navigation, optional CTA, and mobile
menu. Mobile panel: `.fe-header__mobile-nav` toggled with `.is-open`.

## Accessibility

- Logo link: meaningful `alt` on the wordmark image (see [docs/logo-usage.md](../../docs/logo-usage.md)).
- Primary nav: `<nav aria-label="Main">` (or context-specific label).
- Menu toggle: `<button type="button">` with `aria-expanded`, `aria-controls`
  pointing at the mobile nav `id`, and `aria-label` toggling between "Open
  menu" and "Close menu".
- Mobile nav when open: trap focus inside the panel or use `inert` on the rest of
  the page; restore focus to the toggle on close.
- Dropdown triggers: `aria-expanded` + `aria-controls`; prefer plain links when
  no submenu is needed.
- Icon-only controls: always set `aria-label`.

## Do / don't

- Do: keep keyboard focus visible on every interactive control.
- Don't: use `<div onclick>` for navigation or the menu toggle.

## Minimal snippet

```html
<header class="fe-header">
  <div class="fe-header__inner">
    <a class="fe-header__logo" href="/">
      <img src="…" alt="ForEveryone" width="120" height="22" />
    </a>
    <nav class="fe-header__nav" aria-label="Main">…</nav>
    <button type="button" class="fe-header__menu-btn" aria-expanded="false"
      aria-controls="mobile-nav" aria-label="Open menu">…</button>
  </div>
</header>
```
