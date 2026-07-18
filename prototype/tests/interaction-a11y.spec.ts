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
});
