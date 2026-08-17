import FeIcon, {
  ACTIVITY_LABELS,
  ACTIVITY_NAMES,
  CATEGORY_LABELS,
  CATEGORY_NAMES,
  FILE_LABELS,
  FILE_NAMES,
  SOCIAL_LABELS,
  SOCIAL_NAMES,
  UI_LABELS,
  UI_NAMES,
  type FileIconName,
  type SocialIconName,
  type UiGlyphName,
} from "../_components/FeIcon";
import AssetTile, { AssetDownloadMarker } from "../_components/AssetTile";
import { FILE_GLYPHS, SOCIAL_ICONS, UI_GLYPHS } from "../_components/ui-glyphs";
import { UI_GLYPH_DIR } from "../_components/ui-glyph-markup";

export const metadata = {
  title: "Visual Elements",
  description:
    "The four ForEveryone visual-element families plus the canonical icon catalog: category, activity, social, and UI glyphs.",
};

// Doodle strokes + sparkle/asterisk/music-note decorations (Brand Book v1.0
// p.26). Each is an orange line-art SVG tinted via CSS mask, so it picks up the
// brand colour from a token rather than baking the hex into the asset.
const accents = [
  {
    src: "/illustrations/accents/doodle-underline.svg",
    label: "Underline",
    underline: true,
  },
  {
    src: "/illustrations/headline-underline.svg",
    label: "Headline underline",
    underline: true,
  },
  { src: "/illustrations/accents/doodle-burst.svg", label: "Burst" },
  { src: "/illustrations/accents/doodle-circle.svg", label: "Emphasis oval", wide: true },
  { src: "/illustrations/accents/doodle-arrow.svg", label: "Arrow" },
  { src: "/illustrations/accents/doodle-swirl.svg", label: "Swirl", wide: true },
  { src: "/illustrations/accents/sparkle.svg", label: "Sparkle" },
  { src: "/illustrations/accents/asterisk.svg", label: "Asterisk" },
  { src: "/illustrations/accents/music-note.svg", label: "Music note" },
];

// Organic, hand-drawn spot illustrations (Brand Book v1.0 p.25). Orange line-art
// SVGs, tinted via CSS mask from the brand token.
const illustrations = [
  { src: "/illustrations/smiley.svg", label: "Smiley" },
  { src: "/illustrations/flower.svg", label: "Flower" },
  { src: "/illustrations/sprout.svg", label: "Sprout" },
  { src: "/illustrations/cloud.svg", label: "Cloud" },
];

const functionalDoodles = [
  { src: "/illustrations/coffee-cup.svg", label: "Coffee cup" },
  { src: "/illustrations/donation-box.svg", label: "Donation box" },
];

const accentVariants = [
  { src: "/illustrations/variants/accents/doodle-arrow-variant-1.svg", label: "Arrow variant 1" },
  { src: "/illustrations/variants/accents/doodle-circle-variant-2.svg", label: "Circle variant 2" },
  { src: "/illustrations/variants/accents/sparkle-variant-1.svg", label: "Sparkle variant 1" },
  { src: "/illustrations/variants/accents/sparkle-variant-2.svg", label: "Sparkle variant 2" },
  { src: "/illustrations/variants/accents/sparkle-variant-3.svg", label: "Sparkle variant 3" },
  { src: "/illustrations/variants/accents/music-note-variant-1.svg", label: "Music note variant 1" },
  { src: "/illustrations/variants/accents/music-note-variant-3.svg", label: "Music note variant 3" },
  { src: "/illustrations/variants/accents/emphasis-lines-variant-1.svg", label: "Emphasis lines variant 1" },
  { src: "/illustrations/variants/accents/emphasis-lines-variant-2.svg", label: "Emphasis lines variant 2" },
  { src: "/illustrations/variants/accents/emphasis-lines-variant-3.svg", label: "Emphasis lines variant 3" },
  { src: "/illustrations/variants/accents/emphasis-lines-variant-4.svg", label: "Emphasis lines variant 4" },
  { src: "/illustrations/variants/accents/headline-underline-variant-1.svg", label: "Headline underline variant 1" },
];

