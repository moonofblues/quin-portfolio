import { test, expect } from "@playwright/test";

// One test per finding from the 2026-11-19 design review of the hub and the
// Product hero. Each guards a fix so it cannot quietly come back.

const overlaps = (a, b) =>
  a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;

for (const [label, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["phone", { width: 390, height: 844 }],
]) {
  test.describe(`/dev hero (${label})`, () => {
    test.use({ viewport });

    test("has no 'Portfolio in progress' pill", async ({ page }) => {
      await page.goto("/dev");
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page.getByText("Portfolio in progress")).toHaveCount(0);
    });

    test("the moon is dimmed so text on top of it stays readable", async ({ page }) => {
      await page.goto("/dev");
      const moon = page.locator('[class*="animate-moon-drift"]').first();
      await expect(moon).toBeAttached();
      const opacity = await moon.evaluate((el) => Number(getComputedStyle(el).opacity));
      // White text on the undimmed lavender moon is about 1.6:1. At 0.45 or
      // less the moon blends to roughly 6:1 against the same text.
      expect(opacity).toBeLessThanOrEqual(0.45);
    });

    test("the scroll arrow does not overlap the buttons", async ({ page }) => {
      await page.goto("/dev");
      await expect(page.locator("h1").first()).toBeVisible();
      await page.waitForTimeout(1000);
      const arrow = await page.locator(".animate-scroll-hint").boundingBox();
      for (const name of ["View My Work", "Get in Touch"]) {
        const button = await page.getByRole("link", { name }).first().boundingBox();
        expect(overlaps(arrow, button), `arrow overlaps "${name}"`).toBe(false);
      }
    });

    test("the headline comes before the focus pills", async ({ page }) => {
      await page.goto("/dev");
      const headline = await page.locator("h1").first().boundingBox();
      const pill = await page.getByRole("button", { name: "UI/UX Design" }).first().boundingBox();
      expect(headline.y).toBeLessThan(pill.y);
      await expect(page.getByText("Or browse by focus")).toBeVisible();
    });

    test("no decorative star sits on top of the headline", async ({ page }) => {
      await page.goto("/dev");
      await expect(page.locator("h1").first()).toBeVisible();
      await page.waitForTimeout(800);
      const headline = await page.locator("h1").first().boundingBox();
      const stars = page.locator("#home svg.animate-star-twinkle");
      for (let i = 0; i < (await stars.count()); i++) {
        const box = await stars.nth(i).boundingBox();
        // display: none gives no box, which is fine: nothing to overlap.
        if (box) expect(overlaps(box, headline), `star ${i} overlaps the headline`).toBe(false);
      }
    });

    test("a focus pill still opens that focus", async ({ page }) => {
      await page.goto("/dev");
      await page.getByRole("button", { name: "UI/UX Design" }).first().click();
      await expect(page).toHaveURL(/focus=ui-ux/);
      // The nav also carries a "Viewing" pill, so look inside the hero only.
      await expect(page.locator("#home").getByText("Viewing: UI/UX Design")).toBeVisible();
    });

    test("the subtitle has no em dash and no stock phrasing", async ({ page }) => {
      await page.goto("/dev");
      const text = await page.locator("main section").first().innerText();
      expect(text).not.toContain("—");
      expect(text).not.toContain("as functional as they are beautiful");
    });
  });
}

test.describe("hub hero", () => {
  test("the name fills the width on a wide screen", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const name = await page.locator("h1.hub-name").boundingBox();
    expect(name.width).toBeGreaterThan(700);
  });

  test("there is little dead space above the name on a phone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const name = await page.locator("h1.hub-name").boundingBox();
    expect(name.y).toBeLessThan(190);
  });

  test("both hub doors lead to their portfolio", async ({ page }) => {
    await page.goto("/");
    await page.locator("a.hub-pick--vis").click();
    await expect(page).toHaveURL(/\/visual$/);

    await page.goto("/");
    await page.locator("a.hub-pick--dev").click();
    await expect(page).toHaveURL(/\/dev$/);
  });

  test("the desk photo section stays hidden until its content exists", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1.hub-name")).toBeVisible();
    await expect(page.locator("#desk-h")).toHaveCount(0);
  });
});

test.describe("before/after slider", () => {
  test("the labels sit above the picture, not on it", async ({ page }) => {
    await page.goto("/work/zcmc-erp-system");
    const slider = page.getByLabel("Drag to compare before and after").first();
    await slider.evaluate((el) => el.scrollIntoView({ block: "center" }));
    const stage = await slider.locator("xpath=..").boundingBox();
    for (const text of ["Before", "After"]) {
      const label = await page.getByText(text, { exact: true }).first().boundingBox();
      expect(label.y + label.height, `${text} label should end above the picture`).toBeLessThanOrEqual(stage.y);
    }
  });
});
