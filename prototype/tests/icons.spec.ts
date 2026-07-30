import { test, expect } from "@playwright/test";

test("visual-elements catalog renders all icon families without double chips", async ({ page }) => {
  await page.goto("/visual-elements", { waitUntil: "networkidle" });

  // Category chips (5), activity chips (5), social chips (6)
  const catalogChips = page.locator(".ds-icon-chip");
  await expect(catalogChips).toHaveCount(16);

  // Each catalog chip should contain exactly one icon glyph, never a nested orange chip.
  for (let i = 0; i < 16; i++) {
    const chip = catalogChips.nth(i);
    await expect(chip.locator("> *")).toHaveCount(1);
    await expect(chip.locator(".fe-workshop-icon")).toHaveCount(0);
  }

  // UI glyphs and file glyphs are rendered as inline SVG or <img> and are visible.
  const iconItems = page.locator(".ds-icon-item");
  await expect(iconItems).toHaveCount(15);
  await expect(iconItems.first().locator("svg, img")).toBeVisible();
});

test("icon-only buttons keep accessible labels and render a single glyph", async ({ page }) => {
  await page.goto("/components", { waitUntil: "networkidle" });

  const iconButtons = page.locator(".fe-icon-btn, .fe-icon-btn--filled-brand");
  const count = await iconButtons.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const btn = iconButtons.nth(i);
    await expect(btn).toHaveAttribute("aria-label");
    await expect(btn.locator(".fe-icon-glyph, svg")).toHaveCount(1);
  }
});
