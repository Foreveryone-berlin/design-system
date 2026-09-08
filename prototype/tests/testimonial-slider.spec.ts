import { test, expect } from "@playwright/test";

const SECTION = "#testimonial-slider";
const VIEWPORT = `${SECTION} .fe-testimonial-slider__viewport`;
const SLIDE = `${SECTION} .fe-testimonial-slider__slide`;
const DOT = `${SECTION} .fe-testimonial-slider__dot`;

test("every slide has a dot", async ({ page }) => {
  await page.goto("/components", { waitUntil: "networkidle" });
  const slides = await page.locator(SLIDE).count();
  expect(slides).toBeGreaterThan(1);
  await expect(page.locator(DOT)).toHaveCount(slides);
});

test("the track keeps list semantics", async ({ page }) => {
  await page.goto("/components", { waitUntil: "networkidle" });

  // list-style: none strips list semantics in WebKit, which is why the markup
  // states role="list" explicitly. That role is what announces "3 of 5".
  const track = page.locator(`${SECTION} .fe-testimonial-slider__track`);
  await expect(track).toHaveAttribute("role", "list");
  await expect(page.locator(`${SECTION} [role="listitem"], ${SLIDE}`).first()).toBeVisible();
  expect(await page.locator(SLIDE).count()).toBe(
    await page.locator(`${SECTION} li`).count(),
  );
});

test("one slide fills the scroller at every width", async ({ page, isMobile }) => {
  test.skip(isMobile, "fixed device viewports cannot be resized");

  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/components", { waitUntil: "networkidle" });

    const box = await page.locator(VIEWPORT).boundingBox();
    const slide = await page.locator(SLIDE).first().boundingBox();
    expect(box).not.toBeNull();
    expect(slide).not.toBeNull();

    // flex-basis: 100% resolves against the scroller, so the slide matches the
    // viewport to within the card's 1px border on each side.
    expect(Math.abs(slide!.width - box!.width)).toBeLessThanOrEqual(2);
  }
});

test("native scrolling updates the active dot", async ({ page }) => {
  await page.goto("/components", { waitUntil: "networkidle" });

  // Drives the IntersectionObserver by scrolling the container rather than by
  // clicking a dot, so this covers swipe and keyboard scrolling too.
  //
  // Scroll to the slide's exact offset: the track has a gap, so clientWidth * n
  // lands short of the snap position and engines disagree on which slide that
  // resolves to. Forcing `auto` for the jump keeps the observer assertion from
  // racing a smooth-scroll animation across five engines.
  await page.locator(VIEWPORT).evaluate((el) => {
    const slide = el.querySelectorAll(".fe-testimonial-slider__slide")[2];
    el.style.scrollBehavior = "auto";
    el.scrollLeft +=
      slide.getBoundingClientRect().left - el.getBoundingClientRect().left;
  });

  await expect(page.locator(DOT).nth(2)).toHaveAttribute("aria-current", "true");
  await expect(page.locator(DOT).nth(0)).toHaveAttribute("aria-current", "false");
});

test("smooth scrolling is off under reduced motion", async ({ page }) => {
  // emulateMedia rather than a describe-level test.use({ reducedMotion }):
  // the fixture form does not reach the context here (matchMedia reports no
  // preference), so this asserts against emulation that is actually applied.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/components", { waitUntil: "networkidle" });

  expect(
    await page.evaluate(
      () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBe(true);

  // The dot handler assigns scrollLeft with no `behavior` argument, so this
  // computed value is the entire opt-out.
  const behavior = await page
    .locator(VIEWPORT)
    .evaluate((el) => getComputedStyle(el).scrollBehavior);
  expect(behavior).toBe("auto");
});
