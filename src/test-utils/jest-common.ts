import { Config } from '@jest/types'
import path from 'path'

const config: Config.InitialOptions = {
  rootDir: path.join(__dirname, '../'),
  moduleDirectories: ['node_modules', path.join(__dirname, '..'), __dirname],
  modulePathIgnorePatterns: ['dist'],
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-runner-eslint/watch-fix'
  ]
}

module.exports = config
