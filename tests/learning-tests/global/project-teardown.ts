// import { test as teardown } from "@playwright/test";
// import { execSync } from "child_process";

// teardown("Project teardown", async ({}) => {
//   // To save Allure history between test runs
//   try {
//     console.log("Saving history...");

//     execSync(
//       'powershell.exe -Command "if (Test-Path allure-results/history) { Remove-Item -Recurse -Force allure-results/history }"',
//       { stdio: "inherit" }
//     );
//     execSync(
//       'powershell.exe -Command "if (Test-Path allure-report/history) { Copy-Item -Recurse -Force allure-report/history allure-results/history }"',
//       { stdio: "inherit" }
//     );
//   } catch (error) {
//     console.error("Failed to copy Allure history:", error);
//   }
// });

// // Note: This will not work on GitHub Actions, because each run is fresh
// // and there is no previous allure-report/history to copy from.
