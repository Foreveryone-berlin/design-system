# Input

## One correct class

`.fe-input` inside a `.fe-input-group`. Error state: add `.fe-input--error` and
render `.fe-input-error-msg`.

## Anatomy

- `.fe-input-group` — wraps a label, the control, and an optional error message.
- `.fe-input` — the text control. Border uses a neutral grey; focus brings a
  softened orange accent border.
- `.fe-input-error-msg` — error text, paired with `--color-status-error`.

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
- Don't: rely on colour alone to signal error — include text.

## Minimal snippet

```html
<div class="fe-input-group">
  <label for="email">Email</label>
  <input id="email" class="fe-input" type="email" />
</div>
```
