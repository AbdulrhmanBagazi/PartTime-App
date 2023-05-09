import Page from '../../layout/page'
import { useI18n } from '../../context/i18n'
import { Button } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/auth'
import { View } from 'react-native'
import ProfileUi from '../../components/(tabs)/profile/ui.profile'

export default function Profile() {
  const { I18n, Lang } = useI18n()
  const { user } = useAuth()
  const { auth, loading } = useAuth()
  const router = useRouter()

  return (
    <View style={{ flex: 1 }}>
      <Page>
        <ProfileUi auth={auth} user={user} I18n={I18n} Lang={Lang} />
      </Page>
      {auth ? null : (
        <Button
          icon="login"
          mode="contained"
          onPress={() => router.push('/(auth)/signin')}
          disabled={loading}
          style={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            margin: 10
          }}
        >
          {I18n.Profile.SignIn}
        </Button>
      )}
    </View>
  )
}
