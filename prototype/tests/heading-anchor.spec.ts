import { test, expect } from "@playwright/test";

test("Link copied pill fully contains its label", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const anchor = page.locator("#mission-heading .ds-heading-anchor");
  await expect(anchor).toBeVisible();

  // Force feedback state so the assertion is CSS geometry only (no clipboard flakiness).
  await anchor.evaluate((el) => el.classList.add("is-copied"));

  const copied = anchor.locator(".ds-heading-anchor__copied");
  const label = copied.locator(".ds-heading-anchor__label");
  await expect(copied).toBeVisible();
  await expect(label).toHaveText("Link copied");

  const metrics = await copied.evaluate((el) => {
    const labelEl = el.querySelector(".ds-heading-anchor__label");
    if (!labelEl) throw new Error("missing .ds-heading-anchor__label");
    const pill = el.getBoundingClientRect();
    const text = labelEl.getBoundingClientRect();
    return {
      pillRight: pill.right,
      labelRight: text.right,
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    };
  });

  expect(
    metrics.labelRight,
    `label overflows pill (labelRight=${metrics.labelRight}, pillRight=${metrics.pillRight})`,
  ).toBeLessThanOrEqual(metrics.pillRight + 1);
  expect(
    metrics.scrollWidth,
    `copied mark scrolls horizontally (scroll=${metrics.scrollWidth}, client=${metrics.clientWidth})`,
  ).toBeLessThanOrEqual(metrics.clientWidth + 1);
});

test.describe("clipboard interaction", () => {
  test("clicking # shows Link copied feedback", async ({
    page,
    context,
    browserName,
  }) => {
    test.skip(
      browserName !== "chromium",
      "clipboard grant is reliable on Chromium only",
    );

    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const anchor = page.locator("#mission-heading .ds-heading-anchor");
    await expect(anchor).toBeVisible();
    await anchor.click();

    await expect(anchor).toHaveClass(/is-copied/);
    await expect(anchor.locator(".ds-heading-anchor__copied")).toBeVisible();
    await expect(anchor.locator(".ds-heading-anchor__label")).toHaveText(
      "Link copied",
    );
  });
});
