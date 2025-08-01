import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', // Specifies that ts-jest should be used for TypeScript compilation
  testEnvironment: 'node', // Sets the test environment (e.g., 'node' for server-side, 'jsdom' for browser-like)
  roots: ['<rootDir>/src', '<rootDir>/src/contexts/shared/error'],
  testMatch: [
    '<rootDir>/src/**/*.test.ts', // Matches files ending with .test.ts in the src directory
    '<rootDir>/src/**/*.spec.ts', // Matches files ending with .spec.ts in the src directory
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Configures how .ts files are transformed using ts-jest
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Specifies the tsconfig.json file to use for TypeScript compilation
    },
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  }, // Defines the file extensions Jest should look for
  collectCoverage: true, // Enables coverage collection
  coverageDirectory: 'coverage', // Specifies the directory for coverage reports
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Defines the formats for coverage reports
};

export default config;
