import { Locator, Page } from "playwright";
import { expect } from "@playwright/test";

/**
 * Menu component available on every page
 */
export class MenuComponent {
  readonly page: Page;
  readonly docs: Locator;
  readonly menuButton: Locator;
  readonly guide: Locator;

  constructor(page: Page) {
    this.page = page;
    // locators form locators folder can be used
    this.menuButton = page.getByTestId("menuBurger");
    this.docs = page.getByRole("link", { name: "Docs" });
    this.guide = page.getByRole("button", { name: "Guides" });
  }

  /**
   * drop-down menu expand
   */
  async expandMenu() {
    await expect(this.menuButton).toBeVisible();
    await expect(this.menuButton).toHaveAttribute("aria-expanded", "false");
    await this.menuButton.click();
    await expect(this.menuButton).toHaveAttribute("aria-expanded", "true");
  }
}
