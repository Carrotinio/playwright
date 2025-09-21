import { APILogger } from "@common/helpers/api/api-logger-helper";
import { expect as baseExcpet } from "@playwright/test";

let apiLogger: APILogger;

export const setCustomExpectLogger = (logger: APILogger) => (apiLogger = logger);

declare global {
  namespace PlaywrightTest {
    interface Matchers<R, T> {
      shouldEqual(expected: T): R;
      shouldBeLessThanOrEqual(expected: T): R;
    }
  }
}

export const expect = baseExcpet.extend({
  shouldEqual(received: any, expected: any) {
    let pass: boolean;
    let logs: string = "";

    try {
      baseExcpet(received).toEqual(expected);
      pass = true;
      if (this.isNot) logs = apiLogger.getRecentLogs();
    } catch (e) {
      pass = false;
      logs = apiLogger.getRecentLogs();
    }

    const hint = this.isNot ? "not" : "";
    const message =
      this.utils.matcherHint("shouldEqual", undefined, undefined, {
        isNot: this.isNot,
      }) +
      "\n\n" +
      `Expected: ${hint} ${this.utils.printExpected(expected)}\n` +
      `Received: ${this.utils.printReceived(received)}\n\n` +
      `Recent API Activity: \n ${logs}`;

    return {
      message: () => message,
      pass,
    };
  },

  shouldBeLessThanOrEqual(received: any, expected: any) {
    let pass: boolean;
    let logs: string = "";

    try {
      baseExcpet(received).toBeLessThanOrEqual(expected);
      pass = true;
      if (this.isNot) logs = apiLogger.getRecentLogs();
    } catch (e) {
      pass = false;
      logs = apiLogger.getRecentLogs();
    }

    const hint = this.isNot ? "not" : "";
    const message =
      this.utils.matcherHint("shouldEqual", undefined, undefined, {
        isNot: this.isNot,
      }) +
      "\n\n" +
      `Expected: ${hint} ${this.utils.printExpected(expected)}\n` +
      `Received: ${this.utils.printReceived(received)}\n\n` +
      `Recent API Activity: \n ${logs}`;

    return {
      message: () => message,
      pass,
    };
  },
});
