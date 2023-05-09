import { Stack, useRouter } from 'expo-router'
import Page from '../../layout/page'
import { useI18n } from '../../context/i18n'
import MGoogleButton from '../../components/googleButton'
import MAppleButton from '../../components/appleButton'
import { useAuth } from '../../context/auth'
import { useEffect, useState } from 'react'
import { useTheme } from '../../context/theme'
import { Divider } from 'react-native-paper'
import EmailForm from '../../components/emailForm'
import { SegmentedButtons } from 'react-native-paper'
// import { Text } from 'react-native-paper'
import SignupForm from '../../components/signupFrom'
import { Image } from 'expo-image'
import { View } from 'react-native'

export default function SignIn() {
  const { I18n } = useI18n()
  const { loading, auth } = useAuth()
  const { Dark } = useTheme()
  const router = useRouter()
  const [value, setValue] = useState('signin')

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
      {/* <Text variant="titleMedium">{I18n.SignIn.EmailSignIn}</Text> */}

      <View
        style={{
          flex: 1,
          height: 200,
          marginVertical: 10
        }}
      >
        <Image
          source={require('../../assets/icon.png')}
          transition={1000}
          contentFit="contain"
          style={{
            flex: 1,
            width: '100%'
          }}
        />
      </View>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        density="small"
        buttons={[
          {
            value: 'signin',
            label: I18n.SignIn.Title,
            disabled: loading,
            style: {
              borderRadius: 5
            }
          },
          {
            value: 'signup',
            label: I18n.SignIn.SignUp,
            disabled: loading,
            style: {
              borderRadius: 5
            }
          }
        ]}
      />
      {value === 'signin' ? (
        <EmailForm I18n={I18n} />
      ) : (
        <SignupForm I18n={I18n} />
      )}
      <Divider style={{ marginVertical: 10 }} />
      <MGoogleButton dark={Dark} text={I18n.SignIn.Google} />
      <Divider
        style={{ width: 100, marginVertical: 10, alignSelf: 'center' }}
      />
      <MAppleButton dark={Dark} text={I18n.SignIn.Apple} />
    </Page>
  )
}
