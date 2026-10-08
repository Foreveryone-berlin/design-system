import type { Metadata } from "next";
import CodeBlock from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Agent skills",
  description:
    "Installable guides for AI agents that build or restyle UI with this design system.",
};

const REPO_DOCS =
  "https://github.com/Foreveryone-berlin/design-system/blob/develop/docs/agent-skills.md";

const SKILLS = [
  {
    id: "fe-core",
    title: "fe-core",
    summary: "Base rules for every consumer skill. Start here for new UI.",
    points: [
      <>
        <strong>Tokens only.</strong> Import CSS variables once; style with{" "}
        <code>var(--…)</code>. Do not invent hex values or font names.
      </>,
      <>
        <strong>
          Prefer <code>fe-*</code> components.
        </strong>{" "}
        Documented buttons, cards, inputs, tags, and patterns before one-off
        styles.
      </>,
      <>
        <strong>Colour roles.</strong> Charcoal text on light backgrounds;
        orange is decorative only; blue is for alerts, always with white text.
      </>,
      <>
        <strong>Focus and motion.</strong> Keep keyboard focus visible; honour{" "}
        <code>prefers-reduced-motion</code>.
      </>,
    ],
  },
  {
    id: "fe-redesign",
    title: "fe-redesign",
    summary: "Restyle an existing app onto ForEveryone. Requires fe-core.",
    points: [
      <>
        <strong>Map by role.</strong> Replace ad-hoc colours and fonts with the
        nearest tokens (background, text, accent).
      </>,
      <>
        <strong>Match the contracts.</strong> Rebuild controls to documented{" "}
        <code>fe-*</code> patterns and states.
      </>,
      <>
        <strong>Type and layout.</strong> Filson Pro on the web; body
        line-height never below 1.5; only approved colour pairings.
      </>,
      <>
        <strong>Check the result.</strong> No print-only tokens on the web;
        contrast, focus, and motion rules still hold.
      </>,
    ],
  },
  {
    id: "fe-tokens",
    title: "fe-tokens",
    summary: "Resolve and apply tokens by role. Requires fe-core.",
    points: [
      <>
        Resolve names from <code>tokens.json</code>; output{" "}
        <code>var(--*)</code> only.
      </>,
      <>
        Digital surface only on the web; never use <code>surface: &quot;print&quot;</code>{" "}
        tokens.
      </>,
      <>Extend missing shades in OKLCH; never invent hex or font names.</>,
    ],
  },
  {
    id: "fe-a11y",
    title: "fe-a11y",
    summary: "WCAG 2.1 AA, contrast, focus, motion, and alt text. Requires fe-core.",
    points: [
      <>Target WCAG 2.1 AA; use approved background ⇄ text pairings only.</>,
      <>
        Keep visible keyboard focus and honour{" "}
        <code>prefers-reduced-motion</code>.
      </>,
      <>Meaningful alt text for content images; empty alt for decoration.</>,
    ],
  },
  {
    id: "fe-components",
    title: "fe-components",
    summary: "Prefer documented fe-* contracts and state matrices. Requires fe-core.",
    points: [
      <>
        Follow <code>spec/components/*.md</code> before inventing classes.
      </>,
      <>Implement the full state matrix where the contract defines one.</>,
      <>
        Icon and play buttons use the documented <code>fe-icon-btn</code> /{" "}
        <code>fe-play-btn</code> patterns.
      </>,
    ],
  },
] as const;

export default function AgentSkillsPage() {
  return (
    <>
      <h1 className="ds-page-title">Agent skills</h1>
      <p className="ds-intro">
        Short, installable guides for AI agents that build or restyle UI with
        this system. The rules match{" "}
        <a href="/llms.txt">
          <code>llms.txt</code>
        </a>
        , the token list, and the component docs. Install them into another
        project when the agent works there instead of in this repository.
      </p>

      <section id="what-these-are" className="ds-section">
        <h2 className="ds-section-title">What these are</h2>
        <p className="fe-body">
          Consumer skills live in the repo root <code>skills/</code> folder.
          That is separate from maintainer workflows in{" "}
          <code>docs/skills/</code> and project tools in{" "}
          <code>.claude/skills/</code>. Every skill below requires{" "}
          <code>fe-core</code> except <code>fe-core</code> itself.
        </p>
      </section>

      <section id="skills" className="ds-section">
        <h2 className="ds-section-title">Skills</h2>
        {SKILLS.map((skill) => (
          <div key={skill.id} id={skill.id} className="ds-section">
            <h3 className="ds-subsection-title">
              <code>{skill.title}</code>
            </h3>
            <p className="fe-body">{skill.summary}</p>
            <ul className="ds-rule-list">
              {skill.points.map((point, i) => (
                <li key={`${skill.id}-${i}`}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section id="install" className="ds-section">
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
          updated too when they already exist. Zero network after the clone.
          Details and options:{" "}
          <a href={REPO_DOCS} target="_blank" rel="noopener noreferrer">
            docs/agent-skills.md
          </a>
          .
        </p>
      </section>

      <section id="on-this-site" className="ds-section">
        <h2 className="ds-section-title">On this site</h2>
        <p className="fe-body">
          The same starting points are also available here (narrow agent entry;
          the rest of the prototype stays noindex and blocks AI crawlers):
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
