import { get, post, remove } from './client'

export const getItem = (key: string) => localStorage.getItem(key)
export const setItem = (key: string, value: string) => localStorage.setItem(key, value)

export const removeItem = (key: string) => localStorage.removeItem(key)

export const logoutUser = async () => {
  removeItem('token')
}

export const authenticate = () => {
  const token = getItem('token')
  return !!token
}

export const registerForUserInactivitySession = () => {
  setInterval(() => {
    const lastUserActivityTimestamp = getItem('lastUserActivityTimestamp')
    const currentToken = getItem('token')

    if (lastUserActivityTimestamp && currentToken) {
      const timeSpentInMinutes = Math.ceil((Date.now() - +lastUserActivityTimestamp) / 60000)
      if (timeSpentInMinutes > 5) {
        removeItem('token')
        removeItem('lastLoginTimestamp')
        window.location.href = '/'
      }
    }
  }, 60000)
}

export const registerForUserActivityTracking = () => {
  const setUserActivityTimeStamp = () => {
    setItem('lastUserActivityTimestamp', `${Date.now()}`)
  }
  window.document.addEventListener('click', setUserActivityTimeStamp)
  window.document.addEventListener('keypress', setUserActivityTimeStamp)
}

interface Omit {
  <T extends Record<string, unknown>, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2]
  }
}

export const omit: Omit = (obj, ...props) => {
  const result = { ...obj }
  props.forEach(function (prop) {
    delete result[prop]
  })
  return result
}

export const isObject = function (obj: unknown) {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
}

interface CallBack<Params extends unknown[]> {
  (...args: Params): unknown
}

export const callAll =
  <Params extends unknown[]>(...fns: Array<CallBack<Params> | undefined>) =>
  (...args: Params) =>
    fns.forEach(fn => typeof fn === 'function' && fn(...args))

type CamelToSnake<T extends string> = string extends T
  ? string
  : T extends `${infer C0}${infer R}`
  ? `${C0 extends Lowercase<C0> ? '' : '_'}${Lowercase<C0>}${CamelToSnake<R>}`
  : ''

export type CamelKeysToSnake<T extends Record<string, any>> = {
  [K in keyof T as CamelToSnake<Extract<K, string>>]: T[K]
}

export const snakeCase = (str: string) =>
  str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)

export function toSnakeCaseKeys<T extends Record<string, any>>(o: T): CamelKeysToSnake<T>
export function toSnakeCaseKeys<T extends Record<string, any>[]>(o: T): CamelKeysToSnake<T>[]
export function toSnakeCaseKeys<T extends Record<string, any> | Record<string, any>[]>(
  o: T
): CamelKeysToSnake<T> | CamelKeysToSnake<T>[] {
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === 'object') {
        value = toSnakeCaseKeys(value)
      }
      return value as CamelKeysToSnake<T>
    })
  } else {
    const newO: Record<string, any> = {}

    let origKey, newKey, value
    for (origKey in o) {
      if (Object.prototype.hasOwnProperty.call(o, origKey)) {
        newKey = snakeCase(origKey)
        value = o[origKey]
        if (value instanceof Array || (!!value && value.constructor === Object)) {
          value = toSnakeCaseKeys(value)
        }
        newO[newKey] = value
      }
    }
    return newO as CamelKeysToSnake<T>
  }
}

type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S

export type SnakeKeysToCamel<T extends Record<string, any>> = {
  [K in keyof T as SnakeToCamelCase<Extract<K, string>>]: T[K]
}

export const camelCase = (str: string) =>
  str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())

export function toCamelCaseKeys<T extends Record<string, any>>(o: T): SnakeKeysToCamel<T>
export function toCamelCaseKeys<T extends Record<string, any>[]>(o: T): SnakeKeysToCamel<T>[]
export function toCamelCaseKeys<T extends Record<string, any> | Record<string, any>[]>(
  o: T
): SnakeKeysToCamel<T>[] | SnakeKeysToCamel<T> {
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === 'object') {
        value = toCamelCaseKeys(value)
      }
      return value as SnakeKeysToCamel<T>
    })
  } else {
    const newO: Record<string, any> = {}

    let origKey, newKey, value
    for (origKey in o) {
      if (Object.prototype.hasOwnProperty.call(o, origKey)) {
        newKey = camelCase(origKey)
        value = o[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toCamelCaseKeys(value)
        }
        newO[newKey] = value
      }
    }
    return newO as SnakeKeysToCamel<T>
  }
}

export { get, post, remove }
