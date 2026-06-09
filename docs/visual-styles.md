# Visual styles — icons, illustrations, blobs

Brand guide summary for **ForEveryone Berlin** (iconography, blobs, photography). **Figma** remains the visual source of truth; this page ties brand rules to tokens and CSS utilities. See also [color-audit-2026.md](color-audit-2026.md) for hex roles and approved background ⇄ text combinations, and [logo-usage.md](logo-usage.md) for logo safe-zone, minimum sizes, and the white-on-orange exception.

**Category icon set (filled, orange + white glyph)** ships in `prototype/public/icons/categories/` and renders via the `CategoryIcon` React component inside `.fe-card-category__icon`, keeping the orange (`var(--color-accent-icon)`) + white-glyph styling consistent. Add a category by dropping an SVG (stroke="currentColor", 24×24 viewBox) into the folder and extending `CategoryIcon`.

## Iconography and illustration

### Category icons (canonical set)

Per the 2026 style guide, workshop categories use a fixed, filled, orange icon set. Each icon has interaction states on the category tag/label control: **Default · Hover · Active · Focused · Disabled**.

| Category | Tag label | Status |
|----------|-----------|--------|
| Balance and Wellness | `Balance and Wellness` | canonical (style guide) |
| Movement | `Movement` | canonical (style guide) |
| Arts and Crafts | `Arts and Crafts` | canonical (style guide) |
| Expression | `Expression` | canonical (style guide) |
| Music | `Music` | canonical (style guide) |

**Gap to close before/at 1.0.0:** the prototype currently ships a legacy subset — `painting.svg`, `pottery.svg`, `wellness.svg`, `language.svg` — and `CategoryIcon` only maps those four. Align the asset filenames and the `CategoryIconName` union to the five canonical categories above (e.g. `balance-wellness`, `movement`, `arts-crafts`, `expression`, `music`); keep legacy names only as aliases if live content still references them.

### UI / functional icons

Beyond categories, the system uses a small set of UI glyphs (seen in the brand guidelines and style guide). Document and ship these as `currentColor` SVGs so they inherit control colour:

| Icon | Where | Asset / class |
|------|-------|----------------|
| Icon button (states: default/hover/focused/disabled) | quiet actions, social | `.fe-icon-btn` (+ `--filled-brand` for always-on orange) |
| Play button | media/video affordances | filled orange circle + white triangle glyph |
| Dropdown chevron | nav dropdowns, selects, FAQ accordions | inline chevron SVG, rotates on open |
| Arrow (right) | "Book Now" / "Explore all" CTAs | `arrow-right.svg` |
| External link | outbound links | `external-link.svg` |

### Line illustrations (doodles)

- **Role:** Decorative “doodle” marks — warmth, hand-drawn personality (e.g. the orange flower beside *Our Impact* and the sketched underline beneath the *SheLeads* / home headline).
- **Colour:** Drawn in **brand orange** (decorative use), matching the filled-illustration family; do not recolour to blue.
- **Shipped starter set** in `prototype/public/illustrations/` (stroke-based SVGs): `flower.svg`, `cloud.svg`, `smiley.svg`, `swirl.svg`, `sparkle.svg`, and `headline-underline.svg`. These are stylistic recreations; the **exact brand artwork (incl. the filled chess and vase/pottery illustrations) lives in Figma** and should replace/extend these on export.
- **Headline underline:** place `headline-underline.svg` under a heading (see `.ds-headline-underline` on the home hero) for the brand’s sketched-underline accent.
- **Usage:** Supporting hero sections, empty states, editorial blocks — avoid competing with primary CTAs; pair with blob shapes rather than stacking on busy imagery.

### Filled icons (functional)

- **Role:** Wayfinding and **categorization** (e.g. workshop types: painting, pottery).
- **Color:** Filled functional markers **must use brand orange** (`var(--color-brand-primary)`). Icons should use `currentColor` on a control whose text/icon color is set to white on that orange ground (see `.fe-icon-btn--filled-brand` in `css/utilities.css`).
- **Labels:** Pair with **high-contrast** copy — default body/label text should use Charcoal (`var(--color-brand-dark)` / `var(--color-theme-2)`) on light surfaces per the color palette.

### Social / neutral icon buttons

- **Role:** Footer/social and “quiet” actions where orange fill is **not** required by brand.
- **CSS:** Base class `.fe-icon-btn` — neutral surface, orange on **hover**. Do not replace with `.fe-icon-btn--filled-brand` unless design explicitly asks for always-on orange.

## Blob shapes

- **Role:** Playful, welcoming **decorative** shapes and **masks** for photography.
- **Colors:** Decorative blobs use the brand accent family: **orange**, **lavender**, **lime** — map to `var(--color-brand-primary)`, `var(--color-light-purple)`, `var(--color-light-green)` (and large soft surfaces: `var(--color-soft-lavender)` where appropriate).
- **Implementation:** Organic silhouettes via large `border-radius`, SVG masks, or clip-path. Exact paths often live in **Figma exports** or Elementor image widgets + custom CSS; no single token defines every blob — keep shapes aligned with Figma components.

## Photography (editorial)

When placing images inside blob or rounded masks:

- Prefer **dynamic, engaging** shots and **diverse** groups where relevant to the story.
- Avoid crops that **cut off** people awkwardly or leave **large empty** areas inside the mask.
- These are **content** guidelines for editors and designers — not enforced in CSS.
- **Prototype assets:** photographs and social previews used by `design.foreveryone.berlin` are tracked in [`prototype/public/images/ASSETS.md`](../prototype/public/images/ASSETS.md) (hero, Open Graph card, etc.).

## CSS quick reference

| Pattern | Class / approach |
|--------|-------------------|
| Category / filled orange icon control | `.fe-icon-btn--filled-brand` (+ SVG with `fill="currentColor"`) |
| Social / neutral icon control | `.fe-icon-btn` |
| Decorative page bands | See `fe-page-bg-lavender`, `fe-page-bg-soft-lavender` in `css/base.css` |

Elementor: when adding custom classes to icon widgets, use the same class names the child theme enqueues from `utilities.css` (see [custom-css-setup.md](../elementor/custom-css-setup.md)).
