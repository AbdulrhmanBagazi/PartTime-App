import { ActivityIndicator, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { myLightTheme } from '../done/theme/light'
import * as SecureStore from 'expo-secure-store'
import { useI18nHook } from '../done/hook/i18n'
import { useThemeHook } from '../done/hook/theme'
import { useAuthHook } from '../done/hook/auth'

export default function Loading() {
  // const { auth, loading } = useAuth()
  const router = useRouter()
  const I18nStore = useI18nHook((state) => state.I18nStore)
  const ThemeStore = useThemeHook((state) => state.ThemeStore)
  const loading = useAuthHook((state) => state.loading)
  const auth = useAuthHook((state) => state.auth)

  useEffect(() => {
    const Load = async () => {
      const LangStore = await SecureStore.getItemAsync('AppLang')
      I18nStore()
      ThemeStore()

      if (LangStore === null) {
        setTimeout(() => {
          router.replace('/languge')
        }, 1000)

        return
      }

      if (auth && !loading) {
        setTimeout(() => {
          router.replace('(tabs)/home')
        }, 1000)

        return
      }

      if (!auth && !loading) {
        setTimeout(() => {
          router.replace('(tabs)/home')
        }, 1000)

        return
      }
    }

    Load()
  }, [auth, loading])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: myLightTheme.colors.primary
      }}
    >
      <ActivityIndicator />
    </View>
  )
}
