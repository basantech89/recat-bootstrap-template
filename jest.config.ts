import { Config } from '@jest/types'

const config: Config.InitialOptions = {
  ...require('./src/test-utils/jest-common.ts'),
  // collectCoverageFrom: ['**/*.{ts|tsx}'],
  coveragePathIgnorePatterns: ['./src/mocks/', './src/test-utils/'],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 36,
      functions: 40,
      lines: 55
    },
    './src/utils/': {
      statements: 45,
      branches: 35,
      functions: 25,
      lines: 50
    }
  },
  projects: ['<rootDir>/test-utils/jest.client.ts', '<rootDir>/test-utils/jest.utils.ts']
}

module.exports = config
