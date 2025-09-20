import AxeBuilder from "@axe-core/playwright";
import test from "@playwright/test";

test.skip("Accessibility test", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/login");

  const analyzer = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"]) // Optional
    .withRules("color-contrast") // Optional
    .analyze();
  console.log(analyzer.violations);
});
