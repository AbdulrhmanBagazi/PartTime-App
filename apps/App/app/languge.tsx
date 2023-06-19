import { Button, useTheme as PaperTheme } from 'react-native-paper'
import { Alert, Platform, View } from 'react-native'
import { Image } from 'expo-image'
import { useI18nHook, Language } from '../hook/i18n'
import { useRouter } from 'expo-router'

export default function LanguageSelect() {
  const theme = PaperTheme()
  const ToggleI18n = useI18nHook((state) => state.ToggleI18n)
  const I18n = useI18nHook((state) => state.I18n)
  const router = useRouter()

  const HandleLanguage = (Language: Language) => {
    ToggleI18n(Language)

    return router.replace('/')
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: theme.colors.background
      }}
    >
      <View
        style={{
          flex: 1,
          height: 150,
          marginVertical: 50
        }}
      >
        <Image
          source={require('../assets/logo.png')}
          transition={1000}
          contentFit="contain"
          style={{
            flex: 1,
            width: '100%'
          }}
        />
      </View>
      <View
        style={{
          height: 150,
          marginVertical: 50
        }}
      >
        <Button
          mode="contained"
          onPress={() =>
            Platform.OS === 'ios'
              ? HandleLanguage('ar')
              : Alert.alert(
                  I18n['App.Settings'].AppRestart,
                  I18n['App.Settings'].Wanttoproceed,
                  [
                    {
                      text: I18n.Alert.Yes,
                      onPress: () => {
                        HandleLanguage('ar')
                      }
                    },
                    {
                      text: I18n.Notifications.Cancel
                    }
                  ]
                )
          }
          style={{ marginVertical: 20 }}
        >
          {I18n.Language.Arabic}
        </Button>
        <Button
          mode="contained"
          onPress={() =>
            Platform.OS === 'ios'
              ? HandleLanguage('en')
              : Alert.alert(
                  I18n['App.Settings'].AppRestart,
                  I18n['App.Settings'].Wanttoproceed,
                  [
                    {
                      text: I18n.Alert.Yes,
                      onPress: () => {
                        HandleLanguage('en')
                      }
                    },
                    {
                      text: I18n.Notifications.Cancel
                    }
                  ]
                )
          }
        >
          {I18n.Language.English}
        </Button>
      </View>
    </View>
  )
}
