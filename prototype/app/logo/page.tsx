import LogoClearSpace from "../_components/LogoClearSpace";

export const metadata = {
  title: "Logo",
  description:
    "The ForEveryone logo system: variants, clear space, background combinations, photography rules, the No. 52 Cafe marks, and incorrect usage.",
};

const atAGlance = [
  ["Primary format", "Horizontal (default)"],
  ["Minimum digital", "32px wide"],
  ["Minimum print", "8mm wide"],
  ["Approved colours", "Charcoal, White"],
  ["Safe zone", "1X (cap-height of F) on all sides"],
  ["Asset location", "Google Drive, Canva Brand Kit (access-restricted)"],
];

const backgrounds = [
  { name: "Lime Green", varName: "--color-light-green", logo: "charcoal" },
  { name: "Soft Lavender", varName: "--color-soft-lavender", logo: "charcoal" },
  { name: "Warm White", varName: "--color-accent", logo: "charcoal" },
  { name: "Blue", varName: "--color-brand-secondary", logo: "white" },
];

const donts = [
  "Stretch or distort the logo",
  "Rotate or tilt the logo",
  "Change the transparency",
  "Add shadows or other effects",
  "Re-create using another typeface",
  "Outline the logo",
  "Use different colours",
  "Use below 32px (digital) / 8mm (print)",
  "Put the full wordmark on Orange",
  "Crop the logo",
  "Use the older sharp-edged version",
  "Place the logo directly on a photo",
];

export default function LogoPage() {
  return (
    <>
      <h1 className="ds-page-title">Logo</h1>
      <p className="ds-intro">
        The ForEveryone logo combines a stylised human-like symbol with a clean
        wordmark, representing people, inclusivity, and community. Always use the
        official files from the asset library; never recreate or alter the logo.
        Rules from the Brand Book v1.0 (p.10&ndash;15); see{" "}
        <a href="https://github.com/Foreveryone-berlin/design-system/blob/main/docs/logo-usage.md">
          logo-usage.md
        </a>
        .
      </p>

      <section className="ds-section">
        <h2 className="ds-section-title">Variants</h2>
        <p className="fe-body">
          The horizontal version is the primary logo and the default for all
          applications. Use secondary logos only when the horizontal logo does not
          fit; when in doubt, use the horizontal version.
        </p>
        <div className="ds-logo-variants">
          <figure className="ds-logo-variant">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/foreveryone-horizontal.png"
              alt="ForEveryone horizontal logo"
              width={260}
              height={48}
            />
            <figcaption>Horizontal (default)</figcaption>
          </figure>
          <figure className="ds-logo-variant">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/foreveryone-stacked.png"
              alt="ForEveryone stacked logo"
              width={150}
              height={79}
            />
            <figcaption>Stacked (square / portrait slots)</figcaption>
          </figure>
          <figure className="ds-logo-variant">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/foreveryone-standalone.png"
              alt="ForEveryone standalone icon"
              width={56}
              height={68}
            />
            <figcaption>Standalone icon (favicons, small marks)</figcaption>
          </figure>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">At a glance</h2>
        <div className="ds-table-wrap">
          <table className="ds-table">
            <tbody>
              {atAGlance.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Clear space</h2>
        <LogoClearSpace />
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Background combinations</h2>
        <p className="fe-body">
          Each approved background has exactly one correct logo colour. There are
          no exceptions. These rules apply equally to horizontal, stacked, and
          standalone variants.
        </p>
        <div className="ds-logo-bg-grid">
          {backgrounds.map((bg) => (
            <figure
              key={bg.name}
              className="ds-logo-bg"
              style={{ background: `var(${bg.varName})` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo/foreveryone-horizontal.png"
                alt={`ForEveryone logo on ${bg.name}`}
                width={180}
                height={33}
                className={`ds-logo-bg__mark ds-logo-bg__mark--${bg.logo}`}
              />
              <figcaption className="ds-logo-bg__caption">
                {bg.name} &middot; {bg.logo} logo
              </figcaption>
            </figure>
          ))}
          <figure
            className="ds-logo-bg"
            style={{ background: "var(--color-brand-primary)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/foreveryone-standalone.png"
              alt="ForEveryone standalone white icon on Orange"
              width={44}
              height={53}
              className="ds-logo-bg__mark ds-logo-bg__mark--white"
            />
            <figcaption className="ds-logo-bg__caption">
              Orange &middot; standalone icon only, no text
            </figcaption>
          </figure>
        </div>
        <p className="fe-callout">
          Never use Lavender (<code>#D5C5FF</code>) as a logo background &mdash;
          use Soft Lavender (<code>#E5DCFF</code>) instead. The White logo on Blue
          is pure white (<code>#FFFFFF</code>), not Warm White.
        </p>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Logo on photography</h2>
        <ul className="ds-rule-list">
          <li>
            Never place the logo directly on a photo. Always place it on a
            brand-coloured <strong>blob</strong> shape over the photograph.
          </li>
          <li>
            Use only the three approved blob colours: Lime Green, Soft Lavender,
            Warm White.
          </li>
          <li>
            The blob must extend at least <strong>1X beyond the logo</strong> on
            all sides, so the full safe zone sits inside the blob.
          </li>
          <li>
            No Orange blob with the full wordmark. No gradient or pattern fill on
            the blob.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">No. 52 Cafe logos</h2>
        <p className="fe-body">
          No. 52 Cafe has its own mark: the primary <strong>No52</strong>{" "}
          wordmark for cafe materials, plus a compact mark with{" "}
          <strong>52</strong> set inside the <strong>o</strong> for small or
          square formats. Clear space is{" "}
          <strong>half the height of the &ldquo;N&rdquo;</strong> on all sides.
          Minimum sizes: 32px / 8mm (primary), 40px / 10mm (secondary).
        </p>
        <div className="ds-logo-variants">
          <figure className="ds-logo-variant ds-logo-variant--no52">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/no52-wordmark.svg"
              alt="No. 52 Cafe primary wordmark"
              width={196}
              height={72}
            />
            <figcaption>No52 wordmark (primary)</figcaption>
          </figure>
          <figure className="ds-logo-variant ds-logo-variant--no52">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/no52-compact.svg"
              alt="No. 52 Cafe compact mark"
              width={98}
              height={72}
            />
            <figcaption>Compact mark (secondary)</figcaption>
          </figure>
        </div>
        <p className="fe-callout">
          These marks are redrawn in-repo from the Brand Book (p.15); the
          official vectors live in the access-restricted Brand Kit and should
          replace these for any production use.
        </p>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Incorrect usage</h2>
        <p className="fe-body">
          Never do any of the following to the logo. Each card below describes a
          misuse the Brand Book (p.14) rules out.
        </p>
        <ul className="ds-dont-grid">
          {donts.map((d) => (
            <li key={d} className="ds-dont-grid__item">
              <span className="ds-dont-grid__label">Don&rsquo;t</span>
              <span className="ds-dont-grid__text">{d}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
