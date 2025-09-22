import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from "fs/promises";
import path from "path";
import { createSchema } from "genson-js";

const SCHEMA_BASE_PATH = "./common/schemas";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export async function validateSchema(
  dirName: string,
  fileName: string,
  responseBody: object,
  createSchemaFlag: boolean = false
) {
  const schemaPath = path.join(SCHEMA_BASE_PATH, dirName, `${fileName}-schema.json`);

  if (createSchemaFlag) await generateNewSchema(responseBody, schemaPath);

  const schema = await loadSchema(schemaPath);
  const validate = ajv.compile(schema);

  const valid = validate(responseBody);
  if (!valid) {
    // const error = new Error(
    throw new Error(
      `Schema validation '${fileName}-schema.json' failed: \n` +
        `${JSON.stringify(validate.errors, null, 4)}\n\n` +
        `Actual response body: \n` +
        `${JSON.stringify(responseBody, null, 4)}`
    );
    // Error.captureStackTrace(error, validateSchema);
    // throw error;
  }
}

async function loadSchema(schemaPath: string): Promise<object> {
  try {
    const schemaContent = await fs.readFile(schemaPath, "utf-8");
    return JSON.parse(schemaContent);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`Failed to load schema from ${schemaPath}: ${message}`);
  }
}

async function generateNewSchema(responseBody: object, schemaPath: string) {
  try {
    const generatedSchema = createSchema(responseBody);
    await fs.mkdir(path.dirname(schemaPath), { recursive: true });
    await fs.writeFile(schemaPath, JSON.stringify(generatedSchema, null, 4));
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`Failed to create schema file: ${message}`);
  }
}
