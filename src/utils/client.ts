import { getItem, toCamelCaseKeys, toSnakeCaseKeys } from '.'

export const constructUrl = (url: string) => {
  if (process.env.REACT_APP_API_BASE) {
    return `${process.env.REACT_APP_API_BASE}/${url}`
  }
  return url
}

const getHeaders = (authenticate: boolean) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  }

  if (authenticate) {
    const token = getItem('token')
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  return headers
}

declare interface APICallOptions<D> {
  method: RequestInit['method']
  data?: D
  authenticate: boolean
}

export type Success<R> = {
  success: true
  data: R
}

export type Failed = {
  success: false
  data: string
}

async function apiCall<R, D = undefined>(
  url: string,
  options: APICallOptions<D>
): Promise<Success<R> | Failed> {
  try {
    const headers = getHeaders(options.authenticate)

    const fetchOptions: RequestInit = {
      method: options.method,
      headers
    }

    if (options.data) {
      const snakeCaseData = toSnakeCaseKeys(options.data)
      fetchOptions.body = JSON.stringify(snakeCaseData)
    }

    const response = await fetch(constructUrl(url), fetchOptions)
    const rawData = await response.json()
    const { success, data, error } = toCamelCaseKeys(rawData)

    if (error) {
      return { success: false, data: error }
    }

    return { success, data }
  } catch (e) {
    throw new Error(e as string)
  }
}

export const get = <R>(url: string, authenticate = true) =>
  apiCall<R>(url, { method: 'GET', authenticate })

export const post = <R, D>(url: string, data: D, authenticate = true) =>
  apiCall<R, D>(url, { method: 'POST', data, authenticate })

export const patch = <R, D>(url: string, data: D, authenticate = true) =>
  apiCall<R, D>(url, { method: 'PATCH', data, authenticate })

export const remove = <R>(url: string, authenticate = true) =>
  apiCall<R>(url, { method: 'DELETE', authenticate })
