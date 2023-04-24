import { Stack, useRouter } from 'expo-router'
import Page from '../layout/page'
import { useI18n } from '../context/i18n'
import MGoogleButton from '../components/googleButton'
import { useAuth } from '../context/auth'
import { useEffect } from 'react'
import MAppleButton from '../components/appleButton'
import { useTheme } from '../context/theme'
import { Divider } from 'react-native-paper'

export default function SignIn() {
  const { I18n } = useI18n()
  const { loading, auth } = useAuth()
  const { Dark } = useTheme()
  const router = useRouter()

  useEffect(() => {
    if (auth) {
      return router.back()
    }
  }, [auth])

  return (
    <Page scrollEnabled={false}>
      <Stack.Screen
        options={{
          title: I18n.SignIn.Title,
          gestureEnabled: !loading,
          headerBackVisible: !loading
        }}
      />
      <MGoogleButton dark={Dark} text={I18n.SignIn.Google} />
      <Divider
        style={{ width: 100, marginVertical: 10, alignSelf: 'center' }}
      />
      <MAppleButton dark={Dark} text={I18n.SignIn.Apple} />
    </Page>
  )
}
