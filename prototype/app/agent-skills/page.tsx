import type { Metadata } from "next";
import CodeBlock from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Agent skills",
  description:
    "Guides for AI agents that build or restyle UI with this design system: core conventions, and a redesign workflow.",
};

const REPO_DOCS =
  "https://github.com/Foreveryone-berlin/design-system/blob/develop/docs/agent-skills.md";

export default function AgentSkillsPage() {
  return (
    <>
      <h1 className="ds-page-title">Agent skills</h1>
      <p className="ds-intro">
        Guides for AI agents that build or restyle UI with this system: core
        conventions, and a redesign workflow. The rules match what is already in{" "}
        <a href="/llms.txt">
          <code>llms.txt</code>
        </a>
        , the token list, and the component docs. Install them into another
        project when the agent is working there instead of in this repository.
      </p>

      <section className="ds-section">
        <h2 className="ds-section-title">Core</h2>
        <p className="fe-body">
          The <code>fe-core</code> skill. Use it for new UI built with this
          system.
        </p>
        <ul className="ds-rule-list">
          <li>
            <strong>Tokens only.</strong> Import our CSS variables once; style
            with <code>var(--…)</code>. Do not invent hex values or font names.
          </li>
          <li>
            <strong>Prefer <code>fe-*</code> components.</strong> Buttons, cards,
            inputs, tags, and the other documented contracts come before one-off
            styles.
          </li>
          <li>
            <strong>Colour roles.</strong> Charcoal text on light backgrounds;
            orange is decorative only; blue is for alerts, always with white
            text.
          </li>
          <li>
            <strong>Focus and motion.</strong> Keep keyboard focus visible;
            honour <code>prefers-reduced-motion</code>.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Redesign</h2>
        <p className="fe-body">
          The <code>fe-redesign</code> skill. Use it to bring an existing app
          onto ForEveryone. It builds on Core.
        </p>
        <ul className="ds-rule-list">
          <li>
            <strong>Map by role.</strong> Replace ad-hoc colours and fonts with
            the nearest tokens (background, text, accent).
          </li>
          <li>
            <strong>Match the contracts.</strong> Rebuild buttons, cards, forms,
            and similar pieces to the documented <code>fe-*</code> patterns and
            states.
          </li>
          <li>
            <strong>Type and layout.</strong> Filson Pro on the web; body
            line-height never below 1.5; only the approved colour pairings.
          </li>
          <li>
            <strong>Check the result.</strong> No print-only tokens on the web;
            contrast still holds; focus and motion rules still apply.
          </li>
        </ul>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">Install</h2>
        <p className="fe-body">
          Clone this repository. In the project where the skills should live,
          run:
        </p>
        <CodeBlock
          code="node path/to/design-system/bin/fe-ds.mjs skills install"
          language="bash"
        />
        <p className="fe-body">
          The skills are copied into that project, and a short note is added to
          its <code>AGENTS.md</code>. Cursor, Claude Code, and Codex folders are
          updated too when they already exist. Details and options:{" "}
          <a href={REPO_DOCS} target="_blank" rel="noopener noreferrer">
            docs/agent-skills.md
          </a>
          .
        </p>
      </section>

      <section className="ds-section">
        <h2 className="ds-section-title">On this site</h2>
        <p className="fe-body">
          The same starting points are also available here:
        </p>
        <ul className="ds-rule-list">
          <li>
            <a href="/llms.txt">
              <code>/llms.txt</code>
            </a>
            : entry point and hard rules
          </li>
          <li>
            <a href="/skills/index.json">
              <code>/skills/index.json</code>
            </a>
            : which skills exist
          </li>
          <li>
            <a href="/skills/tokens.json">
              <code>/skills/tokens.json</code>
            </a>
            : token names, values, and CSS variables
          </li>
        </ul>
      </section>
    </>
  );
}
