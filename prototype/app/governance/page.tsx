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
              <strong>The GitHub repository</strong>
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
        <p className="fe-body">
          This maps the Brand Book&rsquo;s own versioning model (p.41) onto the
          repo: a <strong>minor</strong> update covers spelling corrections,
          updated contacts, and broken links; a <strong>major</strong> update
          covers significant changes to brand rules, new sections, or a rebrand.
        </p>
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
        <h2 className="ds-section-title">Ethical representation</h2>
        <p className="fe-body">
          Photography rules that protect the people in our images (Brand Book v1.0
          p.32). These are content and consent rules for editors, not enforced in
          code.
        </p>
        <ul className="ds-rule-list">
          <li>
            <strong>Minors:</strong> obtain parental or guardian consent before
            photographing or publishing images of anyone under 18; when in doubt,
            avoid close-ups of children entirely.
          </li>
          <li>
            <strong>General participants:</strong> post a visible photography
            notice at event entry; if someone asks not to be photographed, respect
            it immediately.
          </li>
          <li>
            <strong>Vulnerable individuals:</strong> be sensitive about publishing
            images of people who appear distressed or overwhelmed, even with
            consent.
          </li>
          <li>
            <strong>Cultural sensitivity:</strong> never publish an image that could
            mock or trivialise someone&rsquo;s cultural or religious identity.
          </li>
          <li>
            <strong>Context:</strong> never reuse a photo in a context it was not
            taken for in a way that implies an endorsement.
          </li>
          <li>
            <strong>Right to withdraw:</strong> if someone asks for their photo to be
            removed after posting, handle it promptly and without question.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Contact &amp; permissions</h2>
        <ul className="ds-rule-list">
          <li>
            Organisational approval (sponsor logos, partnerships, legal documents):
            contact <strong>Roxana</strong> or <strong>Andr&eacute;</strong>, the
            co-founders.
          </li>
          <li>
            Asset access (Google Drive, Canva): message the Workshop Manager via the
            Marketing Hub on Slack.
          </li>
          <li>Design questions: post in the graphic-design channel on Slack.</li>
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
