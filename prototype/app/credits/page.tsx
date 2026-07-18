import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "Contributors, tools, and licence terms for the ForEveryone design system.",
};

const REPO_URL = "https://github.com/Foreveryone-berlin/design-system";

const contributors = [
  { name: "Angelina Andriianova", role: "UX/UI design" },
  { name: "Didem Odemis", role: "UX/UI design" },
  { name: "Marco Pontili", role: "Web lead and implementation" },
  { name: "Pedram Madani", role: "Tech lead" },
  { name: "Rie Takeuchi", role: "Brand and visual design lead" },
  { name: "Roxana Sillmen", role: "Co-founder" },
];

const stack: { name: string; role: ReactNode }[] = [
  { name: "Figma", role: "Visual source of truth for the design system" },
  {
    name: "WordPress + Elementor Pro",
    role: (
      <>
        Marketing site at{" "}
        <a
          href="https://foreveryone.berlin"
          target="_blank"
          rel="noopener noreferrer"
        >
          foreveryone.berlin
        </a>
      </>
    ),
  },
  {
    name: "Next.js",
    role: (
      <>
        Design system prototype and PWA web apps at{" "}
        <a
          href="https://app.foreveryone.berlin"
          target="_blank"
          rel="noopener noreferrer"
        >
          app.foreveryone.berlin
        </a>{" "}
        and{" "}
        <a
          href="https://dash.foreveryone.berlin"
          target="_blank"
          rel="noopener noreferrer"
        >
          dash.foreveryone.berlin
        </a>
      </>
    ),
  },
  { name: "Playwright + axe-core", role: "End-to-end and accessibility testing" },
  {
    name: "Cursor",
    role: "IDE and CLI agent-assisted development of tokens, CSS, and the prototype",
  },
  {
    name: "Claude Code",
    role: "Agent-assisted development of tokens, CSS, and the prototype",
  },
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
    href: "https://github.com/browserstack/mcp-server",
    role: "MCP server for cross-browser and accessibility checks",
  },
];

export default function CreditsPage() {
  return (
    <>
      <h1 className="ds-page-title">Credits</h1>
      <p className="ds-intro">
        Who built this design system, the tools we used, and how it is licensed.
      </p>

      <section id="contributors" className="ds-section">
        <h2 className="ds-section-title">Contributors</h2>
        <p className="ds-section-intro">
          The people who shaped this design system through brand, UX/UI, and web
          work. Meet the rest of the team on{" "}
          <a
            href="https://foreveryone.berlin/about-us"
            target="_blank"
            rel="noopener noreferrer"
          >
            About us at foreveryone.berlin
          </a>
          .
        </p>
        <ul className="ds-rule-list">
          {contributors.map(({ name, role }) => (
            <li key={name}>
              <strong>{name}</strong> &mdash; {role}
            </li>
          ))}
        </ul>
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
