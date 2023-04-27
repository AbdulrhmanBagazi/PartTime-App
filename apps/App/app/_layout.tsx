import 'react-native-gesture-handler'
import { Stack } from 'expo-router'
import { AuthProvider } from '../context/auth'
import { ToggleThemeProvider } from '../context/theme'
import { I18nProvider } from '../context/i18n'
import { SnackProvider } from '../context/snack'
import OneSignal from 'react-native-onesignal'
import Constants from 'expo-constants'
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

export default () => {
  return (
    <ToggleThemeProvider>
      <I18nProvider>
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
                  // Set the presentation mode to modal for our modal route.
                  presentation: 'modal',
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="app.settings"
                options={{
                  // Set the presentation mode to modal for our modal route.
                  presentation: 'modal'
                }}
              />
            </Stack>
          </AuthProvider>
        </SnackProvider>
      </I18nProvider>
    </ToggleThemeProvider>
  )
}
