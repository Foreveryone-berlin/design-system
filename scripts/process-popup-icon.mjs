#!/usr/bin/env node
import sharp from "../prototype/node_modules/sharp/lib/index.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = process.argv[2];
const dst = process.argv[3];

if (!src || !dst) {
  console.error("usage: node process-popup-icon.mjs <src> <dst>");
  process.exit(1);
}

const meta = await sharp(src).metadata();
console.log(`source: ${meta.width}x${meta.height} ${meta.format}`);

await sharp(src)
  .ensureAlpha()
  .trim({ background: { r: 255, g: 255, b: 255, alpha: 0 }, threshold: 10 })
  .resize({ width: 280, height: 280, fit: "inside", withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: false })
  .toFile(dst);

const out = await sharp(dst).metadata();
const stat = await import("node:fs/promises").then((m) => m.stat(dst));
console.log(`output: ${out.width}x${out.height} ${out.format} ${(stat.size / 1024).toFixed(1)} KB`);
console.log(`→ ${path.relative(path.resolve(__dirname, ".."), dst)}`);
