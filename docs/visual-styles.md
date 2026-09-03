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
`prototype/public/icons/workshop/` (activity/subcategory glyphs). Renders via the
single `FeIcon` component (`prototype/app/_components/FeIcon.tsx`) using CSS mask +
`currentColor` inside `.fe-card-category__icon`, `.fe-workshop-icon`, or
`.fe-icon-btn--filled-brand`, with orange (`var(--color-accent-icon)`) ground + white
glyph. Per Brand Book p.24 these are **solid filled** silhouettes — never
outline/stroke, never shadow/gradient. Add a category by dropping a **filled** SVG
(`fill="currentColor"`) into `prototype/public/icons/categories/` and extending the
`category` name union in `FeIcon`. Re-import from Figma with
`node scripts/import-figma-elements.mjs` or from a desktop SVG drop with
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

The five filled SVGs ship in `prototype/public/icons/categories/` and `FeIcon` loads them via CSS mask (white glyph on orange ground). Legacy names (`painting`, `pottery`, `wellness`, `language`) remain as **aliases** mapping onto the canonical glyphs so existing usages and live content keep working. **Balance and Wellness** still uses the in-repo redraw (`balance-wellness.svg`); no matching glyph was in the July 2026 Figma element export.

### Activity / subcategory icons

Beyond the five canonical categories, activity-specific filled icons (knitting, pottery, thread, chess, writing) live in `prototype/public/icons/workshop/` and render via `FeIcon` with `set="activity"`. Use them on activity cards and filter bars where the subcategory is more specific than the top-level category.

### Icon size tiers

Three size modifiers align with common component contexts (see `/visual-elements` and `/components` size matrices):

| Tier | CSS modifier | Chip box | Glyph | Typical context |
|------|--------------|----------|-------|-----------------|
| Small | `.fe-workshop-icon--sm` | 24×24px | 14px | Category tag pill, filter bar |
| Medium | `.fe-workshop-icon--md` | 40×40px | 20px | Icon button (`.fe-icon-btn--filled-brand`) |
| Large | `.fe-workshop-icon--lg` | 80×80px | 52px | Visual-elements specimen, card hero badge |

Glyph-only rendering (no orange chip) is available via `chip={false}` on `FeIcon` when the parent already supplies the orange ground (e.g. `.fe-card-category__icon`).

### Unified icon component

The prototype renders every icon through the single `FeIcon` component (`prototype/app/_components/FeIcon.tsx`):

| Family | Asset folder | Render path | Use case |
|--------|--------------|-------------|----------|
| `category` | `public/icons/categories/` | CSS mask | Top-level category chips, tags, badges |
| `activity` | `public/icons/workshop/` | CSS mask | Subcategory/workshop-specific glyphs |
| `social` | `public/icons/social/` | CSS mask | Footer and contact icon buttons |
| `ui` | inline paths in `ui-glyph-markup.ts`, mirrored to `public/icons/ui/*.svg` | inline SVG | Navigation, controls, copy/check, play, close |
| `file` | `public/icons/arrow-right.svg`, `external-link.svg` | `<img>` | CTA and outbound-link glyphs |

`FeIcon` takes a type-safe `set` + `name`, plus `size` (`sm`, `md`, `lg`) and `chip` (`true` wraps the glyph in the orange `.fe-workshop-icon` chip). Use `chip={false}` when the icon lives inside a parent that already sets the ground and colour, such as `.ds-icon-chip` or `.fe-icon-btn`. The legacy `CategoryIcon` and `ActivityIcon` components have been removed; all call sites now use `FeIcon`.

### Category tag colours (hover / active)

The brand book defines five categories but not per-category chroma. The repo maps each `.fe-tag-pill--*` modifier to a distinct decorative tint on hover/active (Charcoal labels throughout). Alert blue is **not** used. See [`spec/components/tag-pill.md`](../spec/components/tag-pill.md) for the token table. Official category-colour rules are pending a future brand-book revision.

### UI / functional icons

Beyond categories, the system uses a small set of UI glyphs (seen in the brand guidelines and style guide). Document and ship these as `currentColor` SVGs so they inherit control colour:

| Icon | Where | Asset / class |
|------|-------|----------------|
| Icon button (states: default/hover/focused/disabled) | quiet actions, social | `.fe-icon-btn` (+ `--filled-brand` for always-on orange) with `FeIcon` |
| Social network | footer row | `FeIcon set="social"` inside `.fe-icon-btn` with `aria-label` |
| Play button | media/video affordances | `FeIcon set="ui" name="play"` inside filled orange circle |
| Dropdown chevron | nav dropdowns, selects, FAQ accordions | `FeIcon set="ui" name="chevron-down"`, rotates on open via CSS |
| Arrow (right) | "Book Now" / "Explore all" CTAs | `FeIcon set="file" name="arrow-right"` |
| External link | outbound links | `FeIcon set="file" name="external-link"` |

Prototype IA split:
- `prototype/app/visual-elements/page.tsx` is the **single source of truth** for the canonical icon catalog: category icons, activity icons, social icons, and UI glyphs. Every specimen is itself a download control (`AssetTile`): the whole tile is an `<a download>` and the caption reads `Name - SVG ↓`, underlined, in the label's own colour, so a dense grid gains no extra link rows. The 13 stroke glyphs render inline from `app/_components/ui-glyph-markup.ts`; `node prototype/scripts/build-ui-glyphs.mjs` writes the same markup to `prototype/public/icons/ui/*.svg` so they download like every other family, and `npm test` runs it with `--check` so a shipped file can never drift from what the page renders.
- `prototype/app/components/page.tsx` keeps a compact **icon preview** plus in-context icon button examples; point readers to Visual Elements for downloads.
- `prototype/app/visual-elements/page.tsx` also catalogs **illustrations**, **decorative accents**, and **graphic shapes** (illustration assets stay separate from the icon catalog).

