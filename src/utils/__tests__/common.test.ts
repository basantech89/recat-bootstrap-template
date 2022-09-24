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
