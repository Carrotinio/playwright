import { validateSchema } from "@common/helpers/api/schema-validator-helper";
import { expect as baseExcpet } from "@playwright/test";

declare global {
  namespace PlaywrightTest {
    interface Matchers<R, T> {
      shouldMatchSchema(dirName: string, fileName: string, createSchemaFlag?: boolean): Promise<R>;
    }
  }
}

export const expect = baseExcpet.extend({
  async shouldMatchSchema(
    received: any,
    dirName: string,
    fileName: string,
    createSchemaFlag: boolean = false
  ) {
    let pass: boolean;
    let message: string = "";

    try {
      await validateSchema(dirName, fileName, received, createSchemaFlag);
      pass = true;
      message = "Schema validation passed";
    } catch (e) {
      pass = false;
      message =
        typeof e === "object" && e !== null && "message" in e
          ? String((e as { message: unknown }).message)
          : String(e);
    }

    // const hint = this.isNot ? "not" : "";
    // const message =
    //   this.utils.matcherHint("shouldEqual", undefined, undefined, {
    //     isNot: this.isNot,
    //   }) +
    //   "\n\n" +
    //   `Expected: ${hint} ${this.utils.printExpected(expected)}\n` +
    //   `Received: ${this.utils.printReceived(received)}\n\n` +
    //   `Recent API Activity: \n ${logs}`;

    return {
      message: () => message,
      pass,
    };
  },
});
