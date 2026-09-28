/* Reading and validating skill sources under skills/.
 *
 * Consumed by scripts/build-skills.mjs and scripts/build-skills.test.mjs.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(here, '..', '..');
export const skillsRoot = path.join(repoRoot, 'skills');
export const sharedDirName = '_shared';

/** Frontmatter keys every SKILL.md must carry. */
export const FRONTMATTER_SCHEMA = {
  name: 'string',
  description: 'string',
  foreveryone: 'string',
  requires: 'list',
  docs: 'list',
};

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function stripQuotes(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

/**
 * Tiny YAML subset: `key: scalar` and `key: [a, b]` on one line.
 */
export function parseFrontmatter(text) {
  const match = text.match(FRONTMATTER_RE);
  if (!match) return { data: null, body: text, raw: '' };

  const data = {};
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const sep = line.indexOf(':');
    if (sep === -1) {
      data.__invalid = data.__invalid || [];
      data.__invalid.push(line);
      continue;
    }

    const key = line.slice(0, sep).trim();
    const value = line.slice(sep + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1).trim();
      data[key] = inner ? inner.split(',').map((v) => stripQuotes(v.trim())) : [];
    } else {
      data[key] = stripQuotes(value);
    }
  }

  return { data, body: text.slice(match[0].length), raw: match[1] };
}

function listFiles(dir, base = dir) {
  const out = [];
  for (const entry of readdirSync(dir).sort()) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listFiles(full, base));
    else out.push(path.relative(base, full).replace(/\\/g, '/'));
  }
  return out;
}

/** Every skill directory; prerequisites before dependants. */
export function readSkills({ root = skillsRoot } = {}) {
  const dirs = readdirSync(root)
    .filter((entry) => !entry.startsWith('_'))
    .filter((entry) => statSync(path.join(root, entry)).isDirectory())
    .sort();

  const skills = dirs.map((dir) => {
    const skillFile = path.join(root, dir, 'SKILL.md');
    if (!existsSync(skillFile)) {
      return { dir, error: 'missing SKILL.md', files: [] };
    }
    const text = readFileSync(skillFile, 'utf8');
    const { data, body } = parseFrontmatter(text);
    return {
      dir,
      path: path.join(root, dir),
      data: data ?? {},
      body,
      text,
      files: listFiles(path.join(root, dir)),
    };
  });

  return [
    ...skills.filter((s) => (s.data?.requires ?? []).length === 0),
    ...skills.filter((s) => (s.data?.requires ?? []).length > 0),
  ];
}

export function readShared({ root = skillsRoot } = {}) {
  const dir = path.join(root, sharedDirName);
  if (!existsSync(dir)) return [];
  return listFiles(dir).map((file) => ({
    file,
    path: path.join(dir, file),
    text: readFileSync(path.join(dir, file), 'utf8'),
  }));
}

export function satisfies(version, range) {
  const parse = (v) => v.split('.').map((n) => Number.parseInt(n, 10));
  const cmp = (a, b) => {
    const [x, y] = [parse(a), parse(b)];
    for (let i = 0; i < 3; i++) {
      if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) - (y[i] ?? 0);
    }
    return 0;
  };

  const parts = range.trim().split(/\s+/);
  for (const part of parts) {
    const match = part.match(/^(>=|<=|>|<|=)?(\d+\.\d+\.\d+)$/);
    if (!match) return false;
    const [, op = '=', target] = match;
    const result = cmp(version, target);
    if (op === '>=' && result < 0) return false;
    if (op === '>' && result <= 0) return false;
    if (op === '<=' && result > 0) return false;
    if (op === '<' && result >= 0) return false;
    if (op === '=' && result !== 0) return false;
  }
  return true;
}

export function validateSkill(skill, { version, skillNames }) {
  const errors = [];
  const where = `skills/${skill.dir}/SKILL.md`;

  if (skill.error) {
    errors.push(`${where}: ${skill.error}`);
    return errors;
  }

  const data = skill.data;
  if (data.__invalid) {
    errors.push(`${where}: unparseable frontmatter line "${data.__invalid[0]}"`);
  }

  for (const [key, kind] of Object.entries(FRONTMATTER_SCHEMA)) {
    const value = data[key];
    if (value === undefined) {
      errors.push(`${where}: missing frontmatter key "${key}"`);
      continue;
    }
    if (kind === 'list' && !Array.isArray(value)) {
      errors.push(`${where}: "${key}" must be an inline list, for example [a, b]`);
    }
    if (kind === 'string' && typeof value !== 'string') {
      errors.push(`${where}: "${key}" must be a scalar`);
    }
  }

  if (data.name !== skill.dir) {
    errors.push(`${where}: name "${data.name}" does not match directory "${skill.dir}"`);
  }
  if (typeof data.name === 'string' && !/^[a-z][a-z0-9-]*$/.test(data.name)) {
    errors.push(`${where}: name must be kebab-case`);
  }
  if (typeof data.description === 'string') {
    if (data.description.length > 400) {
      errors.push(`${where}: description is ${data.description.length} characters, cap is 400`);
    }
    if (!/\buse\b/i.test(data.description)) {
      errors.push(`${where}: description must say when to use the skill`);
    }
  }
  if (typeof data.foreveryone === 'string' && !satisfies(version, data.foreveryone)) {
    errors.push(`${where}: foreveryone range "${data.foreveryone}" excludes current ${version}`);
  }
  for (const required of data.requires ?? []) {
    if (!skillNames.has(required)) {
      errors.push(`${where}: requires unknown skill "${required}"`);
    }
  }
  for (const doc of data.docs ?? []) {
    const docPath = path.join(repoRoot, doc);
    if (!existsSync(docPath)) {
      errors.push(`${where}: docs entry "${doc}" does not exist at repo root`);
    }
  }
  if (!/^#\s+\S/m.test(skill.body)) {
    errors.push(`${where}: body needs an H1`);
  }
  for (const heading of ['## When to use', '## Rules', '## Do not', '## Canonical docs']) {
    if (!skill.body.includes(heading)) {
      errors.push(`${where}: body is missing the "${heading}" section`);
    }
  }

  return errors;
}
