import { Alert, Platform, StyleSheet, View } from 'react-native'
import { Link, Stack, useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Page from '../layout/page'
import { Text, Switch, Divider, RadioButton, Button } from 'react-native-paper'
import { useNotification } from '../context/notification'
import { useTheme as PaperTheme } from 'react-native-paper'
import { useI18nHook } from '../hook/i18n'
import { useThemeHook } from '../hook/theme'
import { useAuthHook } from '../hook/auth'

export default function Modal() {
  const navigation = useNavigation()
  const ToggleTheme = useThemeHook((state) => state.ToggleTheme)
  const Dark = useThemeHook((state) => state.Dark)
  const auth = useAuthHook((state) => state.auth)
  const loading = useAuthHook((state) => state.loading)
  const SignOut = useAuthHook((state) => state.SignOut)

  const isPresented = navigation.canGoBack()
  const { notificationLoading, ToggleNotification, Notification } =
    useNotification()
  const theme = PaperTheme()
  const ToggleI18n = useI18nHook((state) => state.ToggleI18n)
  const I18n = useI18nHook((state) => state.I18n)
  const Language = useI18nHook((state) => state.Language)

  return (
    <Page>
      <StatusBar
        style={Platform.OS === 'ios' ? 'light' : Dark ? 'light' : 'dark'}
        animated
      />
      <Stack.Screen
        options={{
          title: I18n['App.Settings'].Title,
          gestureEnabled: !loading,
          headerBackVisible: !loading
        }}
      />
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      {!isPresented && <Link href="../">Dismiss</Link>}
      <View style={{ flex: 1 }}>
        <Text variant="bodyLarge">{I18n['App.Settings'].Theme}</Text>
        <View style={styles.items}>
          <Text variant="labelLarge">{I18n['App.Settings'].DarkMode}</Text>
          <Switch value={Dark} onValueChange={ToggleTheme} />
        </View>
        <Divider style={styles.Divider} />
        <Text variant="bodyLarge">{I18n['App.Settings'].Notification}</Text>
        <View style={styles.items}>
          <Text variant="labelLarge">
            {I18n['App.Settings'].AllowNotification}
          </Text>
          <Switch
            value={
              Notification?.hasNotificationPermission
                ? !Notification.isPushDisabled
                : false
            }
            onValueChange={ToggleNotification}
            disabled={notificationLoading}
          />
        </View>
        <Divider style={styles.Divider} />
        <Text variant="bodyLarge">{I18n['App.Settings'].Language}</Text>
        <View>
          <RadioButton.Item
            label={I18n['App.Settings'].Arabic}
            value="ar"
            disabled={Language === 'ar'}
            status={Language === 'ar' ? 'checked' : 'unchecked'}
            onPress={() =>
              Platform.OS === 'ios'
                ? ToggleI18n('ar')
                : Alert.alert(
                    I18n['App.Settings'].AppRestart,
                    I18n['App.Settings'].Wanttoproceed,
                    [
                      {
                        text: I18n.Alert.Yes,
                        onPress: () => {
                          ToggleI18n('ar')
                        }
                      },
                      {
                        text: I18n.Notifications.Cancel
                      }
                    ]
                  )
            }
          />
        </View>
        <View>
          <RadioButton.Item
            value={I18n['App.Settings'].English}
            label="English"
            disabled={Language === 'en'}
            status={Language === 'en' ? 'checked' : 'unchecked'}
            onPress={() =>
              Platform.OS === 'ios'
                ? ToggleI18n('en')
                : Alert.alert(
                    I18n['App.Settings'].AppRestart,
                    I18n['App.Settings'].Wanttoproceed,
                    [
                      {
                        text: I18n.Alert.Yes,
                        onPress: () => {
                          ToggleI18n('en')
                        }
                      },
                      {
                        text: I18n.Notifications.Cancel
                      }
                    ]
                  )
            }
          />
        </View>
        <Divider style={styles.Divider} />
        <View style={styles.signou}>
          <Button
            icon="logout"
            mode="contained"
            buttonColor={theme.colors.secondary}
            textColor={theme.colors.onSecondary}
            onPress={() =>
              Alert.alert(
                I18n['App.Settings'].SignOut,
                I18n.Alert['Alert.SignOut'],
                [
                  {
                    text: I18n.Alert.No,
                    style: 'cancel'
                  },
                  { text: I18n.Alert.Yes, onPress: () => SignOut() }
                ]
              )
            }
            disabled={loading || !auth}
          >
            {I18n['App.Settings'].SignOut}
          </Button>
        </View>
      </View>
    </Page>
  )
}

const styles = StyleSheet.create({
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  signou: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  Divider: {
    marginVertical: 10
  }
})
