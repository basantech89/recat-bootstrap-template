import { Config } from '@jest/types'
import path from 'path'

const config: Config.InitialOptions = {
  ...require('./jest-common'),
  displayName: 'client',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
    '!**/utils/__tests__/*.(ts|tsx)'
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': require.resolve('./style-mock.ts')
  },
  setupFilesAfterEnv: ['<rootDir>/test-utils/setupTests.ts'],
  coverageDirectory: path.join(__dirname, '../coverage/client')
}

module.exports = config
