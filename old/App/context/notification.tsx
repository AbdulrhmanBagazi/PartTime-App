import React, { createContext, useContext, useEffect, useState } from 'react'
import OneSignal, { IosPermissionStatus } from 'react-native-onesignal'
import { Alert, Linking } from 'react-native'
import { useI18nHook } from '../done/hook/i18n'

interface DeviceState {
  userId: string
  pushToken: string
  emailUserId: string
  emailAddress: string
  smsUserId: string
  smsNumber: string
  isSubscribed: boolean
  isPushDisabled: boolean
  isEmailSubscribed: boolean
  isSMSSubscribed: boolean
  hasNotificationPermission?: boolean
  notificationPermissionStatus?: IosPermissionStatus
}

type NotificationContextType = {
  ToggleNotification: () => void
  Notification: DeviceState | null
  notificationLoading: boolean
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export const NotificationProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isNotification, setNotification] = useState<DeviceState | null>(null)
  const I18n = useI18nHook((state) => state.I18n)
  const [isLoading, setLoading] = useState(false)

  const ToggleNotification = async () => {
    setLoading(true)
    const state = await OneSignal.getDeviceState()

    if (state) {
      if (state.hasNotificationPermission) {
        OneSignal.disablePush(!state.isPushDisabled)
        setNotification({
          ...state,
          isPushDisabled: !state.isPushDisabled
        })
      } else {
        Alert.alert(
          I18n.Notifications.AllowNotifications,
          I18n.Notifications.AllowNotificationsMSG,
          [
            {
              text: I18n.Notifications.Settings,
              onPress: () => {
                Linking.openSettings()
              }
            },
            {
              text: I18n.Notifications.Cancel
            }
          ]
        )
        return setLoading(false)
      }
    }

    setTimeout(() => {
      setLoading(false)
    }, 2000)

    return
  }

  useEffect(() => {
    const Handle = async () => {
      const state = await OneSignal.getDeviceState()

      return setNotification(state)
    }

    Handle()
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        ToggleNotification,
        Notification: isNotification,
        notificationLoading: isLoading
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
