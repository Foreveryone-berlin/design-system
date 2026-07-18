import CategoryIcon, {
  CATEGORY_NAMES,
  CATEGORY_LABELS,
} from "../_components/CategoryIcon";

export const metadata = {
  title: "Visual Elements",
  description:
    "The four ForEveryone visual-element families: workshop icons, line illustrations, decorative accent marks, and graphic shapes (blobs vs waves).",
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
  { src: "/illustrations/donation-box.svg", label: "Donation box" },
  { src: "/illustrations/coffee-cup.svg", label: "Coffee cup" },
];

export default function VisualElementsPage() {
  return (
    <>
      <h1 className="ds-page-title">Visual Elements</h1>
      <p className="ds-intro">
        ForEveryone uses four distinct visual-element families. Each has a defined
        role and must not be used interchangeably: <strong>workshop icons</strong>{" "}
        and <strong>graphic shapes</strong> are functional or structural;{" "}
        <strong>illustrations</strong> and <strong>accent marks</strong> are
        atmospheric. Orange (<code>#FF7A3A</code>) is prioritised throughout, with
        no shadows, gradients, or outlines. Rules from the Brand Book v1.0
        (p.24&ndash;27).
      </p>

      <section className="ds-section">
        <h2 className="ds-section-title">Workshop icons</h2>
        <p className="fe-body">
          <strong>Functional.</strong> Solid, orange icons that help people spot a
          workshop or programme category at a glance. They are{" "}
          <strong>always paired with a category label</strong>, placed in margins
          or alongside text, and never used for decoration. Filled silhouettes
          only &mdash; never outline, shadow, or gradient.
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
