import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getItem, toCamelCaseKeys } from 'utils'

export declare interface User {
  firstName: string
  lastName: string
  email: string
  userId: string
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE,
    prepareHeaders: headers => {
      const token = getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  endpoints: builder => ({
    getUsers: builder.query<{ users: User[]; success: boolean }, null>({
      query: () => `users`,
      transformResponse: (response: { data: User[]; success: boolean }) =>
        toCamelCaseKeys({ users: response.data, ...response })
    })
  })
})

export const { useGetUsersQuery } = usersApi
