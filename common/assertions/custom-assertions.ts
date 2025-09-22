import { expect as loggerExpect } from "@assertions/logger-assertions";
import { expect as schemaExpect } from "@assertions/schema-assertions";
import { mergeExpects } from "@playwright/test";

export const expect = mergeExpects(loggerExpect, schemaExpect);
