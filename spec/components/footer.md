# Footer

## One correct class

`.fe-footer` — site footer with brand lockup, link columns, optional newsletter,
and legal links.

## Accessibility

- Use `<footer>` landmark (class `.fe-footer` on the element).
- Column headings: real heading elements or visible text; link lists in `<ul>`.
- Nav links: reuse `.fe-nav-link`; disabled entries use `aria-disabled="true"`.
- Icon-only social buttons: `.fe-icon-btn` with `aria-label` per network.
- Decorative wave divider: `aria-hidden="true"` if purely visual.
- Logo image: alt text per [docs/logo-usage.md](../../docs/logo-usage.md).

## Do / don't

- Do: keep link text descriptive out of context.
- Don't: rely on colour alone for link hover state (underline or background change
  accompanies colour).

## Minimal snippet

```html
<footer class="fe-footer">
  <div class="fe-footer__inner">
    <p class="fe-footer__brand">
      <img src="…" alt="ForEveryone" width="120" height="22" /> ForEveryone
    </p>
    …
  </div>
</footer>
```
