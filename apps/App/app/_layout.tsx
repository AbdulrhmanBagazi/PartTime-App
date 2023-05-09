import 'react-native-gesture-handler'
import { Stack } from 'expo-router'
import { AuthProvider } from '../context/auth'
import { ToggleThemeProvider } from '../context/theme'
import { I18nProvider } from '../context/i18n'
import { SnackProvider } from '../context/snack'
import Constants from 'expo-constants'
import OneSignal from 'react-native-onesignal'
import * as Notifications from 'expo-notifications'
import { NotificationProvider } from '../context/notification'
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
  return (
    <ToggleThemeProvider>
      <I18nProvider>
        <NotificationProvider>
          <SnackProvider>
            <AuthProvider>
              <Stack
                initialRouteName="loading"
                screenOptions={{
                  headerShadowVisible: false
                }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(auth)"
                  options={{
                    presentation: 'modal',
                    headerShown: false
                  }}
                />
                <Stack.Screen name="createprofile" />
                <Stack.Screen
                  name="app.settings"
                  options={{
                    presentation: 'modal'
                  }}
                />
              </Stack>
            </AuthProvider>
          </SnackProvider>
        </NotificationProvider>
      </I18nProvider>
    </ToggleThemeProvider>
  )
}
