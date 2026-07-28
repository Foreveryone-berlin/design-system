#!/usr/bin/env node
import sharp from "../prototype/node_modules/sharp/dist/index.mjs";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const positional = [];
  let width = 1440;
  let height = 900;
  let quality = 82;
  let format = "jpeg";

  for (const arg of argv) {
    if (arg.startsWith("--width=")) width = Number(arg.slice(8));
    else if (arg.startsWith("--height=")) height = Number(arg.slice(9));
    else if (arg.startsWith("--quality=")) quality = Number(arg.slice(10));
    else if (arg.startsWith("--format=")) format = arg.slice(9);
    else positional.push(arg);
  }

  return { positional, width, height, quality, format };
}

const { positional, width, height, quality, format } = parseArgs(
  process.argv.slice(2),
);

const src = positional[0];
const dst = positional[1];

if (!src || !dst) {
  console.error(
    "usage: node process-workshop-image.mjs [--width=W] [--height=H] [--quality=Q] [--format=jpeg|png] <src> <dst>",
  );
  process.exit(1);
}

const meta = await sharp(src).metadata();
console.log(`source: ${meta.width}x${meta.height} ${meta.format}`);

let pipeline = sharp(src).rotate().resize({
  width,
  height,
  fit: "cover",
  position: "center",
  withoutEnlargement: true,
});

if (format === "png") {
  pipeline = pipeline.png({ compressionLevel: 9 });
} else {
  pipeline = pipeline.jpeg({ quality, mozjpeg: true, progressive: true });
}

await pipeline.toFile(dst);

const out = await sharp(dst).metadata();
const stat = await fs.stat(dst);
console.log(
  `output: ${out.width}x${out.height} ${out.format} ${(stat.size / 1024).toFixed(1)} KB`,
);
console.log(`→ ${path.relative(repoRoot, dst)}`);
