import { test as setup, expect } from "@playwright/test";

async function loginAndSave(
  page,
  email: string,
  password: string,
  jsonPath: string
) {
  const loginPage = new LoginPage(page);

  await loginPage.goto(loginPage.url);
  await loginPage.login(email, password);
  await expect(page).toHaveURL();

  await page.context().storageState({ path: jsonPath });
  await context.close();
}

setup("customer 1", async ({ page }) => {
  loginAndSave(
    page,
    USER_CREDENTIALS.firstCustomer.email,
    USER_CREDENTIALS.firstCustomer.password
  );
});

setup("proffessional 1", async ({ page }) => {
  loginAndSave(
    page,
    USER_CREDENTIALS.firstProffi.email,
    USER_CREDENTIALS.firstProffi.password
  );
});

setup("admin", async ({ page }) => {
  loginAndSave(
    page,
    USER_CREDENTIALS.admin.email,
    USER_CREDENTIALS.admin.password
  );
});
