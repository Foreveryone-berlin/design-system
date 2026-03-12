# ForEveryone Berlin Design Audit

This audit is based on the pre-extracted Phase 1 dataset from the project brief. Token values in this document are treated as locked ground truth for implementation in this repository.

## Project Context

- Site: <https://foreveryone.berlin/>
- Stack: WordPress + Elementor Pro + custom CSS
- Figma source: <https://www.figma.com/design/QKks3ov9RS4CltsYLfRZod/Design-File>
- Organization: For Everyone (Berlin NGO focused on belonging, workshops, events, and community cafe activities)

## Color Tokens (Ground Truth)

### Neutral

- `color.neutral.50`: `#FAFAFA`
- `color.neutral.100`: `#F5F5F5`
- `color.neutral.200`: `#E5E5E5`
- `color.neutral.300`: `#D4D4D4`
- `color.neutral.400`: `#A3A3A3`
- `color.neutral.500`: `#737373`
- `color.neutral.600`: `#525252`
- `color.neutral.700`: `#404040`
- `color.neutral.800`: `#262626`
- `color.neutral.900`: `#1E1E1E` (Neutral_main)
- `color.neutral.1000`: `#0A0A0A`

### Primary (Orange)

- `color.primary.50`: `#FFF2EB`
- `color.primary.100`: `#FFE4D8`
- `color.primary.150`: `#FFD7C4`
- `color.primary.200`: `#FFCAB0`
- `color.primary.300`: `#FFAF89` (Peach)
- `color.primary.400`: `#FF9561`
- `color.primary.500`: `#FF7A3A` (Orange_main)
- `color.primary.600`: `#CC622E`
- `color.primary.700`: `#994923`
- `color.primary.800`: `#663117`
- `color.primary.900`: `#33180C`

### Secondary (Green)

- `color.secondary.green.50`: `#F8FCF6`
- `color.secondary.green.100`: `#F6FAEE`
- `color.secondary.green.150`: `#F2F7E5`
- `color.secondary.green.200`: `#EEF5DC`
- `color.secondary.green.300`: `#E5F0CB`
- `color.secondary.green.400`: `#DDEBB9`
- `color.secondary.green.500`: `#D4E8A8` (Green_main)
- `color.secondary.green.600`: `#AAB686`
- `color.secondary.green.700`: `#7F8A65`
- `color.secondary.green.800`: `#555C43`
- `color.secondary.green.900`: `#2A2E22`

### Secondary (Blue)

- `color.secondary.blue.50`: `#ECE5FD`
- `color.secondary.blue.100`: `#D9CCF8`
- `color.secondary.blue.150`: `#C5B2F3`
- `color.secondary.blue.200`: `#B299F7`
- `color.secondary.blue.300`: `#8B299F`
- `color.secondary.blue.400`: `#6533EF`
- `color.secondary.blue.500`: `#3F00EB` (Blue_main)
- `color.secondary.blue.600`: `#3200BC`
- `color.secondary.blue.700`: `#26008D`
- `color.secondary.blue.800`: `#19005E`
- `color.secondary.blue.900`: `#0D002F`

### Secondary (Lavender/Purple)

- `color.secondary.lavender.50`: `#FBF9FF`
- `color.secondary.lavender.100`: `#F7F3FF`
- `color.secondary.lavender.150`: `#F2EEFF`
- `color.secondary.lavender.200`: `#EEE8FF`
- `color.secondary.lavender.300`: `#E6DCFF`
- `color.secondary.lavender.400`: `#D0D1FF` (Lavender_Light)
- `color.secondary.lavender.500`: `#D5C5FF` (Lavender_main)
- `color.secondary.lavender.600`: `#AA9ECC`
- `color.secondary.lavender.700`: `#807699`
- `color.secondary.lavender.800`: `#554F66`
- `color.secondary.lavender.900`: `#2B2733`

### Semantic / Status (As Audited)

- `color.status.error`: `#FBF9FF` (light tint swatch in Figma)
- `color.status.success`: `#F7F3FF` (light tint swatch in Figma)
- `color.status.warning`: `#F2EEFF` (light tint swatch in Figma)

Implementation note for this repository: component-level visible error border target defaults to `#DC2626` pending live validation style confirmation.

## Typography Tokens (Ground Truth)

### Font families

- Heading/display: `Filson Pro` (primary)
- Accent/additional: `Young Serif`
- Body/UI: `Filson Pro`

### Type styles

