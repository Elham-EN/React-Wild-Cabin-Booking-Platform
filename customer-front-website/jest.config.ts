import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Setup files that will run before each test - updated file extension to .tsx
  setupFilesAfterEnv: ['<rootDir>/jest.setup.tsx'],
  // Test spec file matching pattern
  testMatch: ['**/__tests__/**/*.test.{js,jsx,ts,tsx}', '**/*.test.{js,jsx,ts,tsx}'],
  // Ignore certain paths
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/stories.bak/'],
  // Collect coverage from source files, not tests or configs
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.stories.{js,jsx,ts,tsx}',
    '!app/**/__stories__/**/*',
    '!app/**/__tests__/**/*',
    '!app/_*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  // Use babel-jest for transforming files with a Jest-specific babel config
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './jest-babel.config.js' }]
  },
  // Mock modules that cause issues
  moduleNameMapper: {
    // Mock next/font to avoid conflicts with Babel
    'next/font/(.*)': '<rootDir>/__mocks__/nextFontMock.js'
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);