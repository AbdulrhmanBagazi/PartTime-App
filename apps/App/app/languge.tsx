import { Button, useTheme as PaperTheme } from 'react-native-paper'
import { View } from 'react-native'
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
          onPress={() => HandleLanguage('ar')}
          style={{ marginVertical: 20 }}
        >
          {I18n.Language.Arabic}
        </Button>
        <Button mode="contained" onPress={() => HandleLanguage('en')}>
          {I18n.Language.English}
        </Button>
      </View>
    </View>
  )
}
