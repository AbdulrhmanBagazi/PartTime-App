import { Stack, useRouter } from 'expo-router'
import Page from '../../layout/page'
import { useI18n } from '../../context/i18n'
import MGoogleButton from '../../components/googleButton'
import MAppleButton from '../../components/appleButton'
import { useAuth } from '../../context/auth'
import { useEffect } from 'react'
import { useTheme } from '../../context/theme'
import { Divider } from 'react-native-paper'
import EmailForm from '../../components/emailForm'

export default function SignIn() {
  const { I18n } = useI18n()
  const { loading, auth } = useAuth()
  const { Dark } = useTheme()
  const router = useRouter()

  useEffect(() => {
    if (auth) {
      return router.replace('(tabs)/profile')
    }
  }, [auth])

  return (
    <Page>
      <Stack.Screen
        options={{
          gestureEnabled: !loading,
          headerBackVisible: !loading
        }}
      />
      <EmailForm I18n={I18n} />
      <Divider style={{ marginVertical: 10 }} />
      <MGoogleButton dark={Dark} text={I18n.SignIn.Google} />
      <Divider
        style={{ width: 100, marginVertical: 10, alignSelf: 'center' }}
      />
      <MAppleButton dark={Dark} text={I18n.SignIn.Apple} />
    </Page>
  )
}
