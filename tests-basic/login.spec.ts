import { test, expect, type Page } from "@playwright/test";
import { userNameDropDownOnTopBar } from "../utils/selectors";

test.describe("Login Page", () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/");
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("login with valid credentials", async () => {
    await page.getByRole("textbox", { name: "Username" }).fill("Admin");
    await page.getByRole("textbox", { name: "Password" }).fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(
      page.locator(userNameDropDownOnTopBar)
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible();
  });

  test("login with invalid credentials", async () => {
    await page.getByRole("textbox", { name: "Username" }).fill("InvalidUser");
    await page
      .getByRole("textbox", { name: "Password" })
      .fill("InvalidPassword");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".oxd-alert-content")).toHaveText(
      "Invalid credentials"
    );
    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page.getByRole("alert")).toHaveText("Invalid credentials");
  });
});
