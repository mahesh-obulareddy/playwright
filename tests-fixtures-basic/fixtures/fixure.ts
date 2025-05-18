import { test as base, type Page } from "@playwright/test";

export const test = base.extend<{
  page: Page;
}>({
  page: async ({ browser }, use) => {
    const page = await browser.newPage();
    await page.goto("/");
    await use(page);
    await page.close();
  },
});
