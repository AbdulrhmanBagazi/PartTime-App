import { Stack, useRouter } from 'expo-router'
import Page from '../layout/page'
import { useI18n } from '../context/i18n'
import MGoogleButton from '../components/googleButton'
import { useAuth } from '../context/auth'
import { useEffect } from 'react'

export default function SignIn() {
  const { I18n } = useI18n()
  const { loading, auth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (auth) {
      return router.back()
    }
  }, [auth])

  return (
    <Page>
      <Stack.Screen
        options={{
          title: I18n.SignIn.Title,
          gestureEnabled: !loading,
          headerBackVisible: !loading
        }}
      />
      <MGoogleButton text={I18n.SignIn.Google} />
    </Page>
  )
}
