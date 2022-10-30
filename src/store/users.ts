import { fetchUsers } from 'utils/api'
import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

export declare interface User {
  firstName: string
  lastName: string
  email: string
  userId: string
}

type Status = 'idle' | 'pending' | 'success' | 'failed'

export type UserState = {
  users: User[]
  status: Status
}

type Actions = {
  addUsers: () => void
}

const useUsers = create(
  immer<UserState & Actions>(set => ({
    users: [],
    status: 'idle',
    addUsers: async () => {
      set({ status: 'pending' })
      const { success, data } = await fetchUsers()
      if (success) {
        set({
          status: 'success',
          users: data
        })
      } else {
        set({ status: 'failed' })
      }
    }
  }))
)

export default useUsers
