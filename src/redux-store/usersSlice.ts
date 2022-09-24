import { SnakeKeysToCamel, toCamelCaseKeys } from '../utils'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export declare interface User {
  firstName: string
  lastName: string
  email: string
  userId: string
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE, credentials: 'include' }),
  endpoints: builder => ({
    getUsers: builder.query<{ users: User[]; success: boolean }, null>({
      query: () => `users`,
      transformResponse: (response: { data: User[]; success: boolean }) => {
        return {
          users: response.data.map(toCamelCaseKeys),
          success: response.success
        }
      }
    })
  })
})

export const { useGetUsersQuery } = usersApi
