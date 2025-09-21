import { setCustomExpectLogger } from "@common/assertions/logger-assertions";
import { APILogger } from "@common/helpers/api/api-logger-helper";
import { RequestHandler } from "@common/helpers/api/request-helper";
import { test as base, expect } from "@playwright/test";
import { config } from "../../api-test.config";
import { createToken } from "@common/helpers/api/create-token-helper";

type ApiFixture = {
  api: RequestHandler;
  config: typeof config;
};

type WorkerFixture = {
  authToken: string;
};

export const test = base.extend<ApiFixture, WorkerFixture>({
  authToken: [
    async ({}, use) => {
      const authToken = await createToken(config.userEmail, config.userPassword);
      await use(authToken);
    },
    { scope: "worker" },
  ],
  api: async ({ request, authToken }, use) => {
    const baseUrl = config.apiUrl;
    const logger = new APILogger();
    setCustomExpectLogger(logger);
    const api = new RequestHandler(request, baseUrl, logger, authToken);
    await use(api);
  },
  config: async ({}, use) => {
    await use(config);
  },
});
export { expect };
