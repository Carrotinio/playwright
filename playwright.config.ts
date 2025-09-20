import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 30_000,
  snapshotPathTemplate: "./screenshots/{/projectName}/{testFilePath}/testFileName/{arg}{ext}",

  reporter: [["html", { open: "never" }], ["allure-playwright"]],

  expect: {
    timeout: 5_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.1 },
  },

  use: {
    baseURL: "https://www.automationexercise.com",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    trace: "on-first-retry",
    video: "on-first-retry",
    screenshot: "only-on-failure",
    testIdAttribute: "data-qa",
  },

  projects: [
    {
      name: "setup",
      testMatch: /project-setup\.ts/,
      teardown: "teardown",
    },
    {
      name: "teardown",
      testMatch: /project-teardown\.ts/,
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      dependencies: ["setup"],
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 13"], isMobile: true },
    },
  ],
});
