/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

// Any custom config you want to pass to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testMatch: ['**/__tests__/**/*.test.tsx'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    '/__.*__/',
    'jest.config.js',
  ],
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['**/**/*.tsx?'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}

module.exports = createJestConfig(customJestConfig)
