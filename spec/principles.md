# Design principles (deterministic rules for agents)

Source of truth: ForEveryone Brand Book v1.0 (June 2026), with the colour rules
superseded by the October 2026 palette update (ahead of Brand Book v2.0). These are the
non-negotiable rules an agent must apply when generating or redesigning UI with
this system. Tokens are in [tokens.json](tokens.json); CSS variables are in
`css/custom-properties.css`.

## Colour

### Approved background ⇄ text pairings (use only these)

| Background | CSS var | Text | Contrast |
|---|---|---|---|
| Warm White `#FDFCF7` | `--color-background-default` | Charcoal | 16.23:1 |
| Lavender `#E5DCFF` | `--color-background-soft` | Charcoal | 12.71:1 |
| Lime Green `#D4E6A8` | `--color-background-title` | Charcoal | 12.45:1 |
| Pink `#FADCD2` | `--color-blush` | Charcoal | 12.89:1 |
| Navy `#1F3A6E` | `--color-navy` | White `#FFFFFF` | 11.12:1 |
| Teal `#0F6E6E` | `--color-teal-deep` | White `#FFFFFF` | 6.04:1 |
| Blue `#3F00EB` | `--color-background-alert` | White `#FFFFFF` | 8.71:1 |

### Never use (fails contrast)

- Orange background + White text (2.59:1)
- Lime Green background + White text (1.33:1)
- Soft Lavender background + White text (1.31:1)
- Blue background + Charcoal text (1.91:1)

### Colour rules

- **Orange** (`--color-brand-primary`) is **accent only** and must appear in
  every layout: filled icons, blobs, marks, borders. Never text, buttons, or
  links, and never a full background behind text. Only structural exceptions:
  the QR-code border, and the white standalone logo icon on orange (no text).
- **Warm White, Lavender, Lime Green** are the default backgrounds; Charcoal
  text only.
- **Navy, Teal** are occasional backgrounds for covers and standout moments;
  white text only.
- **Blue** (`--color-brand-secondary`) is flexible: backgrounds and primary
  buttons, white text only. Digital only, never print. Button hover and pressed
  states use Orange (`--color-brand-primary`, `--color-focus-button`), pending brand-team confirmation.
- **Pink** (`--color-blush`) is for occasional backgrounds and supportive UI
  (charts, tags, chips, active states); Charcoal text only.
- **Yellow** (`--color-yellow`) is decorative shapes and marks on Navy or Teal
  only; never text or a background.
- **Charcoal** (`--color-brand-dark`) and **White** (`--color-white`) are text
  and logo only; never a full background. Use Warm White for page backgrounds.
- `--color-light-purple` (`#D5C5FF`) and other colours outside this list are
  pending Brand Book v2.0; do not use them in new work.
- **Extending the palette:** work in OKLCH — hold hue and lightness, step the
  chroma. Never invent hex values.

## Typography

- **Filson Pro** for everything digital (six styles: Regular, Regular Italic,
  Medium, Medium Italic, Bold, Bold Italic). **Young Serif is print only** —
  never load or use `--font-family-accent` on the web.
- Roles: Display / H1 / H2 = Bold; Subheading = Medium; Body = Regular; Caption
  = Medium; Emphasis = Italic (publication names, artwork titles, highlighted
  phrases).
- Letter-spacing 0% for all weights. Body line-height never below 1.5.

## Layout

- Grid margins: 48–64px (digital). Left-align body and headings by default;
  centre display headlines on full-bleed title slides only. Never justify; never
  centre-align body copy of 3+ lines; never hyphenate line ends; bullets only
  for 2+ items.
- White space is an active decision: when in doubt, reduce content, not spacing.
- QR codes: solid Orange rounded-corner border on White/Warm White.

## Spacing, radius, shadow, motion

- Spacing is an 8-point-derived scale (`--spacing-1`…`--spacing-32`).
- Radius tokens `--radius-sm|md|lg|xl|card|pill|circle`.
- One shared `ease` curve at three durations (`--transition-fast|base|slow`).
  Every animated surface must respect `prefers-reduced-motion`.

## Digital vs print

- `surface: "print"` tokens (`--color-print-*`, `--color-doc-*`,
  `--font-family-accent`) are **print/physical only** and must never appear in
  web UI. Blue is substituted by print purple in CMYK; document greys are Brand
  Book chrome, not the brand palette.
- Print values for the October 2026 colours are still being set: confirm with
  the brand team before using any of them in print.

## Logo — at a glance

| | ForEveryone | No. 52 Cafe |
|---|---|---|
| Primary format | Horizontal (default) | `No. 52` wordmark |
| Secondary | Stacked, standalone icon | `52` inside the `o` (compact) |
| Min digital | 32px wide | 32px (primary) / 40px (secondary) |
| Min print | 8mm wide | 8mm (primary) / 10mm (secondary) |
| Approved colours | Charcoal, White | Charcoal, White |
| Safe zone | 1X = cap-height of F, all sides | ½ height of N, all sides |

- One background → one logo colour (see Colour pairings). Standalone white icon
  only on Orange, no text. On photos, place the logo on a brand-coloured blob
  that extends ≥1X beyond the logo; blob colours are Lime, Soft Lavender, Warm
  White only.

## People

Refer to people by **first name only** anywhere in the system (e.g. "Roxana,
co-founder"). No last names.
