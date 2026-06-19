import CategoryIcon, {
  CATEGORY_NAMES,
  CATEGORY_LABELS,
} from "../_components/CategoryIcon";

export const metadata = {
  title: "Visual Elements",
  description:
    "The four ForEveryone visual-element families: workshop icons, line illustrations, decorative accent marks, and graphic shapes (blobs vs waves).",
};

const accents = [
  { src: "/illustrations/accents/doodle-underline.svg", label: "Doodle underline" },
  { src: "/illustrations/accents/doodle-arrow.svg", label: "Doodle arrow" },
  { src: "/illustrations/accents/doodle-circle.svg", label: "Doodle circle" },
  { src: "/illustrations/accents/sparkle.svg", label: "Sparkle" },
  { src: "/illustrations/accents/asterisk.svg", label: "Asterisk" },
  { src: "/illustrations/accents/music-note.svg", label: "Music note" },
];

const illustrations = [
  { src: "/illustrations/flower.png", label: "Flower" },
  { src: "/illustrations/smiley.png", label: "Smiley" },
  { src: "/illustrations/swirl.png", label: "Swirl" },
  { src: "/illustrations/cloud.svg", label: "Cloud" },
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={illo.src} alt="" width={72} height={72} aria-hidden="true" />
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.src} alt="" width={96} height={48} aria-hidden="true" />
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
        <div className="ds-blob-specimens" aria-hidden="true">
          <span className="ds-blob ds-blob--lavender" />
          <span className="ds-blob ds-blob--lime" />
          <span className="ds-blob ds-blob--orange" />
        </div>

        <h3 className="ds-subsection-title">Wave shapes</h3>
        <p className="fe-body">
          The same wave can divide a section at its bottom or top edge and
          stretch to the full width. Below: the bottom-edge and top-edge waves,
          full width, in soft neutral greys and light green.
        </p>
        <div className="ds-wave-specimens" aria-hidden="true">
          {[
            { edge: "bottom", tone: "grey-1" },
            { edge: "top", tone: "grey-2" },
            { edge: "bottom", tone: "lime" },
          ].map((wave, i) => (
            <div className="ds-wave-chip" key={`${wave.edge}-${wave.tone}-${i}`}>
              <span
                className={`ds-wave-shape ds-wave-shape--${wave.edge} ds-wave-shape--${wave.tone}`}
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
