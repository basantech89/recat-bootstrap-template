import { Config } from '@jest/types'

const config: Config.InitialOptions = {
  ...require('./src/test-utils/jest-common.ts'),
  collectCoverageFrom: ['**/src/**/*.{ts|tsx}'],
  coverageThreshold: {
    global: {
      statements: 55,
      branches: 25,
      functions: 80,
      lines: 55
    },
    './src/utils/*.(ts|tsx)': {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  projects: [
    '<rootDir>/test-utils/jest.client.ts',
    '<rootDir>/test-utils/jest.utils.ts',
    '<rootDir>/test-utils/jest.lint.ts'
  ]
}

module.exports = config
