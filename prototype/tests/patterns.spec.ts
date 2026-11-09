import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [1440, 390]) {
  test(`pattern catalogue at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/patterns");
    await page.locator("#main-content .ds-heading-anchor").first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    const patterns = page.locator("#evening-agenda");
    await expect(patterns).toHaveCount(1);
    const links = page.getByRole("navigation", { name: "Pattern categories" }).getByRole("link");
    await expect(links).toHaveCount(4);
    for (const link of await links.all()) await expect(page.locator((await link.getAttribute("href"))!)).toBeAttached();
    await expect(page.locator("#evening-agenda li")).toHaveCount(4);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator("#evening-agenda").screenshot({ path: `test-results/pattern-preview/${width}/evening-agenda.png` });
  });
}
