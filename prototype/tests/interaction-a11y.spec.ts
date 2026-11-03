import { test, expect, type Page } from "@playwright/test";

async function openPage(page: Page, path: string) {
  await page.goto(path);
  await page.locator("#main-content .ds-heading-anchor").first().waitFor({ state: "attached" });
}

test.describe("interactive accessibility", () => {
  test("popup opens, closes with Escape, and returns focus to trigger", async ({
    page,
  }) => {
    await openPage(page, "/components");
    const openBtn = page.getByRole("button", { name: "Open popup" });
    await openBtn.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    // aria-modal alone proves nothing; :modal is true only after showModal().
    expect(await dialog.evaluate((el) => el.matches(":modal"))).toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(openBtn).toBeFocused();
  });

  test("FAQ accordion syncs aria-expanded with toggle", async ({ page }) => {
    await openPage(page, "/components");
    const trigger = page.locator("#faq-2-trigger");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("popup content scrolls within a short viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 320 });
    await openPage(page, "/components");
    await page.getByRole("button", { name: "Open popup", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toHaveCSS("overflow-y", "auto");
    const email = dialog.getByRole("textbox", { name: "Email Address" });
    await email.fill("reader@example.com");
    await dialog.getByRole("button", { name: "Subscribe", exact: true }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("button", { name: "Open popup", exact: true })).toBeFocused();
  });

  test("mobile nav opens and sets aria-expanded", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openPage(page, "/");

    const toggle = page.locator(".ds-mobile-header .fe-header__menu-btn");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();

    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#ds-mobile-nav")).toBeVisible();
  });

  test("on-this-page disclosure works below the rail breakpoint", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openPage(page, "/patterns");

    const compact = page.locator(".ds-on-this-page--compact");
    await expect(compact).toBeVisible();
    await expect(page.locator(".ds-on-this-page--rail")).toBeHidden();

    await compact.locator("summary").click();
    await expect(compact).toHaveAttribute("open", "");
    await compact.locator(".ds-on-this-page__link").first().click();
    await expect(page).toHaveURL(/\/patterns#/);
    await expect(compact).not.toHaveAttribute("open");
  });

  test("mobile navigation wraps keyboard focus and restores it on Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openPage(page, "/");
    const toggle = page.locator(".ds-mobile-header .fe-header__menu-btn");
    await toggle.click();
    const nav = page.locator("#ds-mobile-nav");
    await expect(nav.getByRole("combobox")).toBeFocused();

    await toggle.focus();
    await page.keyboard.press("Shift+Tab");
    const lastGroup = nav.locator("summary").last();
    await expect(lastGroup).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(toggle).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(nav).toHaveCount(0);
    await expect(toggle).toBeFocused();
    await expect(page.locator(".ds-layout")).not.toHaveAttribute("inert");
  });

  test("mobile search dismisses before its surrounding navigation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openPage(page, "/");
    const toggle = page.locator(".ds-mobile-header .fe-header__menu-btn");
    await toggle.click();
    const nav = page.locator("#ds-mobile-nav");
    const search = nav.getByRole("combobox");
    await search.fill("Colour ramps");
    await expect(search).toHaveAttribute("aria-expanded", "true");
    const listId = await search.getAttribute("aria-controls");
    await expect(nav.getByRole("listbox")).toHaveAttribute("id", listId!);

    await search.press("Escape");
    await expect(search).toHaveValue("");
    await expect(search).not.toHaveAttribute("aria-controls");
    await expect(search).toBeFocused();
    await expect(nav).toBeVisible();

    await search.press("Escape");
    await expect(nav).toHaveCount(0);
    await expect(toggle).toBeFocused();
  });

  test("desktop submenu Escape returns focus to its disclosure", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await openPage(page, "/patterns");
    const trigger = page.locator('.fe-header__nav button[aria-controls="fe-header-dropdown-link-2"]');
    await expect(trigger).toBeVisible();
    await trigger.click();
    const dropdown = page.locator("#fe-header-dropdown-link-2");
    await dropdown.getByRole("link").first().focus();
    await page.keyboard.press("Escape");
    await expect(dropdown).toHaveCount(0);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test("header demo contains mobile focus and restores it after navigation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openPage(page, "/patterns");
    const header = page.locator(".fe-header");
    const toggle = header.locator(".fe-header__menu-btn");
    const nav = page.locator("#fe-header-mobile-nav");
    await toggle.click();
    await expect(nav.getByRole("link").first()).toBeFocused();

    await nav.getByRole("link").last().focus();
    await page.keyboard.press("Tab");
    await expect(toggle).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(nav.getByRole("link").last()).toBeFocused();

    await nav.getByRole("link").first().click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
    await expect(nav).toHaveAttribute("inert");
  });

  test("header demo clears mobile state across the desktop breakpoint", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openPage(page, "/patterns");
    const toggle = page.locator(".fe-header .fe-header__menu-btn");
    await toggle.click();
    const submenu = page.locator('#fe-header-mobile-nav button[aria-controls="fe-header-dropdown-link-2-mobile"]');
    await submenu.click();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator("#fe-header-mobile-nav")).toHaveAttribute("inert");
    await toggle.click();
    await expect(submenu).toHaveAttribute("aria-expanded", "false");
  });

  test("desktop header dropdown closes after selection or focus leaves navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await openPage(page, "/patterns");
    const trigger = page.locator('.fe-header__nav button[aria-controls="fe-header-dropdown-link-2"]');
    const dropdown = page.locator("#fe-header-dropdown-link-2");
    await trigger.click();
    await dropdown.getByRole("link").first().click();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.click();
    await page.locator(".fe-header__cta").focus();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("home content remains visible without entrance motion when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openPage(page, "/");
    const hero = page.locator(".ds-home-hero");
    await expect(hero).toBeVisible();
    await expect(hero).toHaveCSS("animation-name", "none");
    await expect(hero.locator(".ds-headline-with-underline")).toHaveCSS("animation-name", "none");
    await expect(hero.locator("h1")).toBeVisible();
    await expect(hero.locator("h1")).toHaveCSS("animation-name", "none");
    await expect(hero.locator(".ds-headline-underline")).toHaveCSS("animation-name", "none");
  });

  test("home entrance motion does not finish the page transition", async ({ page, browserName }) => {
    test.skip(browserName === "firefox", "Firefox does not use page transitions");
    await page.setViewportSize({ width: 1440, height: 900 });
    await openPage(page, "/foundations");
    await page.evaluate(() => {
      document.documentElement.style.setProperty("--transition-slow", "60s ease");
    });
    await page.locator(".ds-sidebar").getByRole("link", { name: "Overview", exact: true }).click();
    const main = page.locator("#main-content");
    await expect(main).toHaveClass(/vt-fade-in/);
    await page.locator(".ds-headline-with-underline").evaluate((element) => {
      element.dispatchEvent(new AnimationEvent("animationend", {
        bubbles: true,
        animationName: "ds-home-enter",
      }));
    });
    await expect(main).toHaveClass(/vt-fade-in/);
    await main.evaluate((element) => {
      element.dispatchEvent(new AnimationEvent("animationend", {
        bubbles: true,
        animationName: "vt-fade-in",
      }));
    });
    await expect(main).not.toHaveClass(/vt-fade-in/);
  });

  test("search combobox supports keyboard navigation", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await openPage(page, "/foundations");
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
    await openPage(page, "/components");
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
    await openPage(page, "/components");
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
    await openPage(page, "/patterns");
    await expect(page.locator("#main-content h1")).toHaveText("Patterns");

    await page
      .locator(".ds-on-this-page--rail .ds-on-this-page__link")
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
