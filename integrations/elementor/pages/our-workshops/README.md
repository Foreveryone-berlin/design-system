# Our Workshops redesign

A redesign of [/our-workshops/](https://foreveryone.berlin/our-workshops/) that follows the section rhythm of the [Clay Connections course page](https://foreveryone.berlin/courses/clay-connections-course-pottery/): hero, facts strip, why, workshop grid, an evening timeline, testimonials, calendar, what is included, prices, FAQ, final CTA.

Copy, prices, dates, venues and testimonials are placeholders until the team supplies the real ones.

## Files

| File | Purpose |
| --- | --- |
| `template.html` | Design source built on the shared `css/` layers and `fe-*` classes. |
| `build.mjs` | Inlines CSS, photos and brand SVGs into one preview file. |

```bash
node integrations/elementor/pages/our-workshops/build.mjs our-workshops-preview.html
```

## Elementor draft

- Page **15525**, status **draft**, title "Our Workshops (redesign draft)". Edit: `https://foreveryone.berlin/wp-admin/post.php?post=15525&action=elementor`.
- Built from V4 atomic elements only (`e-flexbox`, `e-grid`, `e-heading`, `e-paragraph`, `e-button`, `e-image`, `e-svg`, `e-accordion`). The FAQ accordion emits FAQPage structured data.
- Anchors: the workshop section has CSS ID `workshops`, the calendar `calendar`.
- Photos come from the Media Library: 15075 (hero), 14251, 14939, 9050, 9404, 13305, 7066 (cards); headline underline SVG 14406.

### Global classes added to the kit

All prefixed `ow-` so they cannot collide with theme or `fe-*` classes. Values are token hex values from [global-colors.md](../../global-colors.md), because the kit has no global variables.

| Class | Role |
| --- | --- |
| `ow-section`, `ow-wrap`, `ow-head` | Section band, 1280px column, section heading stack |
| `ow-eyebrow`, `ow-h2`, `ow-h3`, `ow-lede`, `ow-body-sm`, `ow-meta` | Type roles |
| `ow-btn-primary`, `ow-btn-secondary` | `fe-btn-primary` / `fe-btn-secondary` equivalents |
| `ow-card`, `ow-card-img`, `ow-card-body`, `ow-chips`, `ow-chip`, `ow-chip-course`, `ow-price-row`, `ow-price` | Workshop card |
| `ow-grid-3`, `ow-panel` | Three-column card grid, white rounded panel |
| `ow-row`, `ow-date`, `ow-spots`, `ow-spots-low`, `ow-spots-full` | Calendar row and availability chip |

Modifier classes (`ow-chip-course`, `ow-spots-low`, `ow-spots-full`) sit at the top of the kit priority order so they override their base class.

## Differences from the preview

- No category filter: atomic widgets have no script hook. Replace the static grid with a Loop over the workshop post type plus a filter widget when the content model is ready.
- No category or activity icons: those SVGs are not in the Media Library yet.
- "Book workshop" buttons other than Clay Connections point to `#`; wire them to the booking flow before publishing.

## Publish checklist

1. Replace placeholder copy, prices, dates and testimonials.
2. Wire booking links.
3. Run [docs/integration-checklist.md](../../../../docs/integration-checklist.md) on the draft preview.
4. Swap the live `/our-workshops/` page content or redirect, then delete the draft.
