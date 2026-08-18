import { test, expect } from "@playwright/test";

test("team roster renders every person with a resolved portrait", async ({
  page,
}) => {
  await page.goto("/patterns", { waitUntil: "networkidle" });

  const people = page.locator("#team-grid .fe-person");
  await expect(people).toHaveCount(8);

  for (let i = 0; i < 8; i++) {
    const person = people.nth(i);
    await expect(person.locator(".fe-person__name")).not.toBeEmpty();
    await expect(person.locator(".fe-person__role")).not.toBeEmpty();

    // A missing or broken avatar file still renders an <img>, so assert the
    // asset actually decoded rather than that the element exists.
    const img = person.locator(".fe-person__photo img");
    await expect(img).toBeVisible();
    expect(await img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  }
});

test("portraits are decorative because the name sits beside them", async ({
  page,
}) => {
  await page.goto("/patterns");
  const alts = await page
    .locator("#team-grid .fe-person__photo img, #profile-cards .fe-person__photo img")
    .evaluateAll((imgs) => imgs.map((el) => (el as HTMLImageElement).alt));

  expect(alts.length).toBeGreaterThan(0);
  expect(alts.every((alt) => alt === "")).toBe(true);
});

test("bio copy belongs to the card variant only", async ({ page }) => {
  await page.goto("/patterns");

  await expect(page.locator("#team-grid .fe-person__bio")).toHaveCount(0);

  const cards = page.locator("#profile-cards .fe-person--card");
  await expect(cards).toHaveCount(2);
  for (let i = 0; i < 2; i++) {
    await expect(cards.nth(i).locator(".fe-person__bio")).not.toBeEmpty();
  }
});

// The mobile projects pin their own viewport, so the reflow assertions run on
// the desktop projects where setViewportSize is meaningful.
test.describe("responsive columns", () => {
  test.skip(
    ({ isMobile }) => !!isMobile,
    "device projects cannot change viewport size",
  );

  const trackCount = (selector: string) => async (page: import("@playwright/test").Page) =>
    (await page
      .locator(selector)
      .evaluate((el) => getComputedStyle(el).gridTemplateColumns))
      .split(" ")
      .filter(Boolean).length;

  const rosterTracks = trackCount("#team-grid .fe-people-grid");
  const cardTracks = trackCount("#profile-cards .fe-people-grid--cards");

  for (const [name, width, roster, cards] of [
    ["mobile", 390, 1, 1],
    ["tablet", 768, 2, 2],
    ["desktop", 1440, 4, 2],
  ] as const) {
    test(`${name} lays out ${roster} roster and ${cards} card column(s)`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/patterns", { waitUntil: "networkidle" });

      expect(await rosterTracks(page)).toBe(roster);
      expect(await cardTracks(page)).toBe(cards);
    });
  }
});
