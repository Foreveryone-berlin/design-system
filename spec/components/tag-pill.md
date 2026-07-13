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

A pill control labelling a workshop category. May pair with a filled workshop
icon (see `CategoryIcon`, `prototype/public/icons/categories/*.svg`): solid
orange glyph, white inside the icon shape. The icon is **always** accompanied by
the category label text.

## States

Grey at rest; takes its category colour on **hover** and when **active**
(selected). Add `.active` for the selected state. Keyboard focus uses the gold
focus-visible ring.

## Do / don't

- Do: always show the category label text alongside the icon.
- Do: use the canonical five categories.
- Don't: use alert blue for a category tag.
- Don't: use a workshop icon decoratively or without a label.
- Don't: use outline/stroke category icons — they are solid filled.

## Minimal snippet

```html
<span class="fe-tag-pill fe-tag-pill--arts">Arts and Crafts</span>
<span class="fe-tag-pill fe-tag-pill--music active">Music</span>
```
