# Getting Started

Welcome to the ForEveryone Berlin design system repository.

## What This Repo Contains

- W3C-style design tokens in `tokens/`
- Generated CSS custom properties in `css/custom-properties.css`
- Reusable CSS patterns for typography and UI primitives in `css/`
- Per-platform integration guides in `integrations/`
- Figma synchronization guidance in `figma/`
- A Next.js preview app in `prototype/`

## Prerequisites

- Node.js 24 (pinned in [`.nvmrc`](../.nvmrc); run `nvm use` to match CI)
- Optional: Figma access to the ForEveryone design file
- Optional: access to a consuming target (see [integrations/README.md](../integrations/README.md))

## First Run

1. Clone the repository.
2. Install dependencies:
   - `npm install`
3. Generate custom properties:
   - `node scripts/build-css.js`
4. Verify output:
   - `css/custom-properties.css` exists and contains `:root` variables.

## Implementation Flow

1. Update or add token values in `tokens/*.json`.
2. Run `node scripts/build-css.js`.
3. Consume variables in shared `css/*.css` (and any framework or plain-CSS app).
4. If a host platform maps tokens to its own globals, run that target's sync workflow under `integrations/`.
5. Update docs and `CHANGELOG.md` for any token or style changes.

## Brand visual styles

High-level rules for **icons** (line vs filled, social vs category), **blob shapes**, and **photography** in masks — with links to CSS utilities — live in [visual-styles.md](visual-styles.md). Figma stays authoritative for exact shapes and crops.

## Team Roles

- Designers: define visual decisions in Figma and sync token changes.
- Developers: implement and document token consumption.
- Editors on a host platform: use that target's mapped globals and avoid ad-hoc values (see [integrations/README.md](../integrations/README.md)).

## Integrations

How to load the system from plain CSS, React/Next.js, or a CMS: [integrations/README.md](../integrations/README.md). Pre-release checks for any consuming surface: [integration-checklist.md](integration-checklist.md).
