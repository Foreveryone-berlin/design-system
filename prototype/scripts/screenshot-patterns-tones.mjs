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
// Served card image → its unprocessed source in _originals/.
const FILES = [
  { current: "card-wellbeing.jpg", original: "us-wellbeing.jpg" },
  { current: "card-pottery.jpg", original: "us-pottery.jpg" },
  { current: "card-drawing.jpg", original: "us-drawing.jpg" },
];
const EVENTS_SELECTOR = "#events-workshops-switcher";
let activeBrowser;
let interrupted = false;

function checkInterrupted() {
  if (interrupted) throw new Error("Capture interrupted");
}

const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1600", width: 1600, height: 900 },
];

async function capture(label) {
  checkInterrupted();
  const browser = await chromium.launch();
  activeBrowser = browser;
  try {
    for (const vp of viewports) {
      checkInterrupted();
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
      await page.waitForSelector(EVENTS_SELECTOR, { timeout: 30_000 });
      await page.waitForTimeout(1200);

      const full = path.join(dir, "patterns-full.png");
      await page.screenshot({ path: full, fullPage: true });
      console.log(`saved ${full}`);

      const events = page.locator(EVENTS_SELECTOR);
      if (await events.count()) {
        const eventsShot = path.join(dir, "events-section.png");
        await events.screenshot({ path: eventsShot });
        console.log(`saved ${eventsShot}`);
      }

      await context.close();
    }
  } finally {
    await browser.close();
    activeBrowser = undefined;
  }
}

async function main() {
  await fs.mkdir(outRoot, { recursive: true });

  const processedBackup = await fs.mkdtemp(path.join(imagesDir, "_processed-backup-"));
  for (const { current } of FILES) {
    await fs.copyFile(path.join(imagesDir, current), path.join(processedBackup, current));
  }

  const putBackProcessed = async () => {
    for (const { current } of FILES) {
      await fs.copyFile(path.join(processedBackup, current), path.join(imagesDir, current));
    }
  };
  // Ctrl+C must not leave the originals in place of the served images.
  const onSignal = () => {
    interrupted = true;
    process.exitCode = 130;
    void activeBrowser?.close().catch(() => {});
  };
  process.once("SIGINT", onSignal);
  process.once("SIGTERM", onSignal);

  try {
    for (const { current, original } of FILES) {
      checkInterrupted();
      await fs.copyFile(path.join(originalsDir, original), path.join(imagesDir, current));
    }
    console.log("\n=== BEFORE (originals) ===");
    await capture("before");

    await putBackProcessed();
    checkInterrupted();
    console.log("\n=== AFTER (tone-normalized) ===");
    await capture("after");

    console.log(`\nInspection output: ${outRoot}`);
  } finally {
    process.off("SIGINT", onSignal);
    process.off("SIGTERM", onSignal);
    await putBackProcessed();
    await fs.rm(processedBackup, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = interrupted ? 130 : 1;
});
