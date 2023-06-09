import 'react-native-gesture-handler'
import { Stack } from 'expo-router'
import Constants from 'expo-constants'
import OneSignal from 'react-native-onesignal'
import * as Notifications from 'expo-notifications'
import { NotificationProvider } from '../context/notification'
import { ApolloProvider } from '@apollo/client'
import Client from '../api/apollo'
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme/config'
import { useThemeHook } from '../hook/theme'
import React, { useEffect } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { ThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { useAuthHook } from '../hook/auth'

OneSignal.setAppId(Constants.manifest.extra.oneSignalAppId)
//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(
  (notificationReceivedEvent) => {
    // console.log(
    //   'OneSignal: notification will show in foreground:',
    //   notificationReceivedEvent,
    // );
    let notification = notificationReceivedEvent.getNotification()
    // console.log('notification: ', notification);
    // const data = notification.additionalData;
    // console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification)
  }
)

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

export default () => {
  const Dark = useThemeHook((state) => state.Dark)
  const Authenticate = useAuthHook((state) => state.Authenticate)

  useEffect(() => {
    Authenticate()
  }, [])

  return (
    <ThemeProvider value={Dark ? CombinedDarkTheme : CombinedDefaultTheme}>
      <PaperProvider theme={Dark ? CombinedDarkTheme : CombinedDefaultTheme}>
        <NotificationProvider>
          <ApolloProvider client={Client}>
            <StatusBar style={Dark ? 'light' : 'dark'} animated />
            <Stack
              screenOptions={{
                headerShadowVisible: false
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false, animation: 'fade' }}
              />
              <Stack.Screen
                name="createprofile"
                options={{
                  headerBackTitleVisible: false
                }}
              />
              <Stack.Screen
                name="updateprofile"
                options={{
                  headerBackTitleVisible: false
                }}
              />
              <Stack.Screen
                name="app.settings"
                options={{
                  presentation: 'modal'
                }}
              />
              <Stack.Screen
                name="(auth)"
                options={{
                  presentation: 'modal',
                  title: ' '

                  // headerShown: false
                }}
              />
              <Stack.Screen
                name="languge"
                options={{
                  headerShown: false
                }}
              />
            </Stack>
          </ApolloProvider>
        </NotificationProvider>
      </PaperProvider>
    </ThemeProvider>
  )
}
