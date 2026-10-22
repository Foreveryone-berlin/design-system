#!/usr/bin/env node
/* Frontmatter + build artifacts + CLI dry-run checks for consumer skills. */

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  FRONTMATTER_SCHEMA,
  readSkills,
  repoRoot,
  validateSkill,
} from './lib/skills.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
let failures = 0;
let passed = 0;

function ok(name) {
  passed += 1;
  console.log(`  ok ${name}`);
}

function fail(name, detail) {
  failures += 1;
  console.error(`  FAIL ${name}\n      ${detail}`);
}

console.log('build-skills');

const pkg = JSON.parse(readFileSync(path.join(repoRoot, 'package.json'), 'utf8'));
const skills = readSkills();
const skillNames = new Set(skills.map((s) => s.data?.name).filter(Boolean));

for (const skill of skills) {
  if (skill.error) {
    fail(`${skill.dir} loads`, skill.error);
    continue;
  }
  ok(`${skill.dir} loads`);

  for (const key of Object.keys(FRONTMATTER_SCHEMA)) {
    if (skill.data[key] === undefined) fail(`${skill.dir} has ${key}`, 'missing');
    else ok(`${skill.dir} has ${key}`);
  }

  const errors = validateSkill(skill, { version: pkg.version, skillNames });
  if (errors.length) fail(`${skill.dir} validates`, errors.join('; '));
  else ok(`${skill.dir} validates`);
}

const tmpOut = path.join(repoRoot, '.tmp', 'skills-test-out');
const build = spawnSync(process.execPath, [path.join(here, 'build-skills.mjs'), '--out', tmpOut], {
  cwd: repoRoot,
  encoding: 'utf8',
});
if (build.status !== 0) {
  fail('skills:build --out', build.stderr || build.stdout || `exit ${build.status}`);
} else {
  ok('skills:build --out');
}

for (const file of ['index.json', 'AGENTS.foreveryone.md', 'tokens.json', 'fe-core/SKILL.md']) {
  const full = path.join(tmpOut, file);
  if (existsSync(full)) ok(`artifact ${file}`);
  else fail(`artifact ${file}`, 'missing');
}

const committed = [
  '.agents/skills/index.json',
  '.agents/skills/fe-core/SKILL.md',
  '.agents/skills/_shared/conventions.md',
  '.agents/skills/tokens.json',
  'dist/skills/index.json',
  'dist/skills/AGENTS.foreveryone.md',
  'dist/skills/tokens.json',
  'prototype/public/skills/index.json',
  'prototype/public/llms.txt',
];
for (const rel of committed) {
  if (existsSync(path.join(repoRoot, rel))) ok(`committed ${rel}`);
  else fail(`committed ${rel}`, 'missing — run npm run skills:build');
}

for (const skill of skills) {
  for (const file of skill.files) {
    const rel = path.join(skill.dir, file);
    const source = readFileSync(path.join(skill.path, file));
    const mirror = path.join(repoRoot, '.agents', 'skills', rel);
    if (existsSync(mirror) && source.equals(readFileSync(mirror))) ok(`Codex mirror ${rel}`);
    else fail(`Codex mirror ${rel}`, 'missing or stale; run npm run skills:build');
  }
}

const dryRun = spawnSync(
  process.execPath,
  [path.join(repoRoot, 'bin', 'fe-ds.mjs'), 'skills', 'install', '--dry-run', '--target', 'dir'],
  { cwd: repoRoot, encoding: 'utf8' }
);
if (dryRun.status !== 0) {
  fail('fe-ds skills install --dry-run', dryRun.stderr || dryRun.stdout || `exit ${dryRun.status}`);
} else {
  ok('fe-ds skills install --dry-run');
}

// Exercise discovery and instruction preservation in a project with no tool folders.
const consumer = mkdtempSync(path.join(repoRoot, '.tmp', 'codex-consumer-'));
const agentsFile = path.join(consumer, 'AGENTS.md');
const existingGuidance = '# Consumer project\n\nKeep existing instructions.\n';
writeFileSync(agentsFile, existingGuidance);
const cli = path.join(repoRoot, 'bin', 'fe-ds.mjs');
const install = () => spawnSync(process.execPath, [cli, 'skills', 'install'], {
  cwd: consumer, encoding: 'utf8',
});
const firstInstall = install();
if (firstInstall.status !== 0) fail('fresh Codex install', firstInstall.stderr);
else {
  const codexRoot = path.join(consumer, '.agents', 'skills');
  for (const skill of skills) {
    const rel = path.join(skill.dir, 'SKILL.md');
    if (readFileSync(path.join(codexRoot, rel), 'utf8') === skill.text) ok(`Codex discovery ${skill.dir}`);
    else fail(`Codex discovery ${skill.dir}`, 'source differs');
  }
  for (const rel of ['_shared/conventions.md', '_shared/tokens.json']) {
    if (existsSync(path.join(codexRoot, rel))) ok(`Codex dependency ${rel}`);
    else fail(`Codex dependency ${rel}`, 'missing');
  }
  const firstGuidance = readFileSync(agentsFile, 'utf8');
  const secondInstall = install();
  const secondGuidance = readFileSync(agentsFile, 'utf8');
  if (secondInstall.status === 0 && firstGuidance === secondGuidance &&
      secondGuidance.startsWith(existingGuidance) &&
      secondGuidance.split('<!-- foreveryone:skills:start -->').length === 2) {
    ok('repeat install preserves guidance and one managed block');
  } else fail('repeat install preserves guidance', secondInstall.stderr || 'guidance changed');
}

const dryConsumer = path.join(consumer, 'dry-run');
mkdirSync(dryConsumer);
const codexDryRun = spawnSync(process.execPath, [cli, 'skills', 'install', '--dry-run'], {
  cwd: dryConsumer, encoding: 'utf8',
});
if (codexDryRun.status === 0 && codexDryRun.stdout.includes('.agents/skills/fe-core') &&
    !existsSync(path.join(dryConsumer, '.agents')) && !existsSync(path.join(dryConsumer, 'AGENTS.md'))) {
  ok('default dry run previews Codex without writes');
} else fail('default dry run previews Codex without writes', codexDryRun.stderr || codexDryRun.stdout);

console.log(`\n${passed} passed, ${failures} failed`);
process.exit(failures ? 1 : 0);
