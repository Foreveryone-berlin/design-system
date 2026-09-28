/* Builds the committed agent-skill payload.
 *
 *   skills/**                 → dist/skills/**
 *   skills + _shared          → dist/skills/index.json
 *   _shared/conventions.md    → dist/skills/AGENTS.foreveryone.md
 *   spec/tokens.json          → dist/skills/tokens.json
 *   dist/skills/              → prototype/public/skills/
 *   llms.txt                  → prototype/public/llms.txt
 *
 * Run with: `npm run skills:build`, or `--out <dir>` to build somewhere else.
 */
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  readSkills,
  readShared,
  skillsRoot,
  sharedDirName,
  repoRoot,
  validateSkill,
} from './lib/skills.mjs';

const outFlag = process.argv.indexOf('--out');
const outDir =
  outFlag === -1
    ? path.join(repoRoot, 'dist', 'skills')
    : path.resolve(repoRoot, process.argv[outFlag + 1] ?? '');
const syncPublic = outFlag === -1 && !process.argv.includes('--no-sync');
const homepage = 'https://design.foreveryone.berlin';

function buildIndex(skills, shared, version) {
  return {
    name: 'foreveryone-design-system',
    version,
    docs: homepage,
    tokens: 'tokens.json',
    agentsBlock: 'AGENTS.foreveryone.md',
    shared: shared.map((s) => `${sharedDirName}/${s.file}`),
    skills: skills.map((skill) => ({
      name: skill.data.name,
      description: skill.data.description,
      path: `${skill.dir}/SKILL.md`,
      foreveryone: skill.data.foreveryone,
      requires: skill.data.requires,
      docs: skill.data.docs ?? [],
      files: skill.files,
    })),
  };
}

function buildAgentsBlock(shared, skills) {
  const conventions = shared.find((s) => s.file === 'conventions.md');
  if (!conventions) throw new Error('skills/_shared/conventions.md is required');

  const match = conventions.text.match(
    /<!--\s*agents:start\s*-->([\s\S]*?)<!--\s*agents:end\s*-->/
  );
  if (!match) throw new Error('conventions.md is missing its agents:start / agents:end markers');

  const lines = [match[1].trim(), '', '### Skills'];
  for (const skill of skills) {
    lines.push(`- \`${skill.data.name}\`: ${skill.data.description}`);
  }
  lines.push('', 'Local copies of these skills are in `fe-skills/`.');
  lines.push(
    `Published copies: <${homepage}/skills/index.json>. Refresh with \`node bin/fe-ds.mjs skills install\`.`
  );

  return `${lines.join('\n')}\n`;
}

const pkg = JSON.parse(await readFile(path.join(repoRoot, 'package.json'), 'utf8'));
const skills = readSkills();
const shared = readShared();

const missing = skills.filter((s) => s.error);
if (missing.length) {
  console.error(`[skills] ${missing.map((s) => `${s.dir}: ${s.error}`).join(', ')}`);
  process.exit(1);
}

const skillNames = new Set(skills.map((s) => s.data.name));
const errors = skills.flatMap((s) => validateSkill(s, { version: pkg.version, skillNames }));
if (errors.length) {
  for (const err of errors) console.error(`[skills] ${err}`);
  process.exit(1);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const skill of skills) {
  await cp(skill.path, path.join(outDir, skill.dir), { recursive: true });
}
await cp(path.join(skillsRoot, sharedDirName), path.join(outDir, sharedDirName), {
  recursive: true,
});

await cp(path.join(repoRoot, 'spec', 'tokens.json'), path.join(outDir, 'tokens.json'));

const index = buildIndex(skills, shared, pkg.version);
await writeFile(path.join(outDir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`, 'utf8');

await writeFile(
  path.join(outDir, 'AGENTS.foreveryone.md'),
  buildAgentsBlock(shared, skills),
  'utf8'
);

if (syncPublic) {
  const publicSkills = path.join(repoRoot, 'prototype', 'public', 'skills');
  await rm(publicSkills, { recursive: true, force: true });
  await mkdir(path.dirname(publicSkills), { recursive: true });
  await cp(outDir, publicSkills, { recursive: true });
  await cp(
    path.join(repoRoot, 'llms.txt'),
    path.join(repoRoot, 'prototype', 'public', 'llms.txt')
  );
}

console.log(
  `[skills] OK - ${skills.length} skills to ${path.relative(repoRoot, outDir)}${
    syncPublic ? ' (+ prototype/public sync)' : ''
  }`
);
