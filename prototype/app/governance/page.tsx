import packageJson from "@/package.json";

export const metadata = {
  title: "Governance",
};

export default function GovernancePage() {
  const version = packageJson.version;
  return (
    <>
      <h1 className="ds-page-title">Governance</h1>
      <p className="ds-intro">
        How the system evolves and stays consistent: versioning, contribution,
        and the changelog. Current release: <strong>v{version}</strong>.
      </p>

      <section className="ds-section">
        <h2 className="ds-section-title">Source of truth</h2>
        <ul className="ds-rule-list">
          <li>
            <strong>Figma</strong> is the source of truth for visual decisions.
          </li>
          <li>
            <a
              href="https://github.com/Foreveryone-berlin/design-system"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>This repo</strong>
            </a>{" "}
            is the source of truth for implementation: DTCG tokens, generated
            CSS, and the prototype.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Versioning</h2>
        <ul className="ds-rule-list">
          <li>Semantic versioning; releases are tagged on main as v1.0.0.</li>
          <li>
            Token or CSS changes require a CHANGELOG entry under the in-flight
            version.
          </li>
          <li>
            Root and prototype <code>package.json</code> versions stay in sync.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Contribution</h2>
        <ul className="ds-rule-list">
          <li>
            Branch from <code>develop</code> (not main). Prefixes:{" "}
            <code>feature/</code>, <code>fix/</code>, <code>docs/</code>,{" "}
            <code>chore/</code>.
          </li>
          <li>Use Conventional Commits and the PR template.</li>
          <li>
            Edit tokens, not <code>css/custom-properties.css</code>; run{" "}
            <code>node scripts/build-css.js</code> after token changes.
          </li>
          <li>
            Author CSS with <code>var(--token)</code> only; no raw hex or font
            names.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Changelog</h2>
        <p className="fe-body">
          All notable changes are recorded in{" "}
          <a
            href="https://github.com/Foreveryone-berlin/design-system/blob/main/CHANGELOG.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <code>CHANGELOG.md</code>
          </a>{" "}
          using{" "}
          <a
            href="https://keepachangelog.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Keep a Changelog
          </a>
          , with imperative one-line entries and labels (Feat, Fix, Enhance,
          Perf, Chore, Docs).
        </p>
      </section>
    </>
  );
}
