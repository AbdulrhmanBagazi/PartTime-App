import Page from '../../layout/page'
import { useI18n } from '../../context/i18n'
import { Button, useTheme, Text } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { useAuth } from '../../context/auth'

export default function Profile() {
  const { I18n } = useI18n()
  const { user } = useAuth()
  const { auth, SignOut, loading } = useAuth()
  const theme = useTheme()
  const router = useRouter()

  return (
    <Page>
      <View style={{ flex: 1 }}>
        <Text variant="bodyLarge">{user?.email}</Text>
      </View>
      <Button
        icon="login"
        mode="contained"
        onPress={() => (auth ? SignOut() : router.push('/signin'))}
        textColor={auth ? theme.colors.onSecondary : theme.colors.onPrimary}
        buttonColor={auth ? theme.colors.secondary : theme.colors.primary}
        disabled={loading}
      >
        {auth ? I18n.Profile.SignOut : I18n.Profile.SignIn}
      </Button>
    </Page>
  )
}
