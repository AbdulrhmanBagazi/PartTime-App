import Page from '../../layout/page'
import { useI18n } from '../../context/i18n'
import { Button, useTheme } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { useAuth } from '../../context/auth'

export default function Profile() {
  const { I18n } = useI18n()
  const { auth } = useAuth()
  const theme = useTheme()
  const router = useRouter()

  return (
    <Page>
      <View style={{ flex: 1 }}></View>
      <Button
        icon="login"
        mode="contained"
        onPress={() => router.push('/signin')}
        textColor={auth ? theme.colors.onSecondary : theme.colors.onPrimary}
        buttonColor={auth ? theme.colors.secondary : theme.colors.primary}
      >
        {I18n.Profile.SignIn}
      </Button>
    </Page>
  )
}
