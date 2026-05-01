# Getting Started

Welcome to the ForEveryone Berlin design system repository.

## What This Repo Contains

- W3C-style design tokens in `tokens/`
- Generated CSS custom properties in `css/custom-properties.css`
- Reusable CSS patterns for typography and UI primitives in `css/`
- Elementor mapping and setup documentation in `elementor/`
- Figma synchronization guidance in `figma/`

## Prerequisites

- Node.js 18+ (or newer LTS)
- WordPress child theme access (for enqueueing CSS)
- Elementor Pro access (Global Colors, Global Fonts, Custom CSS)
- Figma access to the ForEveryone design file

## First Run

1. Clone the repository.
2. Install dependencies (if any are added later):
   - `npm install`
3. Generate custom properties:
   - `node scripts/build-css.js`
4. Verify output:
   - `css/custom-properties.css` exists and contains `:root` variables.

## Implementation Flow

1. Update or add token values in `tokens/*.json`.
2. Run `node scripts/build-css.js`.
3. Consume variables in `css/*.css` and WordPress/Elementor styles.
4. Update docs and `CHANGELOG.md` for any token or style changes.

## Brand visual styles

High-level rules for **icons** (line vs filled, social vs category), **blob shapes**, and **photography** in masks — with links to CSS utilities — live in [visual-styles.md](visual-styles.md). Figma stays authoritative for exact shapes and crops.

## Team Roles

- Designers: define visual decisions in Figma and sync token changes.
- Developers: implement and document token consumption.
- Elementor editors: use mapped Global Colors/Fonts and avoid ad-hoc values.

## Official References

For Elementor and WordPress official documentation (Global Settings, Global Colors/Fonts, Custom CSS, child themes, enqueue), see [official-references.md](official-references.md).
