#!/usr/bin/env node
/* Frontmatter + build artifacts + CLI dry-run checks for consumer skills. */

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
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

console.log(`\n${passed} passed, ${failures} failed`);
process.exit(failures ? 1 : 0);
