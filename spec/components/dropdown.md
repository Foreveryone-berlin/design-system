# Dropdown menu

## One correct class

`.fe-dropdown` wrapping `.fe-dropdown-item` links or buttons.

## Accessibility

- Container: `role="menu"` with `aria-label` describing the menu purpose.
- Items: `role="menuitem"` on links or buttons.
- Current item: `aria-current="true"` on the active entry.
- Disabled item: `aria-disabled="true"` (prefer not rendering as a link).
- Keyboard: items must be reachable by Tab (or roving tabindex if implementing
  full menu keyboard pattern); focus-visible must remain visible.

## Do / don't

- Do: use real links for navigation destinations.
- Don't: use a dropdown purely for hover-only content with no keyboard path.

## Minimal snippet

```html
<div class="fe-dropdown" role="menu" aria-label="Account">
  <a href="/profile" class="fe-dropdown-item" role="menuitem">Profile</a>
  <a href="/settings" class="fe-dropdown-item is-active" role="menuitem"
    aria-current="true">Settings</a>
</div>
```
