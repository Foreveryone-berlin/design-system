import type { Metadata } from "next";
import CodeBlock from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Agent skills",
  description: "Guides for using ForEveryone tokens, components, and brand rules with Claude Code, Cursor, and Codex.",
  alternates: { canonical: "/agent-skills" },
};

const RAW = "https://raw.githubusercontent.com/Foreveryone-berlin/design-system/main";
const REPO_DOCS = "https://github.com/Foreveryone-berlin/design-system/blob/main/docs/agent-skills.md";

const SKILLS = [
  { id: "fe-design-system", summary: "Find the maintained sources and choose the skill for your task." },
  { id: "fe-core", summary: "Use the shared CSS, approved colours, typography, and brand rules." },
  { id: "fe-tokens", summary: "Resolve token names and extend the palette by role." },
  { id: "fe-components", summary: "Build components from documented markup and state contracts." },
  { id: "fe-a11y", summary: "Check contrast, keyboard focus, motion, and alternative text." },
  { id: "fe-redesign", summary: "Map an existing interface onto the design system." },
  { id: "fe-og-image", summary: "Create OG and featured images for a specific page." },
];

export default function AgentSkillsPage() {
  return (
    <>
      <h1 className="ds-page-title">Agent skills</h1>
      <p className="ds-intro">
        Guides for using ForEveryone tokens, components, and brand rules with
        Claude Code, Cursor, and Codex.
      </p>

      <section id="skills" className="ds-section">
        <h2 className="ds-section-title">Choose a skill</h2>
        <p className="fe-body">
          Start with <code>fe-design-system</code> to find the sources.
          Use <code>fe-core</code> for implementation rules; the specialist
          skills build on that foundation.
        </p>
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead><tr><th scope="col">Skill</th><th scope="col">Use it to</th></tr></thead>
            <tbody>
              {SKILLS.map((skill) => (
                <tr key={skill.id} id={skill.id}>
                  <th scope="row"><a href={`https://github.com/Foreveryone-berlin/design-system/blob/main/skills/${skill.id}/SKILL.md`}><code>{skill.id}</code></a></th>
                  <td>{skill.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="install" className="ds-section">
        <h2 className="ds-section-title">Install</h2>
        <p className="fe-body">
          Clone the repository, then run the installer from the project that
          needs the skills. Preview the changes before installing:
        </p>
        <CodeBlock
          code={"node path/to/design-system/bin/fe-ds.mjs skills install --dry-run\nnode path/to/design-system/bin/fe-ds.mjs skills install"}
          language="bash"
        />
        <p className="fe-body">
          Claude Code receives skill copies when <code>.claude/</code> exists.
          Cursor and Codex share discovery in <code>.agents/skills/</code>. The installer
          preserves unrelated guidance and needs no network access.
        </p>
        <p className="fe-body"><a href={REPO_DOCS}>Installer options and file locations</a></p>
      </section>

      <section id="on-github" className="ds-section">
        <h2 className="ds-section-title">Sources for agents</h2>
        <p className="fe-body">Agents read the public repository rather than this preview.</p>
        <ul className="ds-rule-list">
          <li><a href={`${RAW}/llms.txt`}><code>llms.txt</code></a>: entry point and shared rules</li>
          <li><a href={`${RAW}/dist/skills/index.json`}><code>index.json</code></a>: skill list and versions</li>
          <li><a href={`${RAW}/dist/skills/tokens.json`}><code>tokens.json</code></a>: token values and CSS variables</li>
        </ul>
      </section>
    </>
  );
}