**Downloading icons (non-developers):** open [Visual Elements](https://design.foreveryone.berlin/visual-elements), find the icon you need, and click it. The file saves straight from the page, already in its brand colour. Only the canonical sets are for production.

**Asset colour when opened on its own:** shipped SVGs paint with `currentColor` so CSS masks and inline use can tint them from a token, which would otherwise render a downloaded file black. Each asset therefore carries a root `color` presentation attribute holding its family default: orange `#FF7A3A` for category, activity, illustration, and accent assets; Soft Lavender `#E5DCFF` for blobs; Lime Green `#D4E6AB` for waves; Charcoal `#1E1E1E` for social. Presentation attributes carry zero specificity, so any CSS `color` rule still wins. `scripts/svg-normalize.mjs` stamps it on import (`STANDALONE_COLOR`), `node scripts/svg-standalone-color.mjs` backfills existing assets, and `npm test` runs it with `--check`. Never save an asset from a `github.com/…/blob/…` page: that view is HTML, so the saved `.svg` fails as "XML Parsing Error: not well-formed". Use **Download raw file** instead.

### Line illustrations (doodles)

- **Role:** Decorative “doodle” marks — warmth, hand-drawn personality (e.g. the orange flower beside *Our Impact* and the sketched underline beneath the *SheLeads* / home headline).
- **Colour:** Drawn in **brand orange** (decorative use), matching the filled-illustration family; do not recolour to blue.
- **Shipped atmospheric set** in `prototype/public/illustrations/`: `flower.svg`, `smiley.svg`, `cloud.svg`, `sprout.svg`, plus contextual scene marks (`group.svg`, `knitting-line.svg`, `pottery-line.svg`, `movement-line.svg`, `chess.svg`). Import via `scripts/import-figma-elements.mjs` or `scripts/import-desktop-elements.mjs`. `coffee-cup.svg` and `donation-box.svg` ship in the same folder but are functional/UI doodles, not atmospheric line illustrations. `vase.svg` and `qr-foreveryone.svg` remain in-repo redraws. Figma remains the source of truth for any new or updated artwork.
- **Variant catalog:** additional Canva exports live in `prototype/public/illustrations/variants/line/` and are shown on the Visual Elements page as optional alternatives.
- **Headline underline:** `headline-underline.svg` (from `Doodle_Double_Underlines_2_2`) sits under a heading via `.ds-headline-underline` on the home hero and pattern specimens, stretched to the headline text width. The import script repairs SVGO-stripped fills on this asset automatically.
- **Usage:** Supporting hero sections, empty states, editorial blocks, and **benefit / get-involved card leads** (`.fe-card-benefit__illustration`) — avoid competing with primary CTAs; pair with blob shapes rather than stacking on busy imagery. Do **not** substitute decorative accent marks here.

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
- **Do not** use accent marks (or their variants) as benefit-card leads; those slots use **line illustrations**. Accents stay on headings, titles, and announcements.

## Photography (editorial)

When placing images inside blob or rounded masks:

- Prefer **dynamic, engaging** shots and **diverse** groups where relevant to the story.
- Avoid crops that **cut off** people awkwardly or leave **large empty** areas inside the mask.
- These are **content** guidelines for editors and designers — not enforced in CSS.
- **Prototype assets:** photographs and social previews used by `design.foreveryone.berlin` are tracked in [`prototype/public/images/ASSETS.md`](../prototype/public/images/ASSETS.md) (hero, Open Graph card, etc.).

### Portrait placeholders

`prototype/public/illustrations/avatars/avatar-1.svg` … `avatar-5.svg` are five generic head-and-shoulders silhouettes (short hair, bob, top bun, side ponytail, curly) for the person patterns on `/patterns`. They exist so a roster specimen documents the layout without putting anyone's face in the design system, and they follow the illustration family convention: `fill="currentColor"` with the orange standalone `color` attribute.

- **Use for:** prototype specimens, Figma-to-Elementor mockups, and any slot waiting on a real portrait.
- **Do not** ship them on the live site, and do not add them to the Visual Elements download catalog: they are placeholders, not brand artwork.
- The silhouettes have transparent backgrounds; the tinted disc behind them comes from `.fe-person__photo`, so swapping in a real photograph is only a file change.

## CSS quick reference

| Pattern | Class / approach |
|--------|-------------------|
| Category / filled orange icon control | `FeIcon` with `set="category"`, plus `.fe-icon-btn--filled-brand` or `.fe-workshop-icon--sm|--md|--lg` |
| Social / neutral icon control | `FeIcon` with `set="social"` inside `.fe-icon-btn` |
| Benefit / get-involved card lead | Line illustration via `.fe-card-benefit__illustration` (not accent marks) |
| Decorative accent on a heading | `.ds-accent-mark` / assets under `illustrations/accents/` |
| Person: photo + name + optional role and bio | `.fe-person` (`--card` for the bio variant) inside `.fe-people-grid` (`--cards`); portraits from `illustrations/avatars/` until real photos land |
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
Variant exports (for example `Doodle_Sparkle_1.svg`, `Doodle_Double_Underlines_1.svg`) are mapped into `prototype/public/illustrations/variants/`.

The Figma script maps zip filenames to `prototype/public/` paths, strips Figma canvas backgrounds, recolors brand fills to `currentColor`, and optionally runs SVGO. It does **not** replace assets with no zip counterpart (Balance and Wellness category icon, blob shapes 5–7, wave corner variants, UI icons, favicon, QR code, or vase illustration). Update the mapping table in `scripts/import-figma-elements.mjs` when Figma adds or renames exports.
