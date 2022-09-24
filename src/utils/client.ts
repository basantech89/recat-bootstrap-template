import { toCamelCaseKeys, toSnakeCaseKeys } from '.'

import { RequestInit } from '@mswjs/interceptors'

export const constructUrl = (url: string) => {
  if (process.env.REACT_APP_API_BASE) {
    return `${process.env.REACT_APP_API_BASE}/${url}`
  }
  return url
}

export const get = async <T>(url: string) => {
  try {
    const response = await fetch(constructUrl(url), {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    const row = await response.json()
    const { success, data, error } = toCamelCaseKeys(row)
    if (error) {
      return { success, error }
    }
    return { data, success }
  } catch (e) {
    return { success: false }
  }
}

export const post = async <k extends Record<string, any>>(url: string, uiData: k) => {
  try {
    const snakeCaseData = toSnakeCaseKeys(uiData)
    const response = await fetch(constructUrl(url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snakeCaseData),
      credentials: 'include'
    })
    const row = await response.json()
    const { success, data, error } = toCamelCaseKeys(row)
    if (error) {
      return { success, error }
    }
    return { data, success }
  } catch (e) {
    return { success: false, error: e }
  }
}

export const remove = async <k extends Record<string, any>>(url: string, uiData?: k) => {
  try {
    const snakeCaseData = uiData ? toSnakeCaseKeys(uiData) : null

    const response = await fetch(constructUrl(url), {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(snakeCaseData)
    })

    const row = await response.json()
    const { success, data, error } = toCamelCaseKeys(row)
    if (error) {
      return { success, error }
    }
    return { data, success }
  } catch (e) {
    return { success: false, error: e }
  }
}
