import { atom } from 'recoil'

declare interface Toast {
  bg: string
  msg: string
}

const toastState = atom<Toast[]>({
  key: 'toasts', // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
})

export default toastState
