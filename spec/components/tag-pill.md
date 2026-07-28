# Category tag (tag-pill)

## One correct class

`.fe-tag-pill` with one category modifier. Five canonical categories:

| Category | Modifier |
|---|---|
| Balance and Wellness | `.fe-tag-pill--balance` |
| Movement | `.fe-tag-pill--movement` |
| Arts and Crafts | `.fe-tag-pill--arts` |
| Expression | `.fe-tag-pill--expression` |
| Music | `.fe-tag-pill--music` |

## Category colour on hover / active

Grey at rest; each modifier takes its fill on **hover** and when **active**
(selected). All use Charcoal labels except where noted. Mapping is an
implementation gap-fill until brand-book category-colour rules exist.

| Category | Token / colour | Label |
|---|---|---|
| Balance and Wellness | `--color-green-500` (Lime) | Charcoal |
| Movement | `--color-orange-300` (Peach) | Charcoal |
| Arts and Crafts | `--color-lavender-500` | Charcoal |
| Expression | `--color-light-orange` | Charcoal |
| Music | `--color-pink` | Charcoal |

Alert blue (`--color-blue-500`) is reserved for announcements only, not category tags.

## Anatomy

A pill control labelling a workshop category. Text label only; no icon inside the pill.

## States

Grey at rest; takes its category colour on **hover** and when **active**
(selected). Add `.active` for the selected state. Keyboard focus uses the gold
focus-visible ring.

## Accessibility

- **Decorative label** (read-only category on a card): use `<span class="fe-tag-pill">` with visible text; no extra ARIA required.
- **Interactive filter** (selectable category): use `<button type="button">` with
  the same classes, `aria-pressed="true"` when `.active`, and visible label text.
- **Focus:** Gold `--color-focus-visible-accent` ring on keyboard focus.

## Do / don't

- Do: use the canonical five categories.
- Don't: use alert blue for a category tag.

## Minimal snippet

```html
<span class="fe-tag-pill fe-tag-pill--arts">Arts and Crafts</span>
<span class="fe-tag-pill fe-tag-pill--music active">Music</span>
```
