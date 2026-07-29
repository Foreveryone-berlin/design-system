#!/usr/bin/env node
/**
 * Capture before/after /patterns screenshots for workshop tone inspection.
 * Uses _originals/ for "before", current files for "after".
 *
 * Usage (dev server on BASE_URL):
 *   BASE_URL=http://localhost:3100 node scripts/screenshot-patterns-tones.mjs
 */
import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const imagesDir = path.join(repoRoot, "prototype/public/images");
const originalsDir = path.join(imagesDir, "_originals");
const outRoot = path.join(
  repoRoot,
  "prototype/test-results/screenshots/workshop-tones",
);

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3100";
const FILES = [
  "yoga-wellbeing.jpg",
  "workshop-pottery.jpg",
  "workshop-drawing.jpg",
];

const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1600", width: 1600, height: 900 },
];

async function capture(label) {
  const browser = await chromium.launch();
  try {
    for (const vp of viewports) {
      const dir = path.join(outRoot, label, vp.name);
      await fs.mkdir(dir, { recursive: true });
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      await page.goto(`${BASE_URL}/patterns`, {
        waitUntil: "domcontentloaded",
        timeout: 120_000,
      });
      await page.waitForSelector("#events", { timeout: 30_000 });
      await page.waitForTimeout(1200);

      const full = path.join(dir, "patterns-full.png");
      await page.screenshot({ path: full, fullPage: true });
      console.log(`saved ${full}`);

      const events = page.locator("#events");
      if (await events.count()) {
        const eventsShot = path.join(dir, "events-section.png");
        await events.screenshot({ path: eventsShot });
        console.log(`saved ${eventsShot}`);
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }
}

async function main() {
  await fs.mkdir(outRoot, { recursive: true });

  const processedBackup = path.join(imagesDir, "_processed-backup");
  await fs.mkdir(processedBackup, { recursive: true });
  for (const f of FILES) {
    await fs.copyFile(path.join(imagesDir, f), path.join(processedBackup, f));
  }

  try {
    for (const f of FILES) {
      await fs.copyFile(path.join(originalsDir, f), path.join(imagesDir, f));
    }
    console.log("\n=== BEFORE (originals) ===");
    await capture("before");

    for (const f of FILES) {
      await fs.copyFile(path.join(processedBackup, f), path.join(imagesDir, f));
    }
    console.log("\n=== AFTER (tone-normalized) ===");
    await capture("after");

    console.log(`\nInspection output: ${outRoot}`);
  } finally {
    for (const f of FILES) {
      await fs.copyFile(path.join(processedBackup, f), path.join(imagesDir, f));
    }
    await fs.rm(processedBackup, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
