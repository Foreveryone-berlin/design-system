import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/foundations",
  "/components",
  "/patterns",
  "/guidelines",
  "/accessibility",
  "/governance",
  "/credits",
] as const;

for (const route of routes) {
  test(`${route} has no serious WCAG 2.1 AA violations`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});

    // Exclude documentation specimens: the foundations colour-ramp swatches and
    // the components state-matrix render arbitrary sample colours/states on
    // purpose, so contrast rules do not apply to them.
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .exclude(".ds-ramp-step")
      .exclude(".ds-state-matrix")
      .exclude(".ds-state-grid")
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    const summary = blocking
      .map((v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s)`)
      .join(" | ");

    expect(blocking, `axe violations on ${route}: ${summary}`).toEqual([]);
  });
}
