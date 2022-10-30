import todosReducer from './todosSlice'
import { usersApi } from './usersSlice'

import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    todos: todosReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersApi.middleware)
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
