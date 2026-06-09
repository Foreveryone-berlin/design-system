// Screenshot key pages at 3 breakpoints for visual-regression baselines.
// Usage: OUT_DIR=baseline BASE_URL=http://localhost:3000 node scripts/screenshot.mjs
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const OUT_DIR = process.env.OUT_DIR ?? "baseline";
const outRoot = path.join("test-results", "screenshots", OUT_DIR);

const pages = [
  { name: "home", path: "/" },
  { name: "foundations", path: "/foundations" },
  { name: "components", path: "/components" },
  { name: "patterns", path: "/patterns" },
  { name: "guidelines", path: "/guidelines" },
  { name: "governance", path: "/governance" },
];

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch();
try {
  for (const vp of viewports) {
    const dir = path.join(outRoot, vp.name);
    await mkdir(dir, { recursive: true });
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    for (const p of pages) {
      const url = BASE_URL + p.path;
      await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
      await page.waitForTimeout(400);
      const file = path.join(dir, `${p.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`saved ${file}`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}
