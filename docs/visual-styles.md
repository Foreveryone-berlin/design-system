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
`prototype/public/icons/categories/` (five canonical categories) and
`prototype/public/icons/workshop/` (activity/subcategory glyphs). Renders via
`CategoryIcon` and `ActivityIcon` (CSS mask + `currentColor`) inside
`.fe-card-category__icon`, `.fe-workshop-icon`, or `.fe-icon-btn--filled-brand`,
with orange (`var(--color-accent-icon)`) ground + white glyph. Per Brand Book p.24
these are **solid filled** silhouettes — never outline/stroke, never shadow/gradient.
Add a category by dropping a **filled** SVG (`fill="currentColor"`) into
`prototype/public/icons/categories/` and extending `CategoryIcon`. Re-import from
Figma with `node scripts/import-figma-elements.mjs` or from a desktop SVG drop with
`node scripts/import-desktop-elements.mjs --source=PATH` (see **Refreshing visual-element SVGs** below).

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

The five filled SVGs ship in `prototype/public/icons/categories/` and `CategoryIcon` loads them via CSS mask (white glyph on orange ground). Legacy names (`painting`, `pottery`, `wellness`, `language`) remain as **aliases** mapping onto the canonical glyphs so existing usages and live content keep working. **Balance and Wellness** still uses the in-repo redraw (`balance-wellness.svg`); no matching glyph was in the July 2026 Figma element export.

### Activity / subcategory icons

Beyond the five canonical categories, activity-specific filled icons (knitting, pottery, thread, chess, writing) live in `prototype/public/icons/workshop/` and render via `ActivityIcon`. Use them on activity cards and filter bars where the subcategory is more specific than the top-level category.

### Icon size tiers

Three size modifiers align with common component contexts (see `/visual-elements` and `/components` size matrices):

| Tier | CSS modifier | Chip box | Glyph | Typical context |
|------|--------------|----------|-------|-----------------|
| Small | `.fe-workshop-icon--sm` | 24×24px | 14px | Category tag pill, filter bar |
| Medium | `.fe-workshop-icon--md` | 40×40px | 20px | Icon button (`.fe-icon-btn--filled-brand`) |
| Large | `.fe-workshop-icon--lg` | 80×80px | 52px | Visual-elements specimen, card hero badge |

Glyph-only rendering (no orange chip) is available via `chip={false}` on `CategoryIcon` / `ActivityIcon` when the parent already supplies the orange ground (e.g. `.fe-card-category__icon`).

### Category tag colours (hover / active)

The brand book defines five categories but not per-category chroma. The repo maps each `.fe-tag-pill--*` modifier to a distinct decorative tint on hover/active (Charcoal labels throughout). Alert blue is **not** used. See [`spec/components/tag-pill.md`](../spec/components/tag-pill.md) for the token table. Official category-colour rules are pending a future brand-book revision.

### UI / functional icons

Beyond categories, the system uses a small set of UI glyphs (seen in the brand guidelines and style guide). Document and ship these as `currentColor` SVGs so they inherit control colour:

| Icon | Where | Asset / class |
|------|-------|----------------|
| Icon button (states: default/hover/focused/disabled) | quiet actions, social | `.fe-icon-btn` (+ `--filled-brand` for always-on orange) |
| Social network | footer row | `icons/social/*.svg` inside `.fe-icon-btn` with `aria-label` |
| Play button | media/video affordances | filled orange circle + white triangle glyph |
| Dropdown chevron | nav dropdowns, selects, FAQ accordions | inline chevron SVG, rotates on open |
| Arrow (right) | "Book Now" / "Explore all" CTAs | `arrow-right.svg` |
| External link | outbound links | `external-link.svg` |

Prototype IA split:
- `prototype/app/components/page.tsx` catalogs **UI/action icons** and **component-specific icons**.
- `prototype/app/visual-elements/page.tsx` catalogs **illustrations**, **decorative accents**, and **graphic shapes**.

### Line illustrations (doodles)

