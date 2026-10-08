import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "Contributors, tools, and license terms for the ForEveryone design system.",
};

const REPO_URL = "https://github.com/Foreveryone-berlin/design-system";

const contributors = [
  { name: "Rie Takeuchi", role: "Brand and Visual Design Lead" },
  { name: "Roxana Sillmen", role: "Co-founder" },
  { name: "Marco Pontili", role: "Web Lead and Implementation" },
  { name: "Pedram Madani", role: "Technology Lead" },
  { name: "Angelina Andriianova", role: "UX/UI Designer" },
  { name: "Didem Odemis", role: "UX/UI Designer" },
] as const;

const stack: { name: string; role: ReactNode }[] = [
  { name: "Figma", role: "Visual source of truth for the design system" },
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
  {
    name: "Playwright",
    role: "End-to-end and screenshot testing",
  },
  {
    name: "Playwriter",
    role: "Drives the real browser for live spot checks",
  },
  {
    name: "Claude Code",
    role: "Coding assistance for implementation",
  },
  {
    name: "Cursor",
    role: "Coding assistance for implementation",
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
    name: "BrowserStack",
    href: "https://www.browserstack.com/",
    role: "Cross-browser and device accessibility checks",
  },
];

export default function CreditsPage() {
  return (
    <>
      <h1 className="ds-page-title">Credits</h1>
      <p className="ds-intro">
        The people, tools, and licenses behind the ForEveryone design system.
      </p>

      <section id="contributors" className="ds-section">
        <h2 className="ds-section-title">Contributors</h2>
        <p className="ds-section-intro">
          Six people shaped this system through brand, design, technology, and
          implementation work. Meet the wider team on{" "}
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
              <strong>{name}</strong>: {role}
            </li>
          ))}
        </ul>
      </section>

      <section id="stack" className="ds-section">
        <h2 className="ds-section-title">Built with</h2>
        <ul className="ds-rule-list">
          {stack.map(({ name, role }) => (
            <li key={name}>
              <strong>{name}</strong>: {role}
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
              </a>
              : {role}
            </li>
          ))}
        </ul>
      </section>

      <section id="photography" className="ds-section">
        <h2 className="ds-section-title">Photography</h2>
        <p className="ds-section-intro">
          Prototype photographs on this site are{" "}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash
          </a>{" "}
          stock, used under the{" "}
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
          >
            Unsplash License
          </a>
          . Photographer names and photo links are recorded in{" "}
          <a
            href={`${REPO_URL}/blob/main/prototype/public/images/ASSETS.md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            ASSETS.md
          </a>
          .
        </p>
      </section>

      <section id="license" className="ds-section">
        <h2 className="ds-section-title">License</h2>
        <ul className="ds-rule-list">
          <li>
            <strong>Code and prototype</strong> (<code>scripts/</code>,{" "}
            <code>prototype/</code>): MIT License. You may use, modify, and
            distribute the software.
          </li>
          <li>
            <strong>Design system materials</strong> (tokens, CSS, Figma,
            integrations, and docs): CC BY-NC 4.0. You may share and adapt these
            materials for non-commercial use with attribution.{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              License summary
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
