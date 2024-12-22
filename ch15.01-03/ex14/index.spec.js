import { test, expect } from "@playwright/test";

test.describe("Product List", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15.01-03/ex14/index.html");
  });

  test("select category = all", async ({ page }) => {
    await page.selectOption("#category-select", "all");
    const products = await page.locator("#productList li");
    const productCount = await products.count();
    expect(productCount).toBe(3);
  });

  test("select category = food", async ({ page }) => {
    await page.selectOption("#category-select", "food");
    const visibleProducts = await page
      .locator("#productList li")
      .evaluateAll((items) =>
        items
          .filter((item) => item.style.display !== "none")
          .map((item) => item.textContent)
      );
    expect(visibleProducts).toEqual(["お菓子 - ¥1000"]);
  });

  test("select category = stationery", async ({ page }) => {
    await page.selectOption("#category-select", "stationery");
    const visibleProducts = await page
      .locator("#productList li")
      .evaluateAll((items) =>
        items
          .filter((item) => item.style.display !== "none")
          .map((item) => item.textContent.trim())
      );
    expect(visibleProducts).toEqual(["消しゴム - ¥200", "ものさし - ¥300"]);
  });
});
