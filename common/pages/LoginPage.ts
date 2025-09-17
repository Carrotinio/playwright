import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(protected page: Page) {
    super(page);
    this.emailInput = this.page.getByTestId("login-email");
    this.passwordInput = this.page.getByTestId("login-password");
    this.submitButton = this.page.getByTestId("login-button");
  }

  async open() {
    await this.page.goto("/login");
  }

  async fillEmail(username: string) {
    await this.emailInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }
}
