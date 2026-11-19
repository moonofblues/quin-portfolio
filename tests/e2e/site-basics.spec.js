import { test, expect } from "@playwright/test";

test.describe("product site", () => {
  test("an unknown address shows the 404 page with a way back", async ({ page }) => {
    await page.goto("/dev/not-a-real-page");
    await expect(page.getByRole("heading", { name: "No page at this address" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to Work" })).toBeVisible();
  });

  // The global button reset once sat outside Tailwind's layers and erased every
  // bg-* and border-* class on <button> elements.
  test("buttons keep their Tailwind background", async ({ page }) => {
    await page.goto("/dev/not-a-real-page");
    const background = await page
      .getByRole("button", { name: "Back to Work" })
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(background).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("inspect mode reads the element under the pointer", async ({ page }) => {
    await page.goto("/dev");
    await page.getByRole("button", { name: "inspect" }).click();
    // The inspector downloads on first press; wait for it before moving the
    // pointer, or the move happens before its listeners exist.
    const readout = page.locator(".inspect-readout");
    await expect(readout).toBeVisible();
    await page.locator("main h1").first().hover();
    await expect(readout).toContainText("size");
    await expect(readout).toContainText("font");

    await page.keyboard.press("Escape");
    await expect(readout).toHaveCount(0);
  });
});
