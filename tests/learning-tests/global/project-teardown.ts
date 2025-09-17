import { test as teardown } from "@playwright/test";

teardown("Project teardown", async ({}) => {
  console.log("Project teardown...");
});
