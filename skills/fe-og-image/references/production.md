# Image production contract

## Brand and hierarchy

Use the installed `tokens.json` as the source of resolved values. This contract
reflects `spec/principles.md` in design system 1.12.1, October 20, 2026.

| Role | Token | Pairing |
| --- | --- | --- |
| Default canvas | `--color-background-default` | `--color-brand-dark` text |
| Soft canvas | `--color-background-soft` | `--color-brand-dark` text |
| Title canvas | `--color-background-title` | `--color-brand-dark` text |
| Occasional cover | `--color-navy`, `--color-teal-deep`, `--color-background-alert` | `--color-white` text |
| Decoration | `--color-brand-primary` | Orange underline or atmospheric mark, not text or a text ground |
| Heading and body | `--font-family-heading`, `--font-family-body` | Licensed Filson Pro, digital only |

Use a flat ground, left alignment, zero letter spacing, Bold headings and Regular
body with line-height at least 1.5. White and Charcoal are text/logo colors, not
full canvas backgrounds. Filson Pro is not bundled in this public payload. Supply
licensed Regular and Bold files; stop export if they fail to load. Young Serif is
print only. An explicitly approved fallback must be identified as such, never
claimed to be Filson Pro.

One subject, one short headline, at most one supporting sentence. The template's
64 px inset and 300 KB target are project defaults, not Open Graph requirements.
Keep the headline readable at 300 px card width. Reduce text rather than squeezing
it into small print. Avoid fabricated benefits, numbers, testimonials, urgency,
dates and venue details. A link preview is not an interactive button.

Use the real horizontal logo, Charcoal on a light ground, with at least the
cap-height of its F clear on all sides. A logo on a photograph needs a separate
approved light blob behind it. Blobs frame photos; waves divide edges, never mask
photos. Orange accents support rather than compete with the headline. Use at most
one subject image and one decorative family in the default composition.

## Clay Connections reference

Inspected October 20, 2026 using Elementor MCP and the live image/page:

- Page 15208: <https://foreveryone.berlin/courses/clay-connections-course-pottery/>.
- Attachment 15310: <https://foreveryone.berlin/wp-content/uploads/2026/09/clay-connections-og.webp>.
- Both REST `featured_media` and rendered `og:image` point to that attachment;
  actual image size 1200 x 630, MIME `image/webp`. The rendered page has
  `twitter:card=summary_large_image`.
- Observed composition: light ground; outlined 4-Week Series pill upper left;
  large two-line Clay Connections headline; orange hand-drawn underline; bold
  supporting sentence and a longer paragraph below; right-hand organic mask
  around a group working with clay. The inspected image has no logo.
- Reusable direction: preserve the split headline/photo hierarchy, organic mask
  and orange accent. Improve small-card clarity by removing the paragraph and
  using one factual supporting line. Use current Warm White and Filson Pro tokens;
  add the approved logo with clear space for brand recognition.
- Source authorship, photography consent and original generation method are not
  established by the attachment. Treat the live image as a visual reference, not
  as a redistributable asset or evidence that the photo was AI generated.

## Generation prompt

Use only when the brief requires a new visual. Replace bracketed values from the
brief; use approved reference images when supplied. Generate the visual before
compositing type and brand assets.

```text
Create a visual for a ForEveryone Berlin article or workshop preview.
Topic: [verified topic]. Subject: [one concrete activity, object or metaphor].
Use: right-hand photo/blob area of a 1200 x 630 social preview.
Style: [candid daylight editorial still life, or the requested illustration style].
Composition: one clear focal subject; breathing room for an organic crop.
Keep relevant objects fully visible. Natural materials and warm, neutral lighting.
Do not add text, letters, logos, watermarks, UI, gradients or decorative marks.
For an invented scene, avoid identifiable people and recognizable real venues.
Do not imply this depicts an actual ForEveryone event or participant.
```

Review material detail, anatomy if present, lighting and crop before accepting.
Record that the visual is generated and retain its prompt and original output.

## Self-contained composition

Run the packaged script with Node. Paths inside the JSON are relative to the
brief file, making the same brief portable across macOS, Windows and WSL.

```bash
node fe-skills/fe-og-image/scripts/compose.mjs brief.json card.html
```

```json
{
  "headline": "Clay Connections",
  "support": "The same small group, week after week.",
  "label": "4-week pottery course",
  "language": "en-GB",
  "image": "approved-pottery.jpg",
  "imageAlt": "People shaping clay together at a workshop table",
  "imagePosition": "50% 50%",
  "fontRegular": "fonts/FilsonProRegular.ttf",
  "fontBold": "fonts/FilsonProBold.ttf",
  "tokens": "fe-skills/tokens.json"
}
```

For an approved exact long headline, set `headlineSize` to `compact` to use the
48 px heading token with at most four lines, rather than rewriting the copy.
Verify this at 300 px width. Display size remains the default. If compact still
fails, obtain approved shorter wording before export; never truncate the exact copy.

Image and label are optional. An image-free brief uses the approved pottery
illustration as its subject. `imagePosition` takes two percentages from 0 to 100.
Escape-sensitive headline text is rendered literally. The script refuses to
overwrite a source file. Keep prompts, font binaries and rights-restricted photos
in the working project's private artifact location, not this public skill.

Render the HTML at 1200 x 630 after `document.fonts.ready` and all images decode.
`window.feOgValidate()` checks font availability, headline bounds, copy/footer
collision and image decoding. A passing result still needs visual review.

## Export and metadata

| Deliverable | Verification |
| --- | --- |
| OG raster | Exactly 1200 x 630; opaque sRGB JPEG or PNG; actual extension and MIME agree |
| On-page derivative | Optional WebP resized for the real featured-image placement |
| Editable source | Self-contained HTML; original visual and generation prompt retained separately |
| Filename and title | Topic-specific, readable, no keyword stuffing |
| Content alt | Describes meaningful content in context; empty only when genuinely decorative |
| OG alt | Describes the preview and essential headline, not a search-keyword list |
| Rights | Named source/license or own-photo consent; generated visuals labeled as generated |

Compression is a target, not permission to blur text or distort faces. Compare
the compressed raster at full and card size. Ensure the public OG URL returns
image bytes without login or a challenge. Verify the rendered head's `og:image`,
width, height, type and alt, plus the large-image X card. A saved media record does
not prove the public head or social cache has updated.

For an on-page image, use appropriate dimensions/srcset and avoid lazy-loading an
above-the-fold hero. Image SEO concerns relevance, descriptive alt and crawlable
URLs; a share card alone does not establish a ranking or conversion improvement.

Sources: [Open Graph](https://ogp.me/#structured),
[Google image SEO](https://developers.google.com/search/docs/appearance/google-images),
[WordPress featured media](https://developer.wordpress.org/rest-api/reference/pages/#schema).