- **Role:** Decorative “doodle” marks — warmth, hand-drawn personality (e.g. the orange flower beside *Our Impact* and the sketched underline beneath the *SheLeads* / home headline).
- **Colour:** Drawn in **brand orange** (decorative use), matching the filled-illustration family; do not recolour to blue.
- **Shipped atmospheric set** in `prototype/public/illustrations/`: `flower.svg`, `smiley.svg`, `cloud.svg`, `sprout.svg`, plus contextual scene marks (`group.svg`, `knitting-line.svg`, `pottery-line.svg`, `movement-line.svg`, `chess.svg`). Import via `scripts/import-figma-elements.mjs` or `scripts/import-desktop-elements.mjs`. `coffee-cup.svg` and `donation-box.svg` ship in the same folder but are functional/UI doodles, not atmospheric line illustrations. `vase.svg` and `qr-foreveryone.svg` remain in-repo redraws. Figma remains the source of truth for any new or updated artwork.
- **Variant catalog:** additional Canva exports live in `prototype/public/illustrations/variants/line/` and are shown on the Visual Elements page as optional alternatives.
- **Headline underline:** `headline-underline.svg` (from `Doodle_Double_Underlines_2_2`) sits under a heading via `.ds-headline-underline` on the home hero and pattern specimens. The import script repairs SVGO-stripped fills on this asset automatically.
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
- **Shipped set:** `prototype/public/illustrations/waves/wave-h1.svg`, `wave-h2.svg`, and `wave-h3.svg` (full-width crests), plus `wave-corner-tr.svg` and `wave-corner-br.svg` (corner variants). Use `preserveAspectRatio="none"` and stretch full-width where appropriate.

## Decorative accent marks

Brand Book v1.0 p.26 — used sparingly, orange prioritised, never the focal point. Two types, shipped in `prototype/public/illustrations/accents/`:

- **Doodle strokes:** `doodle-underline.svg`, `doodle-arrow.svg`, `doodle-circle.svg` — hand-drawn marks beneath headings/titles for a playful, handmade feel.
- **Sparkle / asterisk / music note:** `sparkle.svg`, `asterisk.svg`, `music-note.svg` — small marks that add energy to titles and announcements.
- **Variant catalog:** alternate decorative exports are stored in `prototype/public/illustrations/variants/accents/` and cataloged in the Visual Elements specimens.

## Photography (editorial)

When placing images inside blob or rounded masks:

- Prefer **dynamic, engaging** shots and **diverse** groups where relevant to the story.
- Avoid crops that **cut off** people awkwardly or leave **large empty** areas inside the mask.
- These are **content** guidelines for editors and designers — not enforced in CSS.
- **Prototype assets:** photographs and social previews used by `design.foreveryone.berlin` are tracked in [`prototype/public/images/ASSETS.md`](../prototype/public/images/ASSETS.md) (hero, Open Graph card, etc.).

## CSS quick reference

| Pattern | Class / approach |
|--------|-------------------|
| Category / filled orange icon control | `.fe-icon-btn--filled-brand`, `.fe-workshop-icon--sm|--md|--lg` (+ SVG with `fill="currentColor"`) |
| Social / neutral icon control | `.fe-icon-btn` |
| Decorative page bands | See `fe-page-bg-lavender`, `fe-page-bg-soft-lavender` in `css/base.css` |
| Composite layout patterns | Prototype `/patterns`; catalog in [`spec/patterns/README.md`](../spec/patterns/README.md) |

Elementor: when adding custom classes to icon widgets, use the same class names the child theme enqueues from `utilities.css` (see [custom-css-setup.md](../elementor/custom-css-setup.md)).

## Refreshing visual-element SVGs from Figma

When design ships an updated **ForEveryone Elements** export:

1. Save the zip as `ForEveryone_Elements.zip` at the repository root (gitignored).
2. Extract: `unzip -o ForEveryone_Elements.zip -d .` (ignore `__MACOSX/`).
3. Run: `node scripts/import-figma-elements.mjs` from the repo root.
4. Visually check `/visual-elements`, `/patterns`, and the home hero underline in the prototype.

**Desktop SVG drop (July 2026):** when individual SVGs land on the designer desktop export folder, run:

```bash
node scripts/import-desktop-elements.mjs --source="C:/Users/marco/Desktop"
```

Maps filenames like `Icon_Knitting_2.svg`, `Facebook.svg`, and `Doodle_Double_Underlines_2_2.svg` into `prototype/public/`. Post-processes `headline-underline.svg` after SVGO so fills survive.
Variant exports (for example `Doodle_Sparkle_1.svg`, `Doodle_Double_Underlines_1.svg`, `Icon_Pottery_3.svg`) are mapped into `prototype/public/illustrations/variants/` and `prototype/public/icons/variants/`.

The Figma script maps zip filenames to `prototype/public/` paths, strips Figma canvas backgrounds, recolors brand fills to `currentColor`, and optionally runs SVGO. It does **not** replace assets with no zip counterpart (Balance and Wellness category icon, blob shapes 5–7, wave corner variants, UI icons, favicon, QR code, or vase illustration). Update the mapping table in `scripts/import-figma-elements.mjs` when Figma adds or renames exports.
