---
name: fe-design-system
description: Route ForEveryone UI work to the design-system sources and the matching consumer skill. Use when asked to use the ForEveryone design system, invoke fe-design-system, or locate brand rules, tokens, component contracts, and integration guidance.
metadata:
  foreveryone: ">=1.14.0 <2.0.0"
  requires: ""
  docs: "llms.txt, docs/agent-skills.md, docs/brand-book-references.md, integrations/README.md"
---

# ForEveryone design-system entry point

## When to use

Adapted from the `fe-design-system` routing skill in the ForEveryone website
repository. Locate the maintained sources, then load the skill for the task;
do not duplicate brand rules or infer them from screenshots.

## Rules

1. Prefer this design-system repository when working inside it. In a consumer
   project, use its configured local clone or installed skill payload. Do not
   assume a particular user's filesystem path.
2. Read the skill index: `dist/skills/index.json` in the source repository,
   `index.json` in an installed payload, or the public
   [GitHub index](https://raw.githubusercontent.com/Foreveryone-berlin/design-system/main/dist/skills/index.json).
3. Read [`_shared/conventions.md`](../_shared/conventions.md), then
   [`fe-core`](../fe-core/SKILL.md) and the task-specific skill below. Load any
   prerequisites listed in its frontmatter.
4. Resolve implementation details from the repository's `llms.txt`,
   `spec/tokens.json`, `spec/principles.md`, and relevant component contracts.
   Installed payloads include `tokens.json`; fetch any missing contracts from
   [GitHub](https://github.com/Foreveryone-berlin/design-system).

## Choose the skill

| Task | Skill |
| --- | --- |
| New UI, allowed colours and fonts, shared CSS | [`fe-core`](../fe-core/SKILL.md) |
| Resolve or extend tokens and CSS variables | [`fe-tokens`](../fe-tokens/SKILL.md) |
| Buttons, cards, forms, navigation, and documented patterns | [`fe-components`](../fe-components/SKILL.md) |
| Contrast, focus, motion, and alternative text | [`fe-a11y`](../fe-a11y/SKILL.md) |
| Restyle an existing interface | [`fe-redesign`](../fe-redesign/SKILL.md) |
| OG images and featured artwork | [`fe-og-image`](../fe-og-image/SKILL.md) |

Figma governs visual decisions; the repository governs implementation. If they
disagree, identify the mismatch rather than inventing a resolution. Consult
`docs/brand-book-references.md` for authority by domain.

For a host platform, read `integrations/README.md` and that target's guidance
before applying shared classes or mapping globals. Reading this skill does not
authorize changes to a consuming site.

## Do not

- Do not use the human-facing prototype's `/skills/` or `/llms.txt` URLs as agent
  fallbacks. Read public GitHub files instead.
- Do not carry website-local paths into a consumer project or change a live
  consuming site without authorization.

## Canonical docs

- [Agent skills and installer](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/agent-skills.md)
- [Brand authority](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/brand-book-references.md)

From the consumer project's root, install with a local clone available:


```bash
node path/to/design-system/bin/fe-ds.mjs skills install --dry-run
node path/to/design-system/bin/fe-ds.mjs skills install
```

Use the installer rather than hand-copying discovery folders. It installs Codex
discovery and mirrors into existing Claude or Cursor layouts while preserving
unrelated project guidance. Options and generated-file boundaries are documented
in `docs/agent-skills.md` in the source repository.
