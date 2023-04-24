import { Stack } from 'expo-router'
import Page from '../layout/page'
import { useI18n } from '../context/i18n'
import MGoogleButton from '../components/googleButton'

export default function SignIn() {
  const { I18n } = useI18n()

  return (
    <Page>
      <Stack.Screen
        options={{
          title: I18n.SignIn.Title
        }}
      />

      <MGoogleButton text={I18n.SignIn.Google} />
    </Page>
  )
}
