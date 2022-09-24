import { Config } from '@jest/types'
import path from 'path'

const config: Config.InitialOptions = {
  ...require('./jest-common'),
  displayName: 'utils',
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/utils/__tests__/*.(ts|tsx)'],
  coverageDirectory: path.join(__dirname, '../coverage/utils')
}

module.exports = config
