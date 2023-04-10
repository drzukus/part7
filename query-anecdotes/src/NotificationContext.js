import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIF":
      return action.payload
    case "REMOVE_NOTIF":
      return ""
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notificationReducer, "")

  return (
    <NotificationContext.Provider value={[notif, notifDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotifValue = () => {
  const notifAndDispatch = useContext(NotificationContext)
  return notifAndDispatch[0]
}

export const useNotifDispatch = () => {
  const notifAndDispatch = useContext(NotificationContext)
  return notifAndDispatch[1]
}

export default NotificationContext