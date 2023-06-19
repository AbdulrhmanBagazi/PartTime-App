import 'expo-router/entry'
import 'react-native-gesture-handler'
import * as WebBrowser from 'expo-web-browser'
import { registerRootComponent } from 'expo'
import { ExpoRoot } from 'expo-router'
import Constants from 'expo-constants'
import OneSignal from 'react-native-onesignal'
import * as Notifications from 'expo-notifications'
var countries = require('i18n-iso-countries')

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

// // Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context('./app')
  return <ExpoRoot context={ctx} />
}

WebBrowser.maybeCompleteAuthSession()
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
countries.registerLocale(require('i18n-iso-countries/langs/ar.json'))
registerRootComponent(App)
