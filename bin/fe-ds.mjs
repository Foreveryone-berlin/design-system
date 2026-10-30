#!/usr/bin/env node
/* ForEveryone design system command line.
 *
 * Copy the consumer agent skills into the current project. Zero dependencies,
 * no network, no postinstall hook.
 *
 *   node bin/fe-ds.mjs skills list
 *   node bin/fe-ds.mjs skills install [--target claude,cursor,codex,agents,dir] [--dir <path>]
 *   node bin/fe-ds.mjs skills path
 */
import { cp, mkdir, readFile, rm, writeFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(here, '..');
const skillsDir = path.join(packageRoot, 'dist', 'skills');

const START = '<!-- foreveryone:skills:start -->';
const END = '<!-- foreveryone:skills:end -->';
const LOCAL_DIR = 'fe-skills';

const TOOL_TARGETS = {
  claude: { parent: '.claude', label: '.claude/skills' },
  cursor: { parent: '.cursor', label: '.cursor/skills' },
  codex: { parent: '.agents', label: '.agents/skills' },
};

const KNOWN_TARGETS = [...Object.keys(TOOL_TARGETS), 'agents', 'dir'];

const USAGE = `fe-ds - agent skills for the ForEveryone Berlin design system

Usage
  node bin/fe-ds.mjs skills list
  node bin/fe-ds.mjs skills install [options]
  node bin/fe-ds.mjs skills path

Install options
  --target <list>   Comma separated: claude, cursor, codex, agents, dir.
                    Default: claude and codex. Pass cursor or agents to add
                    those layouts.
  --dir <path>      Where the "dir" and "agents" targets copy the skills.
                    Default: ./${LOCAL_DIR}
  --dry-run         Print what would be written and exit without writing.

Other
  --help, -h        This text
  --version, -v     Package version
`;

function parseArgs(argv) {
  const options = { targets: null, dir: null, dryRun: false };
  const positional = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--target') options.targets = (argv[++i] ?? '').split(',').filter(Boolean);
    else if (arg === '--dir') options.dir = argv[++i];
    else if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--version' || arg === '-v') options.version = true;
    else if (arg.startsWith('-')) options.unknown = arg;
    else positional.push(arg);
  }

  return { options, positional };
}

