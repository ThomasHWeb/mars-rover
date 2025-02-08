import type { Config } from "jest";
import { defaults } from "jest-config";

const environmentConfig: Config = {
  transform: {
    "^.+.ts?$": ["ts-jest", {}],
  },
  moduleNameMapper: {
    "^@domain/(.*)$": "<rootDir>/src/domain/$1",
    "^@infra/(.*)$": "<rootDir>/src/infrastructure/$1",
  },
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};

const config: Config = {
  ...defaults,
  clearMocks: true,
  roots: ["<rootDir>"],
  projects: [
    {
      ...environmentConfig,
      displayName: "domain-tests",
      testEnvironment: "node",
      testMatch: ["<rootDir>/tests/domain/**/*.test.ts"],
    },
    {
      ...environmentConfig,
      displayName: "node-tests",
      testEnvironment: "node",
      testMatch: ["<rootDir>/tests/infrastructure/node/**/*.test.ts"],
    },
  ],
};

export default config;
