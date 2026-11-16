---
name: fe-design-system
description: Route ForEveryone UI work to the design-system sources and the matching consumer skill. Use when asked to use the ForEveryone design system, invoke fe-design-system, or locate brand rules, tokens, component contracts, and integration guidance.
metadata:
  foreveryone: ">=1.14.0 <2.0.0"
  requires: ""
  docs: "llms.txt, docs/agent-skills.md, docs/brand-book-references.md, integrations/README.md"
  guide: "Find the maintained sources and choose the skill for the task."
---

# ForEveryone design-system entry point

## When to use

Adapted from the `fe-design-system` routing skill in the ForEveryone website
repository. Locate the maintained sources, then load the skill for the task.
Brand rules stay in those sources.

## Workflow

- [ ] Step 1: Locate this repository or the installed payload
- [ ] Step 2: Read the skill index and load fe-core
- [ ] Step 3: Load the task skill
- [ ] Step 4: Verify

## Step 1: Locate this repository or the installed payload

Prefer this design-system repository when working inside it. In a consumer
project, use its configured local clone or installed skill payload. The install
paths this repo supports are the local `fe-ds` commands below. Run them from the
consumer project, with a clone available:

```bash
node path/to/design-system/bin/fe-ds.mjs skills install --dry-run
node path/to/design-system/bin/fe-ds.mjs skills install
```

`--target` accepts `claude`, `cursor`, `codex`, `agents`, and `dir`. The
installer copies the payload from the clone and needs no network access. Options
are in `docs/agent-skills.md`.

## Step 2: Read the skill index and load fe-core

Read `dist/skills/index.json` in the source repository, `index.json` in an
installed payload, or the public
[GitHub index](https://raw.githubusercontent.com/Foreveryone-berlin/design-system/main/dist/skills/index.json).

Load [`fe-core`](../fe-core/SKILL.md) next. It holds the shared conventions.
Load any prerequisites listed in a skill's frontmatter before that skill.

## Step 3: Load the task skill

| Task | Skill |
| --- | --- |
| New UI, allowed colours and fonts, shared CSS | [`fe-core`](../fe-core/SKILL.md) |
| Resolve or extend tokens and CSS variables | [`fe-tokens`](../fe-tokens/SKILL.md) |
| Add, change, or remove a token in this repository | [`fe-token-authoring`](../fe-token-authoring/SKILL.md) |
| Buttons, cards, forms, navigation, and documented patterns | [`fe-components`](../fe-components/SKILL.md) |
| Add a public component contract in this repository | [`fe-component-authoring`](../fe-component-authoring/SKILL.md) |
| Contrast, focus, motion, and alternative text | [`fe-a11y`](../fe-a11y/SKILL.md) |
| Restyle an existing interface | [`fe-redesign`](../fe-redesign/SKILL.md) |
| OG images and featured artwork | [`fe-og-image`](../fe-og-image/SKILL.md) |

Resolve implementation details from `llms.txt`, `spec/tokens.json`,
`spec/principles.md`, and the relevant component contracts. Installed payloads
include `tokens.json`. Fetch a missing contract from
[GitHub](https://github.com/Foreveryone-berlin/design-system).

Figma governs visual decisions. This repository governs implementation. When they
disagree, name the mismatch. `docs/brand-book-references.md` records authority
by domain.

For a host platform, read `integrations/README.md` and that target's guidance
before applying shared classes. Reading this skill does not authorize changes
to a consuming site.

## Rules

1. Use the local clone or the installed payload. Do not assume a filesystem path.
2. Read the skill index, then `fe-core`, then the task skill and its prerequisites.
3. Resolve colours, type, and components from `llms.txt`, `spec/tokens.json`,
   `spec/principles.md`, and `spec/components/`.
4. Install with `node path/to/design-system/bin/fe-ds.mjs skills install`.

## Verify

The index lists the skill you loaded, and that skill's `requires` skills are
loaded too. On a page that imports the design-system CSS, the browser resolves
a brand variable:

```js
getComputedStyle(document.documentElement).getPropertyValue("--color-brand-primary").trim()
```

A non-empty `oklch()` value means the custom properties loaded. An empty string
means the import path is wrong.

## Do not

- Use the human-facing prototype's `/skills/` or `/llms.txt` URLs as agent
  fallbacks. Read public GitHub files instead.
- Carry a website-local path into a consumer project.
- Change a live consuming site without authorization.

## Canonical docs

- [Agent skills and installer](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/agent-skills.md)
- [Brand authority](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/brand-book-references.md)
