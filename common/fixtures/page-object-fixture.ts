import { test as base, expect } from "@playwright/test";
import { HomePage } from "@pages/HomePage";
import { LoginPage } from "@pages/LoginPage.js";

type Pages = {
  homePage: HomePage;
  loginPage: LoginPage;
};

export const test = base.extend<Pages>({
  loginPage: [
    async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await use(loginPage);
    },
    { title: "Creating login page instance" },
  ],
  homePage: [
    async ({ page }, use) => {
      const homePage = new HomePage(page);
      await use(homePage);
    },
    { title: "Creating homepage instance" },
    // { box: true }, // To hide fixture logs from the report
    // { auto: true }, // To simulate before . after each hook
  ],
});

export { expect };
