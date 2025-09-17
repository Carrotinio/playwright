import { test } from "../../common/fixtures/page-object-fixture";

test.only("Custom fixture test", async ({ loginPage, page }) => {
  await loginPage.open();
  await page.locator("[aria-label='Consent']").click();
  await loginPage.fillEmail("user@example.com");
  await loginPage.fillPassword("password");
  await loginPage.submit();
});
