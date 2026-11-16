import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import CodeBlock from "../_components/CodeBlock";

export const metadata: Metadata = {
  title: "Agent skills",
  description: "Guides for using ForEveryone tokens, components, and brand rules with Claude Code, Cursor, and Codex.",
  alternates: { canonical: "/agent-skills" },
};

const RAW = "https://raw.githubusercontent.com/Foreveryone-berlin/design-system/main";
const REPO_DOCS = "https://github.com/Foreveryone-berlin/design-system/blob/main/docs/agent-skills.md";

const SKILL_ORDER = [
  "fe-design-system",
  "fe-core",
  "fe-tokens",
  "fe-token-authoring",
  "fe-components",
  "fe-component-authoring",
  "fe-a11y",
  "fe-redesign",
  "fe-og-image",
];

type SkillEntry = {
  name: string;
  description: string;
  guide?: string;
};

function loadSkills(): SkillEntry[] {
  const indexPath = path.join(process.cwd(), "..", "dist", "skills", "index.json");
  const index = JSON.parse(readFileSync(indexPath, "utf8")) as { skills: SkillEntry[] };
  return [...index.skills].sort((a, b) => {
    const indexA = SKILL_ORDER.indexOf(a.name);
    const indexB = SKILL_ORDER.indexOf(b.name);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.name.localeCompare(b.name);
  });
}

export default function AgentSkillsPage() {
  const skills = loadSkills();
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
              {skills.map((skill) => (
                <tr key={skill.name} id={skill.name}>
                  <th scope="row"><a href={`https://github.com/Foreveryone-berlin/design-system/blob/main/skills/${skill.name}/SKILL.md`}><code>{skill.name}</code></a></th>
                  <td>{skill.guide || skill.description}</td>
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
