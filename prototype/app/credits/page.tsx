import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "The people, tools, and licences behind the ForEveryone Berlin design system.",
};

const REPO_URL = "https://github.com/Foreveryone-berlin/design-system";

const people = ["Rie", "Roxana", "Didem", "Pedram", "Marco", "Angelina"];

const stack = [
  { name: "Figma", role: "Visual source of truth for the design system" },
  { name: "WordPress + Elementor Pro", role: "Live-site platform the system targets" },
  { name: "Next.js", role: "Prototype framework (App Router, React 19)" },
  { name: "Playwright + axe-core", role: "End-to-end and accessibility testing" },
  { name: "Claude Code", role: "Agent-assisted development of tokens, CSS, and the prototype" },
];

const tools = [
  {
    name: "WebAIM Contrast Checker",
    href: "https://webaim.org/resources/contrastchecker/",
    role: "Colour-contrast verification",
  },
  {
    name: "axe-core",
    href: "https://github.com/dequelabs/axe-core",
    role: "Automated WCAG 2.1 AA checks in CI",
  },
  {
    name: "BrowserStack MCP",
    href: "https://www.browserstack.com/",
    role: "Cross-browser and accessibility checks",
  },
];

export default function CreditsPage() {
  return (
    <>
      <h1 className="ds-page-title">Credits</h1>
      <p className="ds-intro">
        This design system is a community effort &mdash; built with care by the
        people who make ForEveryone Berlin what it is: a warm, open space where
        everyone belongs.
      </p>

      <section id="people" className="ds-section">
        <h2 className="ds-section-title">With thanks to</h2>
        <p className="ds-section-intro">
          The people who shaped the brand, the system, and the community it
          serves.
        </p>
        <div className="fe-label-cards">
          {people.map((name) => (
            <div className="fe-label-card" key={name}>
              <span className="fe-label-card__label">Contributor</span>
              <span className="fe-label-card__value">{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="stack" className="ds-section">
        <h2 className="ds-section-title">Built with</h2>
        <ul className="ds-rule-list">
          {stack.map(({ name, role }) => (
            <li key={name}>
              <strong>{name}</strong> &mdash; {role}
            </li>
          ))}
        </ul>
      </section>

      <section id="tools" className="ds-section">
        <h2 className="ds-section-title">Accessibility tooling</h2>
        <ul className="ds-rule-list">
          {tools.map(({ name, href, role }) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                {name}
              </a>{" "}
              &mdash; {role}
            </li>
          ))}
        </ul>
      </section>

      <section id="license" className="ds-section">
        <h2 className="ds-section-title">Licence</h2>
        <ul className="ds-rule-list">
          <li>
            <strong>Software</strong> (<code>scripts/</code>,{" "}
            <code>prototype/</code>): MIT.
          </li>
          <li>
            <strong>Design system</strong> (tokens, CSS, Figma, Elementor, and
            docs):{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY-NC 4.0
            </a>
            .
          </li>
          <li>
            Full text in the{" "}
            <a href={`${REPO_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">
              LICENSE
            </a>{" "}
            file.
          </li>
        </ul>
      </section>
    </>
  );
}
