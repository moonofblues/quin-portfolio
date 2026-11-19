import { test, expect } from "@playwright/test";

// These read live content: the Planning & Procurement System case study must
// keep an annotated block with pins and a before/after block for them to pass.
const PAGE = "/work/zcmc-erp-system";

test.describe("case study media blocks", () => {
  test("pins are drawn, not just present in the page", async ({ page }) => {
    await page.goto(PAGE);
    const pin = page.locator('button[aria-label^="Marker"]').first();
    await expect(pin).toBeAttached();

    // A pin with no background or border is invisible on the image. The global
    // `button { background: none }` rule in index.css caused exactly that once.
    const look = await pin.evaluate((el) => {
      const style = getComputedStyle(el);
      return { bg: style.backgroundColor, border: style.borderTopWidth };
    });
    expect(look.bg).not.toBe("rgba(0, 0, 0, 0)");
    expect(look.border).toBe("2px");
  });

  test("hovering a pin highlights its legend line", async ({ page }) => {
    await page.goto(PAGE);
    const pin = page.locator('button[aria-label^="Marker 1"]').first();
    await pin.evaluate((el) => el.scrollIntoView({ block: "center" }));
    const legendLine = page.locator("li", { hasText: "Marker 1:" }).first();
    await expect(legendLine).not.toHaveClass(/text-text-primary/);

    await pin.hover();
    await expect(legendLine).toHaveClass(/text-text-primary/);
  });

  test("the before/after slider moves with the keyboard", async ({ page }) => {
    await page.goto(PAGE);
    const slider = page.getByLabel("Drag to compare before and after").first();
    await slider.evaluate((el) => el.scrollIntoView({ block: "center" }));
    const stage = slider.locator("xpath=..");
    await expect(stage).toHaveAttribute("style", /--pos: 50%/);

    await slider.focus();
    await slider.press("End");
    await expect(stage).toHaveAttribute("style", /--pos: 100%/);
    await slider.press("Home");
    await expect(stage).toHaveAttribute("style", /--pos: 0%/);
  });
});
