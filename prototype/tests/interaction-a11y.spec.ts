import { test, expect } from "@playwright/test";

test.describe("interactive accessibility", () => {
  test("popup opens, closes with Escape, and returns focus to trigger", async ({
    page,
  }) => {
    await page.goto("/components");
    const openBtn = page.getByRole("button", { name: "Open popup" });
    await openBtn.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(openBtn).toBeFocused();
  });

  test("FAQ accordion syncs aria-expanded with toggle", async ({ page }) => {
    await page.goto("/components");
    const trigger = page.locator("#faq-2-trigger");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("mobile nav opens and sets aria-expanded", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const toggle = page.locator(".ds-mobile-header .fe-header__menu-btn");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();

    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#ds-mobile-nav")).toBeVisible();
  });

  test("search combobox supports keyboard navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/foundations");
    const search = page.getByRole("combobox", {
      name: "Search the design system",
    });
    await search.fill("Colour ramps");
    await expect(search).toHaveAttribute("aria-expanded", "true");

    await search.press("ArrowDown");
    await search.press("Enter");

    await expect(page).toHaveURL(/\/foundations#colour-ramps/);
  });

  test("testimonial slider dots move the track and mark the current slide", async ({
    page,
  }) => {
    await page.goto("/components");
    const dots = page.locator("#testimonial-slider .fe-testimonial-slider__dot");
    await expect(dots).toHaveCount(5);
    await expect(dots.nth(0)).toHaveAttribute("aria-current", "true");

    await dots.nth(2).click();

    // Auto-retrying assertions absorb the snap settle without a fixed timeout.
    await expect(dots.nth(2)).toHaveAttribute("aria-current", "true");
    await expect(dots.nth(0)).toHaveAttribute("aria-current", "false");
  });

  test("testimonial slider scroll region is keyboard reachable and named", async ({
    page,
  }) => {
    await page.goto("/components");
    const viewport = page.locator(
      "#testimonial-slider .fe-testimonial-slider__viewport",
    );
    // Without tabindex="0" axe raises scrollable-region-focusable at serious
    // impact, which fails the CI a11y gate.
    await expect(viewport).toHaveAttribute("tabindex", "0");
    await expect(viewport).toHaveAttribute("aria-label", "Testimonials");

    await viewport.focus();
    await expect(viewport).toBeFocused();
  });

  test("sidebar navigation restores the previous page on browser back", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.goto("/patterns");
    await expect(page.locator("#main-content h1")).toHaveText("Patterns");

    await page
      .locator(".ds-on-this-page__link")
      .first()
      .click();
    await page
      .locator(".ds-sidebar__link--child", { hasText: "Components" })
      .click();
    await page.waitForURL("**/components");
    await expect(page.locator("#main-content h1")).toHaveText("Components");

    await page.goBack();
    await expect(page).toHaveURL(/\/patterns/);
    await expect(page.locator("#main-content h1")).toHaveText("Patterns");
  });
});
