import { test, expect } from "@playwright/test";

test.use({
  locale: "de-DE",
});

test.skip("Locale", async ({ page }) => {
  await page.goto("https://google.com");
  await page.locator("#L2AGLb").click();
  await page.locator(".gLFyf").fill("My current time and location");
  await page.locator(".FPdoLc .gNO89b").click();
  await page.waitForTimeout(10_000); // Just to check result in the debug mode of a test
  // Indeed german locale is used
});
