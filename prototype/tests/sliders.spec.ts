import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [1440, 1024, 768, 390]) {
  for (const specimen of [
    { route: "/components", section: "#testimonial-slider", item: "Testimonial", count: 5 },
    { route: "/patterns", section: "#facilitator-slider", item: "Facilitator page", count: width === 1440 ? 2 : width === 1024 ? 3 : 4 },
  ]) {
    test(`${specimen.item} slider navigation at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(specimen.route);
      await page.locator("#main-content .ds-heading-anchor").first().waitFor();
      await page.evaluate(() => document.fonts.ready);
      const section = page.locator(specimen.section);
      const viewport = section.locator(".fe-testimonial-slider__viewport");
      const dots = section.locator(".fe-testimonial-slider__dot");
      const next = section.getByRole("button", { name: `Next ${specimen.item.toLowerCase()}` });
      const previous = section.getByRole("button", { name: `Previous ${specimen.item.toLowerCase()}` });

      await expect(dots).toHaveCount(specimen.count);
      await expect(dots.first()).toHaveAttribute("aria-current", "true");
      await previous.click();
      await expect(dots.last()).toHaveAttribute("aria-current", "true");
      await next.click();
      await expect(dots.first()).toHaveAttribute("aria-current", "true");
      await next.focus();
      await page.keyboard.press("Enter");
      await expect(dots.nth(1)).toHaveAttribute("aria-current", "true");
      await dots.first().click();
      await expect(dots.first()).toHaveAttribute("aria-current", "true");
      await viewport.focus();
      await page.keyboard.press("ArrowRight");
      await expect.poll(() => viewport.evaluate((e) => e.scrollLeft)).toBeGreaterThan(0);
      await expect(next).toHaveAttribute("aria-controls", await viewport.getAttribute("id") as string);
      expect(await next.evaluate((e) => e.getBoundingClientRect().width)).toBeGreaterThanOrEqual(44);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(await viewport.evaluate((e) => getComputedStyle(e).scrollBehavior)).toBe("auto");

      const results = await new AxeBuilder({ page }).include(specimen.section).analyze();
      expect(results.violations).toEqual([]);
      await dots.first().click();
      await expect(dots.first()).toHaveAttribute("aria-current", "true");
      await page.evaluate(() => document.fonts.ready);
      await section.locator(".fe-testimonial-slider").screenshot({ path: `test-results/${specimen.item.toLowerCase().replaceAll(" ", "-")}-slider-${width}.png` });
    });
  }
}