async function exists(target) {
  try {
    await access(target, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function readIndex() {
  try {
    return JSON.parse(await readFile(path.join(skillsDir, 'index.json'), 'utf8'));
  } catch {
    fail(
      `no skills found in ${skillsDir}.\nRun "npm run skills:build" in a clone of the design-system repo.`
    );
  }
}

function fail(message) {
  console.error(`fe-ds: ${message}`);
  process.exit(1);
}

function mergeAgentsBlock(existing, body) {
  const block = `${START}\n${body.trimEnd()}\n${END}\n`;
  if (!existing) return block;

  const start = existing.indexOf(START);
  const end = existing.indexOf(END);
  if (start !== -1 && end !== -1 && end > start) {
    return existing.slice(0, start) + block.trimEnd() + existing.slice(end + END.length);
  }

  const separator = existing.endsWith('\n') ? '\n' : '\n\n';
  return `${existing}${separator}${block}`;
}

async function writeFileIfNeeded(file, content, { dryRun }, written) {
  const current = (await exists(file)) ? await readFile(file, 'utf8') : null;
  if (current === content) {
    written.push(`unchanged ${path.relative(process.cwd(), file)}`);
    return;
  }
  written.push(
    `${current === null ? 'wrote    ' : 'updated  '} ${path.relative(process.cwd(), file)}`
  );
  if (dryRun) return;
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content, 'utf8');
}

async function copyTree(from, to, { dryRun }, written, label) {
  const source = path.resolve(from);
  const destination = path.resolve(to);
  const overlaps = (parent, child) => {
    const relative = path.relative(parent, child);
    return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
  };
  if (overlaps(source, destination) || overlaps(destination, source)) {
    fail(`install destination overlaps the packaged skills: ${destination}`);
  }
  await access(source, constants.R_OK);
  written.push(`${dryRun ? 'would copy' : 'copied   '} ${label}`);
  if (dryRun) return;
  await mkdir(path.dirname(to), { recursive: true });
  // Replace, not merge: files renamed or removed upstream must not linger.
  await rm(to, { recursive: true, force: true });
  await cp(from, to, { recursive: true, force: true });
}

async function installToolLayout(index, parentDir, label, options, written) {
  const root = path.join(parentDir, 'skills');
  for (const skill of index.skills) {
    await copyTree(
      path.join(skillsDir, skill.name),
      path.join(root, skill.name),
      options,
      written,
      `${label}/${skill.name}/`
    );
  }
  await copyTree(
    path.join(skillsDir, '_shared'),
    path.join(root, '_shared'),
    options,
    written,
    `${label}/_shared/`
  );
  await writeFileIfNeeded(
    path.join(root, '_shared', 'tokens.json'),
    await readFile(path.join(skillsDir, 'tokens.json'), 'utf8'),
    options,
    written
  );
}

async function listSkills() {
  const index = await readIndex();
  console.log(`foreveryone-design-system ${index.version} - ${index.skills.length} skills\n`);
  for (const skill of index.skills) {
    console.log(`  ${skill.name}`);
    console.log(`    ${skill.description}`);
    if (skill.requires?.length) console.log(`    requires: ${skill.requires.join(', ')}`);
  }
  console.log(`\nInstall with: node bin/fe-ds.mjs skills install`);
}

async function installSkills(options) {
  const index = await readIndex();
  const cwd = process.cwd();
  const localDir = path.resolve(cwd, options.dir ?? LOCAL_DIR);

  const targets = options.targets ?? ['claude', 'codex'];

  const unknown = targets.filter((t) => !KNOWN_TARGETS.includes(t));
  if (unknown.length) {
    fail(`unknown target "${unknown[0]}". Use ${KNOWN_TARGETS.join(', ')}.`);
  }

  const written = [];

  for (const name of Object.keys(TOOL_TARGETS)) {
    if (!targets.includes(name)) continue;
    const { parent, label } = TOOL_TARGETS[name];
    await installToolLayout(index, path.join(cwd, parent), label, options, written);
  }

  if (targets.includes('agents') || targets.includes('dir')) {
    for (const skill of index.skills) {
      await copyTree(
        path.join(skillsDir, skill.name),
        path.join(localDir, skill.name),
        options,
        written,
        `${path.relative(cwd, localDir)}/${skill.name}/`
      );
    }
    for (const file of ['_shared', 'tokens.json', 'index.json']) {
      await copyTree(
        path.join(skillsDir, file),
        path.join(localDir, file),
        options,
        written,
        `${path.relative(cwd, localDir)}/${file}`
      );
    }
  }

  if (targets.includes('agents')) {
    const agentsFile = path.join(cwd, 'AGENTS.md');
    const relDir = path.relative(cwd, localDir).split(path.sep).join('/') || '.';
    const body = (await readFile(path.join(skillsDir, index.agentsBlock), 'utf8')).replaceAll(
      `\`${LOCAL_DIR}/\``,
      `\`${relDir}/\``
    );
    const existing = (await exists(agentsFile)) ? await readFile(agentsFile, 'utf8') : null;
    await writeFileIfNeeded(
      agentsFile,
      mergeAgentsBlock(existing, body),
      options,
      written
    );
  }

  console.log(`foreveryone-design-system ${index.version} - targets: ${targets.join(', ')}`);
  for (const line of written) console.log(`  ${line}`);
  if (options.dryRun) console.log('\nDry run: nothing was written.');
}

async function main() {
  const { options, positional } = parseArgs(process.argv.slice(2));

  if (options.version) {
    const pkg = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'));
    console.log(pkg.version);
    return;
  }
  if (options.help || positional.length === 0) {
    console.log(USAGE);
    return;
  }
  if (options.unknown) {
    console.error(`fe-ds: unknown option "${options.unknown}"\n`);
    console.log(USAGE);
    process.exit(2);
  }

  const [group, command] = positional;
  if (group !== 'skills') {
    console.error(`fe-ds: unknown command "${group}"\n`);
    console.log(USAGE);
    process.exit(2);
  }

  if (command === 'list') return listSkills();
  if (command === 'install') return installSkills(options);
  if (command === 'path') {
    console.log(skillsDir);
    return;
  }

  console.error(`fe-ds: unknown subcommand "${command ?? ''}"\n`);
  console.log(USAGE);
  process.exit(2);
}

main().catch((error) => fail(error.message));
