#!/usr/bin/env node
import sharp from "../prototype/node_modules/sharp/lib/index.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = process.argv[2];
const dst = process.argv[3];

if (!src || !dst) {
  console.error("usage: node process-readme-hero.mjs <src> <dst>");
  process.exit(1);
}

const meta = await sharp(src).metadata();
console.log(`source: ${meta.width}x${meta.height} ${meta.format}`);

await sharp(src)
  .rotate()
  .resize({
    width: 1500,
    height: 720,
    fit: "cover",
    position: "center",
    withoutEnlargement: true,
  })
  .jpeg({ quality: 82, mozjpeg: true, progressive: true })
  .toFile(dst);

const out = await sharp(dst).metadata();
const stat = await import("node:fs/promises").then((m) => m.stat(dst));
console.log(`output: ${out.width}x${out.height} ${out.format} ${(stat.size / 1024).toFixed(1)} KB`);
console.log(`-> ${path.relative(path.resolve(__dirname, ".."), dst)}`);
