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
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js',
    '\\.(css|scss)$': require.resolve('./style-mock.ts')
  },
  setupFilesAfterEnv: ['<rootDir>/test-utils/setupTests.ts'],
  coverageDirectory: path.join(__dirname, '../coverage/client')
}

module.exports = config
