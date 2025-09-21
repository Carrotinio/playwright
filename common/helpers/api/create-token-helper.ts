import { config } from "api-test.config";
import { RequestHandler } from "./request-helper";
import { APILogger } from "./api-logger-helper";
import { request } from "@playwright/test";

export async function createToken(email: string, password: string) {
  const context = await request.newContext();
  const logger = new APILogger();
  const api = new RequestHandler(context, config.apiUrl, logger);

  try {
    const tokenResponse = await api
      .path("/users/login")
      .body({
        user: {
          email: email,
          password: password,
        },
      })
      .postRequest(200);
    return "Token " + tokenResponse.user.token;
  } catch (error) {
    if (typeof error === "object" && error !== null) {
      Error.captureStackTrace(error as object, createToken);
    }
    throw error;
  } finally {
    await context.dispose();
  }
}
