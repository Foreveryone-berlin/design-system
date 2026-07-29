# Custom CSS Setup (Elementor + Child Theme)

This guide connects generated token CSS to WordPress and provides an Elementor fallback workflow.

## Preferred Method: Enqueue in Child Theme

Add this to the child theme `functions.php`:

```php
<?php
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style(
        'fe-design-tokens',
        get_stylesheet_directory_uri() . '/css/custom-properties.css',
        array(),
        filemtime(get_stylesheet_directory() . '/css/custom-properties.css')
    );
}, 20);
```

## Optional `style.css` Import Snippet

If your child theme keeps token CSS in a sibling `css/` directory:

```css
@import url("./css/custom-properties.css");
```

Use this only when your theme setup cannot enqueue CSS from `functions.php`. `wp_enqueue_style()` is preferred for performance and cache control.

## Elementor Fallback: Paste `:root` Block

If enqueueing is not available yet, open **Elementor > Site Settings > Custom CSS** and paste the current generated `:root` block from [`css/custom-properties.css`](../css/custom-properties.css). Do not hand-edit the pasted CSS; rerun `node scripts/build-css.js` whenever tokens change and paste the updated block.

```bash
# Example: copy the generated file contents to paste into Elementor
# (use your platform's clipboard tool)
cat css/custom-properties.css
```

## Icon button classes

The child theme should load `css/utilities.css` (or a bundle that includes it) so Elementor **HTML** or **Button** widgets can use:

- **`.fe-icon-btn`** — neutral circular icon control (e.g. social); orange on hover.
- **`.fe-icon-btn--filled-brand`** — **filled orange** circular control for **category / functional** icons per the brand visual styles; white glyph via `currentColor`.
- **`.fe-workshop-icon--sm`**, **`.fe-workshop-icon--md`**, **`.fe-workshop-icon--lg`** — orange chip + white glyph at tag (24px), icon-button (40px), and specimen (80px) sizes. Pair with category or activity SVGs from `icons/categories/` or `icons/workshop/`.

See [docs/visual-styles.md](../docs/visual-styles.md). Place the SVG inside the widget with `fill="currentColor"` (and `aria-hidden="true"` if the button has an `aria-label`).

## Skip link (accessibility)

Load `css/utilities.css` (or your bundled design-system CSS) so `.fe-skip-link` is available. Add this as the **first element inside `<body>`** in the child theme header template:

```html
<a href="#main-content" class="fe-skip-link">Skip to content</a>
```

Ensure the primary content wrapper uses:

```html
<main id="main-content" tabindex="-1">…</main>
```

The skip link is visually hidden until focused. Tab once from the page load to verify it appears and jumps past navigation.

## Validation Checklist

1. Run `node scripts/build-css.js`.
2. Hard refresh site and clear caches.
3. In devtools, inspect `:root` and confirm custom properties are present.
4. Check button, heading, and input styles in Elementor preview.
