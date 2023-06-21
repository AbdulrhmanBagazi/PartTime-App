import Page from '../../layout/page'
import { Button } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { View } from 'react-native'
import ProfileUi from '../../components/(tabs)/profile/ui.profile'
import { useI18nHook } from '../../done/hook/i18n'
import { useAuthHook } from '../../done/hook/auth'

export default function Profile() {
  const I18n = useI18nHook((state) => state.I18n)
  const Language = useI18nHook((state) => state.Language)
  const auth = useAuthHook((state) => state.auth)
  const loading = useAuthHook((state) => state.loading)
  const user = useAuthHook((state) => state.user)

  const router = useRouter()

  return (
    <View style={{ flex: 1, direction: 'rtl' }}>
      <Page>
        <ProfileUi auth={auth} user={user} I18n={I18n} Lang={Language} />
      </Page>
      {auth ? null : (
        <Button
          icon="login"
          mode="contained"
          onPress={() => router.push('/signin')}
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
