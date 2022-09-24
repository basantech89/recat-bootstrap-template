import './styles.scss'

import toastState from '../../atoms/toasts'

import React from 'react'
import { Toast as RBToast, ToastContainer } from 'react-bootstrap'
import { useRecoilState } from 'recoil'

const Toast = () => {
  const [toasts, setToasts] = useRecoilState(toastState)

  const shiftToast = () => {
    const dup = [...toasts]
    dup.shift()
    setToasts(dup)
  }

  return (
    <ToastContainer position="bottom-end" className="rb-toast">
      {toasts.map((toast, idx) => (
        <RBToast key={idx} bg={toast?.bg} onClose={shiftToast} delay={1500} autohide>
          <RBToast.Body>{toast?.msg}</RBToast.Body>
        </RBToast>
      ))}
    </ToastContainer>
  )
}

export default Toast
