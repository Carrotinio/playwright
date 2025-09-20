import { Locator, Page } from "@playwright/test";

export class BasePage {
  readonly consentButton: Locator;

  constructor(protected page: Page) {
    this.consentButton = this.page.locator('[aria-label="Consent"]');
  }

  async acceptAllCookies() {
    if (await this.consentButton.isVisible()) await this.consentButton.click();
  }
}
