export const metadata = {
  title: "Print & Media",
  description:
    "The digital ↔ print boundary: what is print/physical-only (Young Serif, CMYK, print purple, document greys, cafe signs) and must not be used on the web.",
};

const cmyk = [
  { name: "Orange", hex: "#FF7A3A", home: "0 / 51 / 80 / 0", press: "0 / 65 / 84 / 0" },
  { name: "Lime Green", hex: "#D4E6A8", home: "9 / 0 / 36 / 0", press: "18 / 0 / 43 / 0" },
  { name: "Soft Lavender", hex: "#E5DCFF", home: "6 / 12 / 0 / 0", press: "16 / 22 / 0 / 0" },
  { name: "Warm White", hex: "#FDFCF7", home: "0 / 0 / 2 / 1", press: "0 / 0 / 3 / 1" },
  { name: "Charcoal", hex: "#1E1E1E", home: "0 / 0 / 0 / 88", press: "0 / 0 / 0 / 88" },
];

export default function PrintPage() {
  return (
    <>
      <h1 className="ds-page-title">Print &amp; Media</h1>
      <p className="ds-intro">
        This design system is <strong>digital-first</strong>. The rules on this
        page are <strong>print / physical-only</strong> and must not be used on the
        web. They come from the Brand Book v1.0 (p.16&ndash;17, 21, 36&ndash;40)
        and exist so the digital system and physical materials stay consistent
        without bleeding into each other.
      </p>

      <section className="ds-section">
        <h2 className="ds-section-title">Digital vs print at a glance</h2>
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th scope="col">Concern</th>
                <th scope="col">Digital</th>
                <th scope="col">Print</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Typeface</th>
                <td>Filson Pro (everything)</td>
                <td>Filson Pro body + Young Serif headings/quotes</td>
              </tr>
              <tr>
                <th scope="row">Colour model</th>
                <td>HEX / RGB (sRGB)</td>
                <td>CMYK (Home or Press values)</td>
              </tr>
              <tr>
                <th scope="row">Blue / alerts</th>
                <td>Brand Blue <code>#3F00EB</code></td>
                <td>Print purple (Blue does not print well)</td>
              </tr>
              <tr>
                <th scope="row">Minimum logo size</th>
                <td>32px wide</td>
                <td>8mm wide</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Young Serif (print only)</h2>
        <p className="fe-body">
          Young Serif is an accent serif used <strong>only in printed materials</strong>{" "}
          with CMYK colours, for <strong>headings, quotes, and pull-outs</strong>.
          Never set body text in Young Serif (always Filson Pro), and{" "}
          <strong>never load or use it on the web</strong>. The repo emits
          <code> --font-family-accent</code> for print-mock surfaces only; shipped
          digital components must not reference it.
        </p>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">CMYK values</h2>
        <p className="fe-body">
          Use HEX/RGB for digital; use CMYK for print. <strong>Home</strong> =
          in-house or desktop printer; <strong>Press</strong> = professional print
          service. Confirm the print method and CMYK values with Roxana before
          producing printed materials.
        </p>
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th scope="col">Colour</th>
                <th scope="col">HEX</th>
                <th scope="col">CMYK Home</th>
                <th scope="col">CMYK Press</th>
              </tr>
            </thead>
            <tbody>
              {cmyk.map((c) => (
                <tr key={c.name}>
                  <th scope="row">
                    <span
                      className="ds-swatch-dot"
                      style={{ background: c.hex }}
                      aria-hidden="true"
                    />
                    {c.name}
                  </th>
                  <td>
                    <code>{c.hex}</code>
                  </td>
                  <td>{c.home}</td>
                  <td>{c.press}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Print purple (substitutes Blue)</h2>
        <p className="fe-body">
          Brand Blue does not reproduce well in CMYK, so print uses a purple in its
          place for the same announcement/alert purpose.
        </p>
        <div className="ds-print-swap">
          <div className="ds-print-swap__card">
            <span
              className="ds-print-swap__chip"
              style={{ background: "var(--color-brand-secondary)" }}
              aria-hidden="true"
            />
            <p className="ds-print-swap__label">Digital — Blue</p>
            <code>#3F00EB</code>
          </div>
          <span className="ds-print-swap__arrow" aria-hidden="true">
            &rarr;
          </span>
          <div className="ds-print-swap__card">
            <span
              className="ds-print-swap__chip"
              style={{ background: "var(--color-print-purple-home)" }}
              aria-hidden="true"
            />
            <p className="ds-print-swap__label">Print — Purple (Home)</p>
            <code>#6A5AA7</code>
          </div>
          <div className="ds-print-swap__card">
            <span
              className="ds-print-swap__chip"
              style={{ background: "var(--color-print-purple-press)" }}
              aria-hidden="true"
            />
            <p className="ds-print-swap__label">Print — Purple (Press)</p>
            <code>#674DA0</code>
          </div>
        </div>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Document greys</h2>
        <p className="fe-body">
          Two warm greys (<code>#F0EDE7</code>, <code>#D7D2CB</code>) belong to the
          Brand Book&rsquo;s own document design only &mdash; tables, callout
          boxes, reference notes. They are <strong>not</strong> part of the
          ForEveryone brand palette and must not appear in product UI.
        </p>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Cafe signs</h2>
        <ul className="ds-rule-list">
          <li>Keep signage simple, clear, playful, and welcoming.</li>
          <li>
            Make information easy to read at a glance: clean layout, strong
            hierarchy, minimal clutter.
          </li>
          <li>
            Place the ForEveryone and No. 52 logos where they don&rsquo;t distract
            from the main message.
          </li>
          <li>
            Confirm the print method and CMYK values with Roxana before starting.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Adjusting photos (Canva)</h2>
        <p className="fe-body">
          Photos can be brightened directly in Canva: select the photo &rarr; Edit
          &rarr; Adjust, increase <strong>Brightness</strong> slightly and{" "}
          <strong>Shadows</strong> to bring out detail in faces. Leave Contrast,
          Highlights, Whites, and Blacks at 0 unless further correction is needed.
        </p>
      </section>
    </>
  );
}
