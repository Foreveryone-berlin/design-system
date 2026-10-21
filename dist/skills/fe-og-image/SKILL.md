---
name: fe-og-image
description: Create on-brand ForEveryone OG images and featured-image artwork. Use for social link previews, WordPress featured images, or reusable image templates with verified copy, brand assets and export quality.
foreveryone: '>=1.12.1 <2.0.0'
requires: [fe-core]
docs: ['spec/principles.md', 'docs/visual-styles.md', 'integrations/elementor/og-images.md']
---

# ForEveryone OG images

Requires [fe-core](../fe-core/SKILL.md). Read the packaged
[production brief](references/production.md) before composing. It contains the
essential digital brand rules for consumers without the repository.

## When to use

Create or revise an OG/social preview or featured-image composition for
ForEveryone. Deliver an actual image file and its editable source, not only a prompt.

## Rules

1. Fetch the destination page with the agent's available page-fetch/search or HTTP
   tool. Follow the [page-led selection](references/production.md#page-led-visual-selection)
   workflow before choosing imagery. Record the page's main message, audience and
   visual rationale; use supplied copy when no URL is given. Include one related
   subheading and a CTA describing the actual linked page, not a booking or signup
   action farther downstream. Omit unneeded dates and prices.
2. Inspect the supplied reference. For the Clay Connections family, use a
   left-aligned headline, restrained orange underline and right-hand organic photo
   mask. Keep its hierarchy, not its long paragraph. See the observed reference in
   [production.md](references/production.md).
3. Resolve digital tokens from `../tokens.json` in an installed payload, or
   `spec/tokens.json` in a clone. The packaged production rules apply to this
   image workflow where older consumer examples disagree with current principles.
4. Prefer a relevant, rights-cleared image from the destination or supplied brief.
   Inspect the actual image, not only its filename or alt. For a new visual,
   use an available image-generation tool or configured provider for the subject only:
   [generation prompt](references/production.md#generation-prompt). Keep exact
   lettering, logos and approved decorative SVGs in deterministic composition.
   Inspect the generated visual before using it. An unavailable generator is a
   blocked generation step, not permission to label stock or an SVG as AI output.
   This workflow supports Codex, Claude and Cursor without a hard-coded generator.
   Use existing provider configuration; record provider/model only when exposed.
5. Compose with licensed Filson Pro digital fonts and the approved assets in
   `assets/`. [compose.mjs](scripts/compose.mjs) writes a self-contained HTML
   master from a JSON brief, local image, fonts and token file. Its defaults are
   1200 x 630, 64 px edge inset, a subheading and bottom-right CTA artwork. It does
   not generate photos or rasterize HTML. Usage and schema are in the production reference.
6. Render the master after fonts and images load. Run `window.feOgValidate()` and
   correct any failure before export. Preserve approved long wording by trying
   `headlineSize: compact` and checking card-size readability. If that fails,
   obtain approved shorter copy, never truncate or rewrite it silently.
   Export at device scale 1, or explicitly
   resize the result to exactly 1200 x 630.
7. Deliver an opaque sRGB JPEG or PNG, aiming for at most 300 KB without visibly
   damaging type or imagery. A WebP on-page derivative is separate from the OG
   deliverable. Verify actual pixels, format, MIME and file size.
8. Inspect the final image at full size and 300 px width for message match,
   readable subheading and CTA, plus the destination's actual crop. If a
   square placement loses meaning, compose a separate variant for that placement.
9. Supply a descriptive filename, media title, content-appropriate alt text,
   `og:image:alt`, source/rights record and the editable master. Alt describes the
   subject and essential in-image words when they carry meaning; do not repeat
   keywords. Verify message match and readability, not an assumed CTR lift.
10. For WordPress assignment or social overrides, read the target's integration
    guide. Image creation does not authorize upload, page edits or publication.

## Do not

- Generate or redraw the logo, imitate real attendees, or present invented scenes
  as documentary evidence of a ForEveryone event.
- Invent colors, use print fonts, place text on orange, or silently substitute a
  font when Filson Pro cannot load.
- Substitute a generic workshop still life for a page about community or belonging.
- Add unverified claims, urgency or a second paragraph. CTA artwork is static,
  not a separate clickable control in the exported image.
- Treat a WordPress featured image as proof of the rendered `og:image`.

## Canonical docs

- [Packaged production rules, reference and prompt](references/production.md)
- [Placeholder layout for designer review](references/layout-review.png),
  with [editable SVG](references/layout-review.svg); not an approved page specimen.
- [Packaged asset provenance](assets/SOURCES.md)
- [Open Graph image properties](https://ogp.me/#structured)
- [Google image SEO](https://developers.google.com/search/docs/appearance/google-images)
- WordPress adapter in a clone: `integrations/elementor/og-images.md`
