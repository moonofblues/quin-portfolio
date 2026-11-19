import { test, expect } from "@playwright/test";

// Reads live content: this photo set needs a shot line on one photo and at
// least one frame under "Frames you didn't pick".
const SET = "/visual/fujifilm-nationwide-photo-walk-2026";

test.describe("photo set page", () => {
  test("shows the shot details line under a photo", async ({ page }) => {
    await page.goto(SET);
    await expect(page.locator(".vp-shot").first()).toContainText("X-S20");
  });

  test("shows the contact sheet with picks and rejects", async ({ page }) => {
    await page.goto(SET);
    const sheet = page.getByRole("region", { name: "Contact sheet" });
    await expect(sheet).toBeVisible();
    await expect(sheet.locator('li[data-picked="true"]').first()).toBeVisible();
    await expect(sheet.locator('li[data-picked="false"]').first()).toBeVisible();
  });

  // The Visual index lists work that has a thumbnail; a photo set without one
  // falls back to its first photo (see CARD_FIELDS in shared/sanity/queries.js).
  test("is listed on the Visual index", async ({ page }) => {
    await page.goto("/visual");
    await expect(page.locator('a.v-link[href="/visual/fujifilm-nationwide-photo-walk-2026"]').first()).toBeAttached();
  });
});
