#!/usr/bin/env node
/**
 * Lighten prototype photos in place from _originals/ backups.
 *
 * Usage:
 *   node scripts/normalize-workshop-tones.mjs
 *   node scripts/normalize-workshop-tones.mjs --dry-run
 */
import sharp from "../prototype/node_modules/sharp/dist/index.mjs";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const imagesDir = path.join(repoRoot, "prototype/public/images");
const originalsDir = path.join(imagesDir, "_originals");

const RECIPES = {
  "workshop-group.jpg": {
    note: "Balance and Wellness card; yoga/wellbeing photo from brand export",
    skip: false,
    build(src) {
      return sharp(src).modulate({ brightness: 1.05, saturation: 1.04 });
    },
    encode(pipeline) {
      return pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true });
    },
  },
  "workshop-pottery.jpg": {
    note: "First card in upcoming workshops; natural-tone lift for desktop contrast",
    skip: false,
    build(src) {
      return sharp(src)
        .gamma(1.16)
        .modulate({ brightness: 1.2, saturation: 1.06 });
    },
    encode(pipeline) {
      return pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true });
    },
  },
  "workshop-drawing.jpg": {
    note: "Outdoor shot; leave original bytes (skip)",
    skip: true,
  },
  "community-cafe.png": {
    note: "Home hero blob from Desktop community-cafe-home.png; tone-matched to workshop cards",
    source: "community-cafe-home.png",
    skip: false,
    build(src) {
      return sharp(src)
        .rotate()
        .gamma(1.14)
        .modulate({ brightness: 1.24, saturation: 1.06 });
    },
    encode(pipeline) {
      return pipeline.png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        palette: true,
        quality: 100,
        colors: 256,
        effort: 10,
      });
    },
  },
};

async function meanLuminance(input) {
  return (await sharp(input).stats()).channels[0].mean;
}

async function cardCropMean(input) {
  const buf = await sharp(input)
    .resize({ width: 360, height: 225, fit: "cover", position: "center" })
    .jpeg({ quality: 82 })
    .toBuffer();
  return meanLuminance(buf);
}

async function sourcePath(name) {
  const recipe = RECIPES[name];
  const originalName = recipe?.source ?? name;
  const original = path.join(originalsDir, originalName);
  try {
    await fs.access(original);
    return original;
  } catch {
    return path.join(imagesDir, name);
  }
}

async function encodeOutput(name, pipeline) {
  const recipe = RECIPES[name];
  const out = recipe.encode
    ? recipe.encode(pipeline)
    : pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true });
  return out.toBuffer();
}

async function processFile(name, { dryRun }) {
  const dst = path.join(imagesDir, name);
  const recipe = RECIPES[name];
  if (!recipe) throw new Error(`no recipe for ${name}`);

  const src = recipe.build?.length > 0 ? await sourcePath(name) : null;

  if (recipe.skip) {
    const check = src ?? dst;
    const mean = await meanLuminance(check);
    const card = check.endsWith(".jpg") ? await cardCropMean(check) : null;
    const cardNote = card != null ? ` card=${card.toFixed(1)}` : "";
    console.log(`${name}: skipped (${recipe.note}) mean=${mean.toFixed(1)}${cardNote}`);
    return { name, skipped: true };
  }

  const before = await meanLuminance(src);
  const pipeline = recipe.build(src);
  const buf = await encodeOutput(name, pipeline);
  const after = await meanLuminance(buf);
  const meta = await sharp(buf).metadata();

  if (dryRun) {
    console.log(
      `[dry-run] ${name} (${meta.width}x${meta.height}) mean ${before.toFixed(1)} → ${after.toFixed(1)} — ${recipe.note}`,
    );
    return { name, skipped: true };
  }

  const tmp = `${dst}.tmp-${process.pid}${path.extname(name)}`;
  await fs.writeFile(tmp, buf);
  await fs.rename(tmp, dst);
  const stat = await fs.stat(dst);
  console.log(
    `${name}: mean ${before.toFixed(1)} → ${after.toFixed(1)} (${(stat.size / 1024).toFixed(1)} KB) — ${recipe.note}`,
  );
  return { name, skipped: false };
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  for (const name of Object.keys(RECIPES)) {
    await processFile(name, { dryRun });
  }
  if (dryRun) console.log("\n(dry-run: no files written)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
