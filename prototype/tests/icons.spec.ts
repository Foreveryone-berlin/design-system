import { test, expect } from "@playwright/test";

test("visual-elements catalog renders all icon families without double chips", async ({ page }) => {
  await page.goto("/visual-elements", { waitUntil: "networkidle" });

  // Category chips (5) and activity chips (5). Social, UI, and accent catalogs use tables.
  const catalogChips = page.locator(".ds-icon-chip");
  await expect(catalogChips).toHaveCount(10);

  // Each catalog chip should contain exactly one icon glyph, never a nested orange chip.
  for (let i = 0; i < 10; i++) {
    const chip = catalogChips.nth(i);
    await expect(chip.locator("> *")).toHaveCount(1);
    await expect(chip.locator(".fe-workshop-icon")).toHaveCount(0);
  }

  await expect(page.getByRole("heading", { name: "Social icons" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "UI glyphs" })).toBeVisible();
  await expect(
    page.locator(".ds-glyph-table__mark svg, .ds-glyph-table__mark img").first(),
  ).toBeVisible();
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