const WAVES = [
  { file: "wave-h1", label: "Wave crest 1" },
  { file: "wave-h2", label: "Wave crest 2" },
  { file: "wave-h3", label: "Wave crest 3" },
];

const WAVE_CORNERS = [
  { file: "wave-corner-tr", label: "Corner wave, top right" },
  { file: "wave-corner-br", label: "Corner wave, bottom right" },
];

/**
 * Accent marks are catalogued in a table for the same reason the UI glyphs are:
 * a wrapped grid of near-identical orange strokes is hard to scan, and the
 * doodle and variant sets are read as inventories, not as specimens.
 */
function AccentTable({
  rows,
}: {
  rows: { src: string; label: string; wide?: boolean; underline?: boolean }[];
}) {
  return (
    <div className="ds-table-wrap">
      <table className="ds-table ds-glyph-table ds-glyph-table--marks">
        <thead>
          <tr>
            <th scope="col">Mark</th>
            <th scope="col">Name</th>
            <th scope="col">File</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((a) => (
            <tr key={a.label}>
              <td className="ds-glyph-table__mark">
                <span
                  className="ds-glyph-table__accent"
                  style={{ maskImage: `url(${a.src})`, WebkitMaskImage: `url(${a.src})` }}
                  aria-hidden="true"
                />
              </td>
              <th scope="row">{a.label}</th>
              <td>
                <AssetDownloadMarker src={a.src} label={a.label} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function labelToFileName(label: string): FileIconName {
  return FILE_NAMES.find((n) => FILE_LABELS[n] === label) ?? "arrow-right";
}

function labelToSocialName(label: string): SocialIconName {
  return SOCIAL_NAMES.find((n) => SOCIAL_LABELS[n] === label) ?? "email";
}

function labelToUiName(label: string): UiGlyphName {
  return UI_NAMES.find((n) => UI_LABELS[n] === label) ?? "chevron-down";
}

export default function VisualElementsPage() {
  return (
    <>
      <h1 className="ds-page-title">Visual Elements</h1>
      <p className="ds-intro">
        ForEveryone uses four distinct visual-element families plus a complete icon
        catalog. Each family has a defined role and must not be used
        interchangeably: <strong>workshop icons</strong> and{" "}
        <strong>graphic shapes</strong> are functional or structural;{" "}
        <strong>illustrations</strong> and <strong>accent marks</strong> are
        atmospheric. Orange (<code>#FF7A3A</code>) is prioritised throughout, with
        no shadows, gradients, or outlines. Rules from the Brand Book v1.0
        (p.24&ndash;27).
      </p>
      <p className="fe-callout">
        <strong>Need a file?</strong> Click any icon, illustration, or shape on
        this page to save it, ready to use and already in its brand colour.
      </p>

      <section className="ds-section">
        <h2 className="ds-section-title">Category icons</h2>
        <p className="fe-body">
          <strong>Canonical set ({CATEGORY_NAMES.length} icons).</strong> Solid,
          orange category silhouettes always paired with a category label. Use in
          tag pills, card badges, and filter bars. These are the production
          defaults.
        </p>
        <div className="ds-icon-specimens">
          {CATEGORY_NAMES.map((name) => (
            <AssetTile
              key={name}
              className="ds-icon-specimen"
              src={`/icons/categories/${name}.svg`}
              label={CATEGORY_LABELS[name]}
            >
              <span className="ds-icon-chip" aria-hidden="true">
                <FeIcon set="category" name={name} size="lg" chip={false} />
              </span>
            </AssetTile>
          ))}
        </div>
        <div className="ds-dodont">
          <div className="ds-dodont__do">
            <p className="ds-dodont__label">Do</p>
            <ul>
              <li>Solid orange fill, paired with a clear category label.</li>
              <li>Place in margins, corners, or alongside text.</li>
            </ul>
          </div>
          <div className="ds-dodont__dont">
            <p className="ds-dodont__label">Don&rsquo;t</p>
            <ul>
              <li>Use outline/stroke icons, or apply shadows or gradients.</li>
              <li>Use them decoratively or overlap body copy.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Activity icons</h2>
        <p className="fe-body">
          <strong>Canonical set ({ACTIVITY_NAMES.length} icons).</strong>{" "}
          Activity-level filled glyphs for specific workshops (pottery, knitting,
          writing, and more). Use when the subcategory is more specific than the
          top-level category chip.
        </p>
        <div className="ds-icon-specimens">
          {ACTIVITY_NAMES.map((name) => (
            <AssetTile
              key={name}
              className="ds-icon-specimen"
              src={`/icons/workshop/${name}.svg`}
              label={ACTIVITY_LABELS[name]}
            >
              <span className="ds-icon-chip" aria-hidden="true">
                <FeIcon set="activity" name={name} size="lg" chip={false} />
              </span>
            </AssetTile>
          ))}
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Social icons</h2>
        <p className="fe-body">
          <strong>Canonical set ({SOCIAL_NAMES.length} icons).</strong> Brand
          social and contact glyphs for footer rows, icon buttons, and outbound
          links. Render inside <code className="ds-code">.fe-icon-btn</code> with
          an accessible label.
        </p>
        <div className="ds-table-wrap">
          <table className="ds-table ds-glyph-table">
            <thead>
              <tr>
                <th scope="col">Glyph</th>
                <th scope="col">Name</th>
                <th scope="col">File</th>
              </tr>
            </thead>
            <tbody>
              {SOCIAL_ICONS.map(({ file, label }) => (
                <tr key={label}>
                  <td className="ds-glyph-table__mark">
                    <FeIcon
                      set="social"
                      name={labelToSocialName(label)}
                      size="md"
                      chip={false}
                    />
                  </td>
                  <th scope="row">{label}</th>
                  <td>
                    <AssetDownloadMarker src={file} label={label} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">UI glyphs</h2>
        <p className="fe-body">
          <strong>Functional set ({UI_GLYPHS.length + FILE_GLYPHS.length}{" "}
          glyphs).</strong> Stroke icons and file-based arrows for navigation,
          forms, media controls, and CTAs. Inline SVGs inherit{" "}
          <code className="ds-code">currentColor</code>; file glyphs ship at 24px.
        </p>
        <div className="ds-table-wrap">
          <table className="ds-table ds-glyph-table">
            <thead>
              <tr>
                <th scope="col">Glyph</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">File</th>
              </tr>
            </thead>
            <tbody>
              {FILE_GLYPHS.map(({ label, src }) => (
                <tr key={label}>
                  <td className="ds-glyph-table__mark">
                    <FeIcon set="file" name={labelToFileName(label)} size="md" />
                  </td>
                  <th scope="row">{label}</th>
                  <td>File</td>
                  <td>
                    <AssetDownloadMarker src={src} label={label} />
                  </td>
                </tr>
              ))}
              {UI_GLYPHS.map(({ label, name }) => (
                <tr key={label}>
                  <td className="ds-glyph-table__mark">
                    <FeIcon set="ui" name={labelToUiName(label)} size="md" />
                  </td>
                  <th scope="row">{label}</th>
                  <td>Stroke</td>
                  <td>
                    <AssetDownloadMarker
                      src={`${UI_GLYPH_DIR}/${name}.svg`}
                      label={label}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Line illustrations</h2>
        <p className="fe-body">
          <strong>Atmospheric.</strong> Organic, hand-drawn elements that add
          personality and warmth &mdash; a supporting touch, never the dominant
          element. Unlike workshop icons they need no category label, giving
          freedom to pick one that suits the mood of a post or document. Orange is
          prioritised; no shadows, gradients, or outlines.
        </p>
        <div className="ds-illo-specimens">
          {illustrations.map((illo) => (
            <AssetTile
              key={illo.label}
              className="ds-illo-specimen"
              src={illo.src}
              label={illo.label}
            >
              <span
                className="ds-illo-mark"
                style={{ maskImage: `url(${illo.src})`, WebkitMaskImage: `url(${illo.src})` }}
                aria-hidden="true"
              />
            </AssetTile>
          ))}
        </div>
        <h3 className="ds-subsection-title">Functional doodles</h3>
        <p className="fe-body">
          These are line-style graphics used as functional motifs in specific
          content blocks, not as general atmospheric marks.
        </p>
        <div className="ds-illo-specimens">
          {functionalDoodles.map((illo) => (
            <AssetTile
              key={illo.label}
              className="ds-illo-specimen"
              src={illo.src}
              label={illo.label}
            >
              <span
                className="ds-illo-mark"
                style={{ maskImage: `url(${illo.src})`, WebkitMaskImage: `url(${illo.src})` }}
                aria-hidden="true"
              />
            </AssetTile>
          ))}
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Decorative accent marks</h2>
        <p className="fe-body">
          Two types, used sparingly to add energy without becoming the focus:{" "}
          <strong>doodle strokes</strong> (underlines, arrows, circles beneath
          headings) and <strong>sparkle, asterisk, and music-note</strong>{" "}
          decorations on titles and announcements. Orange is prioritised.
        </p>
        <AccentTable rows={accents} />

        <h3 className="ds-subsection-title">Decorative variant catalog</h3>
        <p className="fe-body">
          Additional Canva exports are kept as documented variants for editorial
          and campaign flexibility.
        </p>
        <AccentTable rows={accentVariants} />
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Graphic shapes</h2>
        <p className="fe-body">
          Two types with distinct roles that <strong>must not</strong> be used
          interchangeably. <strong>Blob shapes</strong> are organic, rounded
          containers for photos or colour blocks behind text (they soften
          photography and frame imagery). <strong>Wave shapes</strong> are soft
          horizontal dividers at the top or bottom edge of a section.
        </p>

        <h3 className="ds-subsection-title">Blob shapes</h3>
        <p className="fe-body">
          Organic, rounded shapes used as containers for photos or as colour
          blocks behind text. Approved fills: Soft Lavender, Lime Green, or Warm
          White &mdash; never Orange behind the full wordmark.
        </p>
        <div className="ds-blob-specimens">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <AssetTile
              key={n}
              className="ds-blob-specimen"
              src={`/illustrations/blobs/blob-${n}.svg`}
              label={`Blob ${n}`}
            >
              <span
                className="ds-blob"
                aria-hidden="true"
                style={{
                  maskImage: `url(/illustrations/blobs/blob-${n}.svg)`,
                  WebkitMaskImage: `url(/illustrations/blobs/blob-${n}.svg)`,
                }}
              />
            </AssetTile>
          ))}
        </div>

        <h3 className="ds-subsection-title">Wave shapes</h3>
        <p className="fe-body">
          Soft horizontal dividers used at the top or bottom edge of a section,
          always in Lime Green. Three full-width crest patterns plus two corner
          waves that fill a top or bottom corner of the page.
        </p>
        <div className="ds-wave-specimens">
          {WAVES.map(({ file, label }) => (
            <AssetTile
              key={file}
              className="ds-wave-specimen"
              src={`/illustrations/waves/${file}.svg`}
              label={label}
            >
              <span className="ds-wave-chip">
                <span
                  className="ds-wave-shape"
                  aria-hidden="true"
                  style={{
                    maskImage: `url(/illustrations/waves/${file}.svg)`,
                    WebkitMaskImage: `url(/illustrations/waves/${file}.svg)`,
                  }}
                />
              </span>
            </AssetTile>
          ))}
        </div>
        <div className="ds-wave-corners">
          {WAVE_CORNERS.map(({ file, label }) => (
            <AssetTile
              key={file}
              className="ds-wave-corner-specimen"
              src={`/illustrations/waves/${file}.svg`}
              label={label}
            >
              <span className="ds-wave-corner-chip">
                <span
                  className="ds-wave-corner"
                  aria-hidden="true"
                  style={{
                    maskImage: `url(/illustrations/waves/${file}.svg)`,
                    WebkitMaskImage: `url(/illustrations/waves/${file}.svg)`,
                  }}
                />
              </span>
            </AssetTile>
          ))}
        </div>
        <p className="fe-callout">
          Blobs are containers/masks; waves are section dividers. Do not swap one
          for the other.
        </p>
      </section>
    </>
  );
}
