# Input

## One correct class

`.fe-input` inside a `.fe-input-group`. Error state: add `.fe-input--error` and
render `.fe-input-error-msg`. A native select uses `.fe-input` inside `.fe-select`,
with a decorative `.fe-select__icon` sibling.

## Anatomy

- `.fe-input-group`: wraps a label, the control, and an optional error message.
- `.fe-input`: the text control. Border uses a neutral grey; focus brings a
  softened orange accent border.
- `.fe-input-error-msg`: error text, paired with `--color-status-error`.

## States

| State | Behaviour |
|---|---|
| Default | Light-grey border |
| Focus | Softened orange accent border + soft glow |
| Error | `.fe-input--error` red border; stronger red on hover, focus, and press |
| Disabled | Reduced emphasis |

## Do / don't

- Do: always pair an input with a visible `<label>` (not placeholder-only).
- Do: associate the error message with the input for screen readers.
- Don't: rely on colour alone to signal error: include text.

## Examples

### Text input

```html
<div class="fe-input-group">
  <label for="email">Email</label>
  <input id="email" class="fe-input" type="email" />
</div>
```

### Select

Keep the native `<select>` for keyboard behaviour and the platform's mobile
picker. The wrapper removes only the browser-drawn arrow, reserves 48px at the
inline end, and places the system chevron 16px from that edge. Logical positioning
also supports right-to-left layouts. The icon must not receive focus or intercept
pointer events. Error and disabled states use the same classes as text inputs;
forced-colour mode uses a system highlight outline for keyboard focus.

```html
<div class="fe-input-group">
  <label for="profile">Wave profile</label>
  <div class="fe-select">
    <select id="profile" class="fe-input">
      <option value="wave-h1">Wave crest 1</option>
      <option value="wave-soft">Broad wave</option>
    </select>
    <svg class="fe-select__icon" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round" aria-hidden="true" focusable="false">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </div>
</div>
```