- `typography.h1.main`: Filson Pro, 84px (5.25rem), 900, line-height 80%, letter-spacing -2%
- `typography.h1.additional`: Young Serif, 84px (5.25rem), 900, line-height 80%, letter-spacing -2%
- `typography.h2.default`: Filson Pro, 48px (3rem), 700, line-height 100%, letter-spacing -2%
- `typography.h3.default`: Filson Pro, 20px (1.25rem), 700, line-height 100%, letter-spacing -2%
- `typography.h3.additional`: Young Serif, 20px (1.25rem), 700, line-height 100%, letter-spacing -2%
- `typography.body.regular`: Filson Pro, 16px (1rem), 400, line-height 140%, letter-spacing 0%
- `typography.body.medium`: Filson Pro, 16px (1rem), 500, line-height 140%, letter-spacing 0%
- `typography.input.default`: Filson Pro, 16px (1rem), 400, line-height 140%, letter-spacing 0%
- `typography.button.default`: Filson Pro, 16px (1rem), 500, line-height 140%, letter-spacing 0%
- `typography.tag.default`: Filson Pro, 12px (0.75rem), 500, line-height 100%, letter-spacing 0%
- `typography.label.default`: Filson Pro, 12px (0.75rem), 400, line-height 100%, letter-spacing 0%

## Component Inventory (Figma)

### Buttons

- `Primary_button`
- `Secondary_button`
- `Icon_button`
- `Icon_buttonW`
- `Play_button`

### Navigation

- `Header/footer Item` with chevron and orange underline on hover

### Filter tags / category pills

- Tag variant pills with workshop categories
- States: default, hover, active, focused

### Cards

- `Workshop_card`
- `card-benefit`
- `Card-get-involved`

### Forms

- `Input-field` states: default, hover, active/focus, disabled, error

### Other components

- `FAQ_item` accordion
- `Dropdown-item` and `Dropdown`
- Footer links and nav items with arrow icons

### Icon set in use

- chevron-down, arrow-right, instagram, whatsapp, linkedin, check-circle, clock, location-pin, close, plus, minus, phone, play, mail

## Page Layout Patterns

- Header: fixed navigation, logo left, links center, CTA right, social icons
- Hero: large mixed-font H1 with subtitle and CTAs; organic/blob image shape
- Section backgrounds: white, neutral 50, lavender 400, transparent/inherited
- Footer: lavender background with link columns, newsletter form, social row
- Modal/popup: centered white card, close button top-right, full-width primary CTA
- Image treatment: blob/organic masks via high-radius or clip-path
- Spacing: section vertical ~80-100px desktop and ~40-60px mobile, card gap ~24px, container ~1200-1280px

## Known Inconsistencies to Resolve

1. Navbar background: standardize to solid white with scroll shadow behavior.
2. H1 mixed typography pattern: intentional and should be documented as a pattern.
3. Status colors: Figma swatches are light tints; visible error red in components should be verified against live form validation styles.
4. Filson Pro loading source should be documented (child theme `@font-face` or plugin origin).
5. Elementor Global Colors should be normalized to token mappings and mismatches flagged.

## Elementor Global Settings Constraints

Elementor uses DB-stored global settings rather than CSS custom properties directly. This repository bridges via generated custom properties and documented manual mapping in Elementor UI.

### Proposed global color mapping

- Primary -> `color.primary.500` -> `#FF7A3A`
- Primary Dark -> `color.primary.600` -> `#CC622E`
- Primary Light -> `color.primary.300` -> `#FFAF89`
- Secondary Blue -> `color.secondary.blue.500` -> `#3F00EB`
- Secondary Lavender -> `color.secondary.lavender.400` -> `#D0D1FF`
- Secondary Green -> `color.secondary.green.500` -> `#D4E8A8`
- Neutral Dark -> `color.neutral.900` -> `#1E1E1E`
- Neutral Mid -> `color.neutral.500` -> `#737373`
- Neutral Light -> `color.neutral.100` -> `#F5F5F5`
- White -> `#FFFFFF`
- Error -> `color.status.error` -> `#DC2626`

### Proposed global font mapping

- Primary -> `typography.h1.main` (Filson Pro, Black, 84px)
- Secondary -> `typography.h1.additional` (Young Serif, Black, 84px)
- Body -> `typography.body.regular` (Filson Pro, Regular, 16px)
- Accent -> `typography.h2.default` (Filson Pro, Bold, 48px)

## References

- Elementor global settings overview: <https://elementor.com/funktionen/global-settings/>
- Elementor Global Colors: <https://elementor.com/help/theme-style-global-settings/>
- Elementor Global Fonts: <https://elementor.com/help/view-and-edit-global-fonts/>
