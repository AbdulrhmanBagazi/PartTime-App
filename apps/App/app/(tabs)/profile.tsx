import Page from '../../layout/page'
import { useI18n } from '../../context/i18n'
import { Button, Text } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { useAuth } from '../../context/auth'

export default function Profile() {
  const { I18n } = useI18n()
  const { user } = useAuth()
  const { auth, loading } = useAuth()
  const router = useRouter()

  return (
    <Page>
      <View style={{ flex: 1 }}>
        <Text variant="bodyLarge">{user?.email}</Text>
      </View>

      {auth ? null : (
        <Button
          icon="login"
          mode="elevated"
          onPress={() => router.push('/signin')}
          disabled={loading}
        >
          {I18n.Profile.SignIn}
        </Button>
      )}
    </Page>
  )
}
