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
    summary: "Base rules for every other skill. Start here for new UI.",
    points: [
      <>
        Import the CSS variables once and style with <code>var(--…)</code>.
        Never invent hex values or font names.
      </>,
      <>
        Prefer documented <code>fe-*</code> components over one-off styles.
      </>,
      <>
        Charcoal body text on light backgrounds. Orange is accent only, never
        behind text. Blue takes pure white text and stays digital.
      </>,
      <>
        Keep keyboard focus visible and honour{" "}
        <code>prefers-reduced-motion</code>.
      </>,
    ],
  },
  {
    id: "fe-tokens",
    summary: "Pick and extend tokens by role.",
    points: [
      <>
        Resolve names from <code>tokens.json</code> and output{" "}
        <code>var(--*)</code> only.
      </>,
      <>
        Use digital tokens on the web, never <code>surface: &quot;print&quot;</code>.
      </>,
      <>Extend a missing shade in OKLCH instead of adding a hex value.</>,
    ],
  },
  {
    id: "fe-components",
    summary: "Build controls from the documented fe-* contracts.",
    points: [
      <>
        Follow <code>spec/components/*.md</code> before inventing a class.
      </>,
      <>Implement every state the contract defines, not only the default.</>,
      <>
        Icon and play buttons use <code>fe-icon-btn</code> and{" "}
        <code>fe-play-btn</code>.
      </>,
    ],
  },
  {
    id: "fe-a11y",
    summary: "Check contrast, focus, motion, and alt text against WCAG 2.1 AA.",
    points: [
      <>Use approved background and text pairings only.</>,
      <>Give icon-only controls an accessible name and keep focus visible.</>,
      <>Write meaningful alt text for content images; leave decoration empty.</>,
    ],
  },
  {
    id: "fe-redesign",
    summary: "Restyle an existing app onto ForEveryone.",
    points: [
      <>Map ad-hoc colours and fonts to the nearest token by role.</>,
      <>
        Rebuild controls to the <code>fe-*</code> contracts and their states.
      </>,
      <>Filson Pro on the web; body line-height never below 1.5.</>,
      <>Report a token-by-token mapping of what changed.</>,
    ],
  },
  {
    id: "fe-og-image",
    summary: "Create OG and featured images that match the page they link to.",
    points: [
      <>
        Read the destination page first; one headline, one subheading, and a
        call to action that names that page.
      </>,
      <>
        Generate the photo only; set type, logo, and decorations in an editable
        master. Export a 1200 × 630 JPEG or PNG.
      </>,
      <>
        Check the image at full size and as a small card. A WordPress featured
        image does not prove the published OG image.
      </>,
    ],
  },
] as const;

export default function AgentSkillsPage() {
  return (
    <>
      <h1 className="ds-page-title">Agent skills</h1>
      <p className="ds-intro">
        Short guides that teach AI agents to build or restyle UI with this
        system. They package the rules in{" "}
        <a href="/llms.txt">
          <code>llms.txt</code>
        </a>
        , the token list, and the component docs for use in another project.
      </p>

      <section id="what-these-are" className="ds-section">
        <h2 className="ds-section-title">What these are</h2>
        <p className="fe-body">
          Each skill is a folder with a <code>SKILL.md</code> file that Claude
          Code, Cursor, and Codex discover in their skills folders. Every other
          skill requires <code>fe-core</code>. Maintainer workflows for this
          repository live separately in <code>docs/skills/</code>.
        </p>
      </section>

      <section id="skills" className="ds-section">
        <h2 className="ds-section-title">Skills</h2>
        {SKILLS.map((skill) => (
          <div key={skill.id} id={skill.id} className="ds-section">
            <h3 className="ds-subsection-title">
              <code>{skill.id}</code>
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
          Clone this repository, then run the installer from the project that
          needs the skills. Add <code>--dry-run</code> to preview the changes.
        </p>
        <CodeBlock
          code="node path/to/design-system/bin/fe-ds.mjs skills install"
          language="bash"
        />
        <p className="fe-body">
          The installer copies the skills to <code>fe-skills/</code> and{" "}
          <code>.agents/skills/</code>, adds a short rules block to the
          project&apos;s <code>AGENTS.md</code>, and updates{" "}
          <code>.claude/</code> or <code>.cursor/</code> when those folders
          exist. It needs no network access. Options:{" "}
          <a href={REPO_DOCS} target="_blank" rel="noopener noreferrer">
            docs/agent-skills.md
          </a>
          .
        </p>
      </section>

      <section id="on-this-site" className="ds-section">
        <h2 className="ds-section-title">On this site</h2>
        <p className="fe-body">
          Agents can read these files directly. The rest of the site stays
          noindex and closed to AI crawlers, this page included.
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
            : skill list and versions
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
