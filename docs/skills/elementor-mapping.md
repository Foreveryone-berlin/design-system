# Elementor Mapping Workflow (manual fallback)

> **No dedicated auto-loaded skill.** This file is the manual fallback for keeping Elementor Global Colors and Global Fonts aligned with this repo’s tokens.

Keep Elementor Global Colors and Global Fonts aligned with this repo’s tokens.

## When to use

- After changing token values that are mapped to Elementor (e.g. primary color, body font).
- When onboarding a new site or restoring Global Settings from this design system.

## Steps

1. **Check the mapping tables** in this repo:
   - [elementor/global-colors.md](../../elementor/global-colors.md)
   - [elementor/global-fonts.md](../../elementor/global-fonts.md)
2. **Icon / layout classes**: When using HTML or Button widgets with DS classes (e.g. `.fe-icon-btn`, `.fe-icon-btn--filled-brand`), see [docs/visual-styles.md](../visual-styles.md) and [elementor/custom-css-setup.md](../../elementor/custom-css-setup.md).
3. **In WordPress**: go to **Elementor → Site Settings → Global Colors** (or **Global Fonts**).
4. **Set each slot** to the hex value or font/size/weight from the mapping table.
5. **Ensure token CSS is loaded**: either enqueue `css/custom-properties.css` from the child theme (see [elementor/custom-css-setup.md](../../elementor/custom-css-setup.md)) or paste the `:root` block into Elementor Custom CSS as fallback.
6. **Verify** in the editor: buttons, headings, and body text use the expected colors and fonts.

## Accessibility checklist (WordPress / Elementor)

After colour and font sync, confirm these on a staging page:

1. **Skip link**: First focusable element is a skip link to `#main-content`; `<main id="main-content" tabindex="-1">` exists. CSS: `.fe-skip-link` from [custom-css-setup.md](../../elementor/custom-css-setup.md).
2. **Focus order**: Tab through header, mobile menu, main content, and footer; focus stays visible (gold ring on nav links and tags; orange fill on pill buttons).
3. **Icon-only controls**: Every icon button has an `aria-label` (social, play, menu toggle, close).
4. **Accordion / FAQ**: Trigger is a `<button>` with `aria-expanded` and `aria-controls`; collapsed content is not focusable. See [spec/components/faq.md](../../spec/components/faq.md).
5. **Images**: Meaningful photos have a one-sentence alt describing activity and setting; purely decorative graphics use empty alt. See [prototype/public/images/ASSETS.md](../../prototype/public/images/ASSETS.md) and [docs/logo-usage.md](../logo-usage.md).
6. **Blob-framed photos**: Alt text belongs on the photo inside the mask, not on the decorative blob shape.

Known gaps and scope: [docs/a11y-conformance.md](../a11y-conformance.md).

## Official docs

- [docs/official-references.md](../official-references.md) — links to Elementor Global Settings, Global Colors, Global Fonts, Custom CSS.
