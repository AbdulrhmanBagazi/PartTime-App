import { Stack, useNavigation, useRouter } from 'expo-router'
import Page from '../../layout/page'
import { useI18n } from '../../context/i18n'
import MGoogleButton from '../../components/googleButton'
import MAppleButton from '../../components/appleButton'
import { useAuth } from '../../context/auth'
import { useEffect, useState } from 'react'
import { useTheme } from '../../context/theme'
import { Button, Divider } from 'react-native-paper'
import EmailForm from '../../components/emailForm'
import SignupForm from '../../components/signupFrom'
import { Image } from 'expo-image'
import { Platform, View } from 'react-native'
import { useTheme as PaperTheme } from 'react-native-paper'

export default function SignIn() {
  const { I18n } = useI18n()
  const { loading, auth } = useAuth()
  const { Dark } = useTheme()
  const router = useRouter()
  const [value, setValue] = useState('signin')
  const theme = PaperTheme()
  const { addListener } = useNavigation()

  useEffect(() => {
    if (auth) {
      return router.replace('(tabs)/profile')
    }
  }, [auth])

  useEffect(
    () =>
      addListener('beforeRemove', (e) => {
        if (Platform.OS === 'ios') {
          return
        }

        if (!loading && Platform.OS === 'android') {
          return
        }
        // Prevent default behavior of leaving the screen
        e.preventDefault()

        // Prompt the user before leaving the screen
      }),
    [addListener, loading]
  )

  return (
    <Page>
      <Stack.Screen
        options={{
          gestureEnabled: !loading,
          headerBackVisible: !loading
        }}
      />

      <View
        style={{
          flex: 1,
          height: 150,
          marginVertical: 50
        }}
      >
        <Image
          source={require('../../assets/logo.png')}
          transition={1000}
          contentFit="contain"
          style={{
            flex: 1,
            width: '100%'
          }}
        />
      </View>

      {value === 'signin' ? (
        <>
          <EmailForm I18n={I18n} />

          <Button
            disabled={loading}
            mode="text"
            onPress={() => setValue('signup')}
            style={{ marginTop: 10 }}
            textColor={theme.colors.secondary}
          >
            {I18n.SignIn.SignUp}
          </Button>
          <Divider style={{ marginVertical: 10 }} />
          <MGoogleButton dark={Dark} text={I18n.SignIn.Google} />
          <Divider
            style={{ width: 100, marginVertical: 10, alignSelf: 'center' }}
          />
          <MAppleButton dark={Dark} text={I18n.SignIn.Apple} />
        </>
      ) : (
        <>
          <SignupForm I18n={I18n} />
          <Button
            disabled={loading}
            mode="text"
            onPress={() => setValue('signin')}
            style={{ marginTop: 10 }}
            textColor={theme.colors.secondary}
          >
            {I18n.SignIn.HaveAccount}
          </Button>
        </>
      )}
    </Page>
  )
}
