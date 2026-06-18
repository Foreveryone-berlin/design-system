# Visual styles — the four visual-element families

Brand guide summary for **ForEveryone Berlin**. The Brand Book v1.0 (p.24–27)
defines four visual-element families with distinct roles that must not be used
interchangeably: **workshop icons** and **graphic shapes** (functional /
structural) versus **line illustrations** and **decorative accent marks**
(atmospheric). **Figma** remains the visual source of truth; this page ties brand
rules to tokens and CSS utilities. See also [color-audit-2026.md](color-audit-2026.md)
for hex roles and approved background ⇄ text combinations, and
[logo-usage.md](logo-usage.md) for logo rules. Live specimens: `/visual-elements`
in the prototype.

**Workshop icon set (filled, solid, orange + white glyph)** ships in
`prototype/public/icons/categories/` and renders via the `CategoryIcon` React
component inside `.fe-card-category__icon`, with orange
(`var(--color-accent-icon)`) ground + white glyph. Per Brand Book p.24 these are
**solid filled** silhouettes — never outline/stroke, never shadow/gradient. Add a
category by dropping a **filled** SVG (`fill="currentColor"`, 48×48 viewBox) into
the folder and extending `CategoryIcon`.

## Iconography and illustration

### Workshop icons (canonical set)

Per Brand Book v1.0 p.24, workshop categories use a fixed, **filled solid** orange icon set (never outline/stroke; no shadow/gradient). Each icon is always paired with a category label and has interaction states on the category tag/label control: **Default · Hover · Active · Focused · Disabled**.

| Category | Asset / icon name | Tag label |
|----------|-------------------|-----------|
| Balance and Wellness | `balance-wellness` | `Balance and Wellness` |
| Movement | `movement` | `Movement` |
| Arts and Crafts | `arts-crafts` | `Arts and Crafts` |
| Expression | `expression` | `Expression` |
| Music | `music` | `Music` |

The five filled SVGs ship in `prototype/public/icons/categories/` and `CategoryIcon` maps these five canonical names. Legacy names (`painting`, `pottery`, `wellness`, `language`) remain as **aliases** mapping onto the canonical glyphs so existing usages and live content keep working.

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
- **Shipped set** in `prototype/public/illustrations/`: brand artwork `flower.png`, `smiley.png`, `swirl.png`, `strategy.png`, and `headline-underline.png` (exported from Figma); plus placeholder `cloud.svg`, `chess.svg`, `vase.svg` recreations. Figma remains the source of truth for any new or updated artwork.
- **Headline underline:** place `headline-underline.svg` under a heading (see `.ds-headline-underline` on the home hero) for the brand’s sketched-underline accent.
- **Usage:** Supporting hero sections, empty states, editorial blocks — avoid competing with primary CTAs; pair with blob shapes rather than stacking on busy imagery.

### Filled icons (functional)

- **Role:** Wayfinding and **categorization** (e.g. workshop types: painting, pottery).
- **Color:** Filled functional markers **must use brand orange** (`var(--color-brand-primary)`). Icons should use `currentColor` on a control whose text/icon color is set to white on that orange ground (see `.fe-icon-btn--filled-brand` in `css/utilities.css`).
- **Labels:** Pair with **high-contrast** copy — default body/label text should use Charcoal (`var(--color-brand-dark)` / `var(--color-theme-2)`) on light surfaces per the color palette.

### Social / neutral icon buttons

- **Role:** Footer/social and “quiet” actions where orange fill is **not** required by brand.
- **CSS:** Base class `.fe-icon-btn` — neutral surface, orange on **hover**. Do not replace with `.fe-icon-btn--filled-brand` unless design explicitly asks for always-on orange.

## Graphic shapes: blobs vs waves

Brand Book v1.0 p.27 defines two graphic-shape types with distinct roles that **must not be used interchangeably**.

### Blob shapes

- **Role:** Organic, rounded **containers** for photos and **colour blocks** behind text; soften photography and frame imagery.
- **Colors:** Decorative blobs use the brand accent family: **orange**, **lavender**, **lime** — map to `var(--color-brand-primary)`, `var(--color-light-purple)`, `var(--color-light-green)` (and large soft surfaces: `var(--color-soft-lavender)` where appropriate).
- **Implementation:** Organic silhouettes via large `border-radius`, SVG masks, or clip-path. Exact paths often live in **Figma exports** or Elementor image widgets + custom CSS; no single token defines every blob — keep shapes aligned with Figma components.

### Wave shapes

- **Role:** Soft **horizontal dividers** at the top or bottom edge of a section. Not containers, not masks — only edge dividers.
- **Colour:** Lime green (`var(--color-light-green)`); match the section they edge.
- **Shipped set:** `prototype/public/illustrations/waves/wave-divider.svg` (bottom edge) and `wave-divider-alt.svg` (top edge). Use `preserveAspectRatio="none"` and stretch full-width.

## Decorative accent marks

Brand Book v1.0 p.26 — used sparingly, orange prioritised, never the focal point. Two types, shipped in `prototype/public/illustrations/accents/`:

- **Doodle strokes:** `doodle-underline.svg`, `doodle-arrow.svg`, `doodle-circle.svg` — hand-drawn marks beneath headings/titles for a playful, handmade feel.
- **Sparkle / asterisk / music note:** `sparkle.svg`, `asterisk.svg`, `music-note.svg` — small marks that add energy to titles and announcements.

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
