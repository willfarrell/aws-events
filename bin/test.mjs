#!/usr/bin/env node
// node test.js path/to/schema.*.json
import { readFileSync } from "node:fs";
import { dirname, basename, join } from "node:path";
import { describe } from "node:test";
import assert from "node:assert";

import jsonSchemaTest from "json-schema-test-esm";
import Ajv from "ajv/dist/2020.js";

const [schemaPath] = process.argv.slice(2);

const schemaDefs = JSON.parse(readFileSync("./$defs.json"));
const schema = JSON.parse(readFileSync(schemaPath));

const ajv = new Ajv({
  schemas: [schemaDefs, schema],
  strictTypes: false,
});

const name = basename(schemaPath);
jsonSchemaTest(ajv, {
  description: name,
  suites: {
    test: join(dirname(schemaPath), "./tests/", "test." + name),
  },
  cwd: import.meta.dirname,
  describe,
  assert,
});
