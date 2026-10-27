# Elementor photo masks and section dividers

Use the shared [shape catalog](../../docs/visual-styles.md#graphic-shapes-blobs-vs-waves)
for the geometry. Elementor-specific controls and existing-page evidence belong
here; they do not define the rules for Next.js or other consumers.

## Choose the implementation

| Slot | Implementation |
| --- | --- |
| Photo inside an organic silhouette | Image widget with an existing blob SVG mask; preserve its proportions and crop the image with cover |
| Existing native wave divider | Keep the container's `waves` preset and its edge, negative, flip, width, and height settings |
| Figma crest or corner not provided by a native preset | Use the exact catalog SVG as a decorative asset; do not replace its path with an approximation |

Ordinary content stays in native widgets. Keep divider geometry separate from
photo masks and text containers. Do not introduce custom HTML just to imitate a
native divider already present on the reference page.

## Reference pages

| Page | Evidence | Divider treatment |
| --- | --- | --- |
| [Messy Pottery](https://foreveryone.berlin/our-workshops/pottery-workshop-berlin/) | Public rendered page checked 2026-10-27 | Native `waves`; top negative, bottom regular, both rotated; neutral cutouts against coloured sections |
| [Clay Connections](https://foreveryone.berlin/courses/clay-connections-course-pottery/) | Public rendered page checked 2026-10-27 | Same two native paths; some sections use regular top/inverse bottom without rotation, others the reversed orientation |
| Creative German Language Workshop, post `16006` | Saved implementation and desktop/mobile captures from 2026-10-26, not a fresh live-draft read | Native `waves`, with a white bridge between the green CTA and grey footer transition; preserve draft status |

The exact two native paths from the public references are available as
`wave-soft.svg` and `wave-soft-inverse.svg` in the shared catalog. Both reference
pages use the same geometry. Their different appearance comes from orientation,
height, and adjacent section colours, not newly drawn waves.
The source paths are Elementor's `assets/shapes/waves.svg` and
`waves-negative.svg`; the downloaded SVGs retain their source notices and GPL
licence, supplied beside them as `elementor-license.txt`.

## Read before writing through MCP

Read the reference container settings and its immediate neighbours. Record:

- `shape_divider_top` / `shape_divider_bottom`: the native preset, normally `waves` in these references.
- `_negative` and `_flip`: independent controls; neither is a substitute for the other.
- `_height`, `_height_tablet`, `_height_mobile`, and `_width`: copy the reference values before adjusting for the target layout.
- `__globals__` colour bindings for each divider and adjoining background.
- Padding, margin, overflow, and stacking at both edges, including any existing neutral bridge.

Inspect the rendered SVG and computed styles as well as stored settings. On the
public desktop references, section-edge heights range from 32px to 62px; these
are observations, not a universal sizing token. The German draft's saved main
sections used top/bottom heights of 100/80px on desktop and 55/45px on mobile.
Copy the relevant reference, not an arbitrary average.

## Join surfaces without a seam

The German draft's saved final transition binds the green CTA's bottom divider
and the grey footer wave's top divider to `globals/colors?id=fe-white`. Its footer
container also has a white box-shadow bridge. This is an existing page-specific
repair, not a shared utility or a default to add elsewhere.

When reproducing a transition, match the two adjoining surfaces first. Retain a
bridge only when the rendered join requires it. Do not paper over a colour or
orientation mismatch with extra shapes, negative margins, or repeated shadows.
Verify the whole join at desktop and mobile widths, including the section below
it, rather than checking one isolated SVG.
