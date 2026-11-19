import { test, expect } from "@playwright/test";

// The "edge" layer: marker blocks, tape, crop brackets and frame numbers. Each
// mark carries a fact, so the tests check the facts as well as the look.
const transparent = "rgba(0, 0, 0, 0)";

test.describe("contact sheet hub (/)", () => {
  test("only the picks are taped, and the tape is not dimmed", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("a.sheet-frame").first()).toBeAttached();
    const picks = await page.locator('.sheet-cell[data-pick="true"]').count();
    expect(await page.locator(".sheet-tape").count()).toBe(picks);
    if (picks > 0) {
      // The tape lives outside the dimmed frame link, so it stays at full strength.
      const opacity = await page.locator(".sheet-tape").first().evaluate((el) => Number(getComputedStyle(el).opacity));
      expect(opacity).toBe(1);
    }
  });

  test("the readout follows the frame under the pointer", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const frame = page.locator("a.sheet-frame").nth(3);
    await frame.scrollIntoViewIfNeeded();
    await expect(page.locator(".sheet-readout")).toContainText("hover one to pull it out");
    await frame.hover();
    await expect(page.locator(".sheet-readout")).toContainText("frame 004 /");
  });

  test("the two doors are highlighter blocks", async ({ page }) => {
    await page.goto("/");
    for (const door of ["a.hub-pick--dev", "a.hub-pick--vis"]) {
      const bg = await page.locator(door).evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(bg, door).not.toBe(transparent);
    }
  });

  test("the comma stays with its word", async ({ page }) => {
    await page.goto("/");
    const text = await page.locator(".sheet-nobreak").innerText();
    expect(text.trim().endsWith(",")).toBe(true);
  });

  test("has four crop brackets and numbered section headings", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".sheet-crop")).toHaveCount(4);
    // The browser reports a counter as its rule, not the number it draws, so
    // check the rules: the count starts at zero and each heading adds one.
    const rules = await page.locator(".hub-h2").first().evaluate((el) => ({
      start: getComputedStyle(el.closest("main")).counterReset,
      step: getComputedStyle(el, "::before").counterIncrement,
    }));
    expect(rules.start).toBe("frame 0");
    expect(rules.step).toBe("frame 1");
  });
});

test.describe("Product /dev hero", () => {
  test('"Actually Work" is a marker block', async ({ page }) => {
    await page.goto("/dev");
    const bg = await page.locator("h1 .marker").first().evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(bg).not.toBe(transparent);
  });

  test("has crop brackets and a name tape on each screenshot", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/dev");
    await expect(page.locator("#home .crop")).toHaveCount(4);
    const tapes = await page.locator("#home .tape").allInnerTexts();
    expect(tapes.map((t) => t.trim()).sort()).toEqual(["adzu portal", "erp dashboard", "zcmc website"]);
  });

  test("nothing spills sideways on a phone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/dev");
    await expect(page.locator("h1").first()).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe("Work page and case study", () => {
  test("project cards are numbered frames, picks taped", async ({ page }) => {
    await page.goto("/work");
    await expect(page.locator("article").first()).toBeVisible();
    await expect(page.locator(".frame-no").first()).toHaveText("001");
    const cards = await page.locator("article").count();
    const numbers = await page.locator(".frame-no").count();
    expect(numbers).toBe(cards);
  });

  test("the case study opening has crop brackets", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/work/zcmc-erp-system");
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("section .crop")).toHaveCount(4);
  });
});
