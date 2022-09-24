import { Config } from '@jest/types'
import path from 'path'

const config: Config.InitialOptions = {
  rootDir: path.join(__dirname, '..'),
  displayName: 'lint',
  runner: 'jest-runner-eslint',
  testMatch: ['<rootDir>/**/*.[jt]s?(x)']
}

module.exports = config
