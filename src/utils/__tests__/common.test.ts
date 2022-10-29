import { camelCase, isObject, snakeCase, toCamelCaseKeys, toSnakeCaseKeys } from '..'

import { describe, expect, test } from '@jest/globals'
import { regex } from 'constants/regex'

describe('REGEX', () => {
  test('International Characters', () => {
    const i18Regex = regex.i18nChars
    expect(i18Regex.test('AAA erferfr')).toStrictEqual(false)
    expect(i18Regex.test('lowercase')).toStrictEqual(true)
    expect(i18Regex.test('UPPERCASE')).toStrictEqual(true)
    expect(i18Regex.test('camelCase')).toStrictEqual(true)
    expect(i18Regex.test('snake_case')).toStrictEqual(true)
    expect(i18Regex.test('hyphen-test-utils')).toStrictEqual(true)
    expect(i18Regex.test('caseWith966')).toStrictEqual(true)
    expect(i18Regex.test('哈德良')).toStrictEqual(true)
    expect(i18Regex.test('кириллица')).toStrictEqual(true)
    expect(i18Regex.test('Ajúmmááwí')).toStrictEqual(true)
    expect(i18Regex.test('ɔbuleɔyʋɛ')).toStrictEqual(true)
    expect(i18Regex.test('бызшва')).toStrictEqual(true)
    expect(i18Regex.test('تونسي')).toStrictEqual(true)
    // expect(i18Regex.test-utils('हिन्दी')).toStrictEqual(true)
  })

  test('Password Regex', () => {
    const password = regex.password
    expect(password.test('1234')).toStrictEqual(false)
    expect(password.test('lower')).toStrictEqual(false)
    expect(password.test('UPPER')).toStrictEqual(false)
    expect(password.test('lowerUPPER')).toStrictEqual(false)
    expect(password.test('lowerUPPER1234')).toStrictEqual(false)
    expect(password.test('lowerUPPER#@1234')).toStrictEqual(true)
    expect(password.test('lL@1')).toStrictEqual(false)
    expect(
      password.test('lowerUPPER#@123467890lowerUPPER#@123467890lowerUPPER#@123467890')
    ).toStrictEqual(false)
  })
})

describe('utils', () => {
  test('isObject', () => {
    expect(isObject('a string')).toStrictEqual(false)
    expect(isObject(123)).toStrictEqual(false)
    expect(isObject([1, 2, 3])).toStrictEqual(false)
    expect(isObject(() => 123)).toStrictEqual(false)
    expect(isObject({ a: 1, b: 2 })).toStrictEqual(true)
  })

  test('toSnakeCaseKeys', () => {
    expect(snakeCase('snakeCase')).toStrictEqual('snake_case')
    expect(snakeCase('snakeCase Keys')).toStrictEqual('snake_case _keys')
    expect(snakeCase('snake case')).toStrictEqual('snake case')
    expect(snakeCase('snake_case')).toStrictEqual('snake_case')
    expect(
      toSnakeCaseKeys({ userDetails: { userName: { firstName: 'JohnJane', lastName: 'Smith' } } })
    ).toEqual({
      user_details: { user_name: { first_name: 'JohnJane', last_name: 'Smith' } }
    })
  })

  test('toCamelCaseKeys', () => {
    expect(camelCase('snake_case')).toStrictEqual('snakeCase')
    expect(camelCase('snake_case keys')).toStrictEqual('snakeCaseKeys')
    expect(camelCase('snake case')).toStrictEqual('snakeCase')
    expect(camelCase('snakeCase')).toStrictEqual('snakecase')
    expect(
      toCamelCaseKeys({
        user_details: { user_name: { first_name: 'JohnJane', last_name: 'Smith' } }
      })
    ).toEqual({
      userDetails: { userName: { firstName: 'JohnJane', lastName: 'Smith' } }
    })
  })
})
