import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  ...defaults,
  clearMocks: true,
  roots: ["<rootDir>"],
  testEnvironment: "node",
  transform: {
    "^.+.ts?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@infra/(.*)$": "<rootDir>/src/infrastructure/$1",
  },
};

export default config;
