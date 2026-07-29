import { test, expect, type ConsoleMessage } from "@playwright/test";

const routes = [
  "/",
  "/brand",
  "/logo",
  "/foundations",
  "/components",
  "/patterns",
  "/visual-elements",
  "/print",
  "/guidelines",
  "/accessibility",
  "/governance",
  "/credits",
] as const;

for (const route of routes) {
  test(`loads ${route} without console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg: ConsoleMessage) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err: Error) => errors.push(err.message));

    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), `HTTP status for ${route}`).toBeLessThan(400);

    await expect(page.locator("main").first()).toBeVisible();
    await expect(page.locator("footer").first()).toBeVisible();

    await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});

    expect(errors, `console errors on ${route}: ${errors.join(" | ")}`).toEqual([]);
  });
}

test("homepage hero image is reachable", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator('img[src*="community-cafe-home"]').first();
  await expect(hero).toBeVisible();
});
