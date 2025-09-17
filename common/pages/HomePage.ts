import { BasePage } from "@common/base/BasePage";
import { Locator, Page } from "@playwright/test";

export class HomePage extends BasePage {
  readonly homePageCarousel: Locator;

  constructor(protected page: Page) {
    super(page);

    this.homePageCarousel = this.page.locator("#slider-carousel");
  }

  async open() {
    await this.page.goto("/");
  }
}
