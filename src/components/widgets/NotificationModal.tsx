import React, { MouseEventHandler } from 'react'
import Portal from './Portal'
import Cross from '../icons/Cross'

type Props = {
  show: boolean,
  type: "success" | "warning" | "danger",
  title: string,
  message: string,
  closeNotification: MouseEventHandler<HTMLButtonElement>
}

const NotificationModal = ({ show, type, title = "", message, closeNotification }: Props) => {

  const states = {
    success: "modal_green",
    warning: "modal_yellow",
    danger: "modal_red",
  }

  const modalState = type ? states[type] : ""

  return (
    <Portal type="alert">
      {
        show &&
        <div className={`NotificationModal ${modalState}`}>

          <div>
            <span>{title}</span>
            <span>{message}</span>
          </div>

          <button onClick={closeNotification}>
            <Cross />
          </button>

        </div>
      }
    </Portal>
  )
}

export default NotificationModal;