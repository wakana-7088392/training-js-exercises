import { test, expect } from "@playwright/test";

function gotoTestTarget(page) {
  return page.goto("/ch15.01-03/ex10/index.html");
}

function getDiv(page) {
  return page.getByTestId("editor-front");
}

function getInput(page) {
  return page.getByRole("textbox");
}

test.describe("div & input Site", () => {
  test("focus", async ({ page }) => {
    await gotoTestTarget(page);
    await getDiv(page).click();
    await expect(getInput(page)).toBeFocused();
  });

  test("change color", async ({ page }) => {
    await gotoTestTarget(page);
    // 初期値の確認時はrgba(0,0,0,0)になるためstyleを指定している
    await expect(getDiv(page)).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
    );
    await getDiv(page).click();
    await expect(getDiv(page)).toHaveCSS(
      "background-color",
      "rgb(192, 192, 192)"
    );
    await getInput(page).blur();
    await expect(getDiv(page)).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
    );
  });

  test("display texts", async ({ page }) => {
    await gotoTestTarget(page);
    await getInput(page).fill("Hello!");
    await expect(getDiv(page)).toHaveText("Hello!");
  });

  test("display sanitiezed texts", async ({ page }) => {
    await gotoTestTarget(page);
    await getInput(page).fill("<div>Hello!</div>");
    await expect(getDiv(page)).toHaveText("<div>Hello!</div>");
  });
});
