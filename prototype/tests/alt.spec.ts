import { test, expect } from "@playwright/test";

test("homepage hero photo has meaningful alt text", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator('img[src*="community-cafe-home"]').first();
  await expect(hero).toBeVisible();
  const alt = await hero.getAttribute("alt");
  expect(alt?.trim().length).toBeGreaterThan(10);
});

test("homepage decorative underline is hidden from assistive tech", async ({
  page,
}) => {
  await page.goto("/");
  const underline = page.locator(".ds-headline-underline");
  await expect(underline).toHaveAttribute("aria-hidden", "true");
});

test("patterns workshop cards expose non-empty photo alt text", async ({
  page,
}) => {
  await page.goto("/patterns");
  const cards = page.locator("#events-workshops-switcher .fe-card__media img");
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const alt = await cards.nth(i).getAttribute("alt");
    expect(alt?.trim().length).toBeGreaterThan(10);
  }
});

test("logo page lockup images have non-empty alt text", async ({ page }) => {
  await page.goto("/logo");
  const logos = page.locator(".ds-section img");
  const count = await logos.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const alt = await logos.nth(i).getAttribute("alt");
    expect(alt?.trim().length).toBeGreaterThan(3);
  }
});
