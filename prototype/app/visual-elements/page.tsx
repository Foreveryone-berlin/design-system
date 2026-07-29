import CategoryIcon, {
  CATEGORY_NAMES,
  CATEGORY_LABELS,
} from "../_components/CategoryIcon";
import ActivityIcon, {
  ACTIVITY_LABELS,
  ACTIVITY_NAMES,
} from "../_components/ActivityIcon";
import IconGithubBrowseLink from "../_components/IconGithubBrowseLink";
import {
  FILE_GLYPHS,
  SOCIAL_ICONS,
  SOCIAL_VARIANTS,
  UI_GLYPHS,
  WORKSHOP_VARIANTS,
} from "../_components/ui-glyphs";

export const metadata = {
  title: "Visual Elements",
  description:
    "The four ForEveryone visual-element families plus the full icon catalog: category, activity, social, UI glyphs, and documented variants.",
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

function VariantGlyph({ src, label }: { src: string; label: string }) {
  return (
    <figure className="ds-icon-specimen">
      <span className="ds-icon-chip ds-icon-chip--variant" aria-hidden="true">
        <span
          className="fe-category-icon-glyph"
          style={{
            display: "block",
            backgroundColor: "currentColor",
            maskImage: `url(${src})`,
            WebkitMaskImage: `url(${src})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      </span>
      <figcaption>
        {label}
        <span className="ds-icon-variant-tag">Variant</span>
      </figcaption>
    </figure>
  );
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
            <figure key={name} className="ds-icon-specimen">
              <span className="ds-icon-chip" aria-hidden="true">
                <CategoryIcon name={name} />
              </span>
              <figcaption>{CATEGORY_LABELS[name]}</figcaption>
            </figure>
          ))}
        </div>
        <IconGithubBrowseLink folder="categories" />
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
            <figure key={name} className="ds-icon-specimen">
              <span className="ds-icon-chip" aria-hidden="true">
                <ActivityIcon name={name} />
              </span>
              <figcaption>{ACTIVITY_LABELS[name]}</figcaption>
            </figure>
          ))}
        </div>
        <IconGithubBrowseLink folder="workshop" />
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Social icons</h2>
        <p className="fe-body">
          <strong>Canonical set ({SOCIAL_ICONS.length} icons).</strong> Brand
          social and contact glyphs for footer rows, icon buttons, and outbound
          links. Render inside <code className="ds-code">.fe-icon-btn</code> with
          an accessible label.
        </p>
        <div className="ds-icon-specimens">
          {SOCIAL_ICONS.map(({ file, label }) => (
            <figure key={file} className="ds-icon-specimen">
              <span className="ds-icon-chip ds-icon-chip--neutral" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={file} alt="" className="ds-icon-glyph--md" />
              </span>
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
        <IconGithubBrowseLink folder="social" />
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">UI glyphs</h2>
        <p className="fe-body">
          <strong>Functional set ({UI_GLYPHS.length + FILE_GLYPHS.length}{" "}
          glyphs).</strong> Stroke icons and file-based arrows for navigation,
          forms, media controls, and CTAs. Inline SVGs inherit{" "}
          <code className="ds-code">currentColor</code>; file glyphs ship at 24px.
        </p>
        <div className="ds-icon-demo">
          {FILE_GLYPHS.map(({ label, src }) => (
            <div className="ds-icon-item" key={src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" aria-hidden="true" className="ds-icon-glyph--md" />
              <span>{label}</span>
            </div>
          ))}
          {UI_GLYPHS.map(({ label, path }) => (
            <div className="ds-icon-item" key={label}>
              <svg
                className="ds-icon-glyph--md"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                {path}
              </svg>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <IconGithubBrowseLink />
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Icon variant catalog</h2>
        <p className="fe-body">
          <strong>
            Optional alternatives ({WORKSHOP_VARIANTS.length + SOCIAL_VARIANTS.length}{" "}
            files).
          </strong>{" "}
          Canva and Figma exports kept for editorial flexibility.{" "}
          <strong>Do not use variants in production</strong> unless design
          explicitly selects one; the canonical sets above remain the defaults.
        </p>

        <h3 className="ds-subsection-title">Workshop variants</h3>
        <div className="ds-icon-specimens">
          {WORKSHOP_VARIANTS.map(({ file, label }) => (
            <VariantGlyph key={file} src={file} label={label} />
          ))}
        </div>

        <h3 className="ds-subsection-title">Social variants</h3>
        <div className="ds-icon-specimens">
          {SOCIAL_VARIANTS.map(({ file, label }) => (
            <figure key={file} className="ds-icon-specimen">
              <span className="ds-icon-chip ds-icon-chip--neutral ds-icon-chip--variant" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={file} alt="" className="ds-icon-glyph--md" />
              </span>
              <figcaption>
                {label}
                <span className="ds-icon-variant-tag">Variant</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <IconGithubBrowseLink folder="variants" />
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
            <figure key={illo.label} className="ds-illo-specimen">
              <span
                className="ds-illo-mark"
                style={{ maskImage: `url(${illo.src})`, WebkitMaskImage: `url(${illo.src})` }}
                aria-hidden="true"
              />
              <figcaption>{illo.label}</figcaption>
            </figure>
          ))}
        </div>
        <h3 className="ds-subsection-title">Functional doodles</h3>
        <p className="fe-body">
          These are line-style graphics used as functional motifs in specific
          content blocks, not as general atmospheric marks.
        </p>
        <div className="ds-illo-specimens">
          {functionalDoodles.map((illo) => (
            <figure key={illo.label} className="ds-illo-specimen">
              <span
                className="ds-illo-mark"
                style={{ maskImage: `url(${illo.src})`, WebkitMaskImage: `url(${illo.src})` }}
                aria-hidden="true"
              />
              <figcaption>{illo.label}</figcaption>
            </figure>
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
        <div className="ds-accent-specimens">
          {accents.map((a) => (
            <figure key={a.label} className="ds-accent-specimen">
              <span
                className={`ds-accent-mark${
                  a.wide ? " ds-accent-mark--wide" : ""
                }${a.underline ? " ds-accent-mark--underline" : ""}`}
                style={{ maskImage: `url(${a.src})`, WebkitMaskImage: `url(${a.src})` }}
                aria-hidden="true"
              />
              <figcaption>{a.label}</figcaption>
            </figure>
          ))}
        </div>
        <h3 className="ds-subsection-title">Decorative variant catalog</h3>
        <p className="fe-body">
          Additional Canva exports are kept as documented variants for editorial
          and campaign flexibility.
        </p>
        <div className="ds-accent-specimens">
          {accentVariants.map((a) => (
            <figure key={a.label} className="ds-accent-specimen">
              <span
                className={`ds-accent-mark${
                  a.label.toLowerCase().includes("underline") ? " ds-accent-mark--underline" : ""
                }`}
                style={{ maskImage: `url(${a.src})`, WebkitMaskImage: `url(${a.src})` }}
                aria-hidden="true"
              />
              <figcaption>{a.label}</figcaption>
            </figure>
          ))}
        </div>
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
        <div className="ds-blob-specimens" aria-hidden="true">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <span
              key={n}
              className="ds-blob"
              style={{
                maskImage: `url(/illustrations/blobs/blob-${n}.svg)`,
                WebkitMaskImage: `url(/illustrations/blobs/blob-${n}.svg)`,
              }}
            />
          ))}
        </div>

        <h3 className="ds-subsection-title">Wave shapes</h3>
        <p className="fe-body">
          Soft horizontal dividers used at the top or bottom edge of a section,
          always in Lime Green. Three full-width crest patterns plus two corner
          waves that fill a top or bottom corner of the page.
        </p>
        <div className="ds-wave-specimens" aria-hidden="true">
          {["wave-h1", "wave-h2", "wave-h3"].map((w) => (
            <div className="ds-wave-chip" key={w}>
              <span
                className="ds-wave-shape"
                style={{
                  maskImage: `url(/illustrations/waves/${w}.svg)`,
                  WebkitMaskImage: `url(/illustrations/waves/${w}.svg)`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="ds-wave-corners" aria-hidden="true">
          {["wave-corner-tr", "wave-corner-br"].map((w) => (
            <div className="ds-wave-corner-chip" key={w}>
              <span
                className="ds-wave-corner"
                style={{
                  maskImage: `url(/illustrations/waves/${w}.svg)`,
                  WebkitMaskImage: `url(/illustrations/waves/${w}.svg)`,
                }}
              />
            </div>
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
