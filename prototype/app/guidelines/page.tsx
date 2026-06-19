export const metadata = {
  title: "Guidelines",
};

export default function GuidelinesPage() {
  return (
    <>
      <h1 className="ds-page-title">Guidelines</h1>
      <p className="ds-intro">
        How to combine the foundations and components on-brand: colour usage,
        typography, and illustration. For brand personality, voice &amp; tone, and
        how to represent us in writing, see <a href="/brand">About &amp; Brand</a>.
        Figma stays the visual source of truth; these rules follow the Brand Book
        v1.0.
      </p>

      <section className="ds-section">
        <h2 className="ds-section-title">Colour usage</h2>
        <ul className="ds-rule-list">
          <li>
            <strong>Charcoal text</strong> on all light backgrounds; it is the
            primary text colour.
          </li>
          <li>
            <strong>Orange is decorative only</strong> (blobs, icons, accents,
            borders). Never a background behind text and never headline text.
          </li>
          <li>
            <strong>Blue</strong> is reserved for announcements and alerts;
            always pair it with white text.
          </li>
          <li>
            <strong>Lime green</strong> and <strong>soft lavender</strong> are
            the readable section/background tints, with charcoal text.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Typography</h2>
        <ul className="ds-rule-list">
          <li>
            <strong>Filson Pro</strong> for everything on the web: headlines,
            body, UI. Headlines are a single colour (charcoal), never two-tone.
          </li>
          <li>
            <strong>Young Serif is print only.</strong> Do not load or use it on
            digital surfaces.
          </li>
          <li>
            Use one accent per headline at most: the sketched underline, not
            colour.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Illustration &amp; blobs</h2>
        <ul className="ds-rule-list">
          <li>
            Line illustrations are decorative orange doodles for warmth, never
            wayfinding. Use them sparingly, paired with blob shapes.
          </li>
          <li>
            Filled category icons are orange with high-contrast labels; they
            guide users through content.
          </li>
          <li>
            Do not stack doodles on busy photography or compete with the primary
            call to action.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Do &amp; don&rsquo;t</h2>
        <div className="ds-dodont">
          <div className="ds-dodont__do">
            <p className="ds-dodont__label">Do</p>
            <ul>
              <li>Charcoal headlines with a sketched orange underline.</li>
              <li>Orange for icons, blobs, and accents.</li>
              <li>High-contrast text on light tints.</li>
            </ul>
          </div>
          <div className="ds-dodont__dont">
            <p className="ds-dodont__label">Don&rsquo;t</p>
            <ul>
              <li>Orange or two-tone headline text.</li>
              <li>White text on an orange background.</li>
              <li>Young Serif or many colours in a title.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">How to represent us</h2>
        <p className="fe-body">
          Naming rules (ForEveryone as one word, No. 52 Cafe spacing and spelling,
          handles, hashtags, and the UK-English standard) now live on the{" "}
          <a href="/brand">About &amp; Brand</a> page alongside our brand
          personality and voice &amp; tone.
        </p>
      </section>
    </>
  );
}
