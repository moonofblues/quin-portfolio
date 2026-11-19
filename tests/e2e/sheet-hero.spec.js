import { test, expect } from "@playwright/test";

// The contact sheet hero, which is the hub's hero at / (ADR 0019).
test.describe("contact sheet hero", () => {
  test("shows numbered frames that link to real projects", async ({ page }) => {
    await page.goto("/");
    const frames = page.locator("a.sheet-frame");
    await expect(frames.first()).toBeAttached();
    expect(await frames.count()).toBeGreaterThanOrEqual(6);

    const hrefs = await frames.evaluateAll((els) => els.map((el) => el.getAttribute("href")));
    for (const href of hrefs) expect(href).toMatch(/^\/(work|visual)\/[a-z0-9-]+$/);

    await expect(page.locator(".sheet-no").first()).toHaveText("001");
  });

  test("mixes both portfolios, so neither leads", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("a.sheet-frame").first()).toBeAttached();
    const sides = await page.locator(".sheet-cell").evaluateAll((els) => els.map((el) => el.dataset.side));
    expect(sides).toContain("product");
    expect(sides).toContain("visual");
    // The first two frames come from different portfolios.
    expect(sides[0]).not.toBe(sides[1]);
  });

  test("the name does not block the frames under it", async ({ page }) => {
    await page.goto("/");
    const pointer = await page.locator(".sheet-text").evaluate((el) => getComputedStyle(el).pointerEvents);
    expect(pointer).toBe("none");
    const linkPointer = await page.locator("a.hub-pick--vis").evaluate((el) => getComputedStyle(el).pointerEvents);
    expect(linkPointer).toBe("auto");
  });

  test("hovering a frame pulls it forward and its title appears", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const frame = page.locator("a.sheet-frame").nth(5);
    await frame.scrollIntoViewIfNeeded();
    await frame.hover();
    await expect(frame.locator(".sheet-title")).toHaveCSS("opacity", "1");
    expect(await frame.evaluate((el) => getComputedStyle(el).transform)).not.toBe("none");
    // The lifted cell sits above the text layer.
    const z = await frame.locator("xpath=..").evaluate((el) => getComputedStyle(el).zIndex);
    expect(Number(z)).toBeGreaterThan(2);
  });

  test("a frame opens its project", async ({ page }) => {
    await page.goto("/");
    await page.locator("a.sheet-frame").first().click();
    await expect(page).toHaveURL(/\/(work|visual)\/[a-z0-9-]+$/);
  });

  test("the two doors in the statement still work", async ({ page }) => {
    await page.goto("/");
    await page.locator("a.hub-pick--vis").click();
    await expect(page).toHaveURL(/\/visual$/);
  });

  test("nothing spills sideways on a phone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.locator("a.sheet-frame").first()).toBeAttached();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("the old /sheet link redirects to the hub", async ({ page }) => {
    await page.goto("/sheet");
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("h1.hub-name")).toBeVisible();
    await expect(page.locator(".sheet-hero")).toHaveCount(1);
  });
});
