import Page from '../../layout/page'
import SignupForm from '../../components/signupFrom'
import { useI18n } from '../../context/i18n'
import { Stack } from 'expo-router'
import { useAuth } from '../../context/auth'

export default function SignUp() {
  const { I18n } = useI18n()
  const { loading } = useAuth()

  return (
    <Page>
      <Stack.Screen
        options={{
          gestureEnabled: !loading,
          headerBackVisible: !loading
        }}
      />
      <SignupForm I18n={I18n} />
    </Page>
  )
}
