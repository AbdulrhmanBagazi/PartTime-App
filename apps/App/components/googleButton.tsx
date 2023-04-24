import React from 'react'
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin'
import { Button } from 'react-native-paper'
import { Image, View } from 'react-native'
import { webClientId } from '../config/app.config'
import { useAuth } from '../context/auth'

const MGoogleButton: React.FC<{ text: String; dark: boolean }> = ({
  text,
  dark
}) => {
  const { loading, GoogleSignIn } = useAuth()

  GoogleSignin.configure({
    webClientId: webClientId,
    offlineAccess: false
  })

  const Sign = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()

      return GoogleSignIn(userInfo)
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //user cancelled the login flow
        console.log('user cancelled the login flow')
        return
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('operation (e.g. sign in) is in progress already')
        return
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available or outdated')
        return
      } else {
        // some other error happened
        console.log(error)
        return
      }
    }
  }

  return (
    // <GoogleSigninButton
    //   style={{ width: 192, height: 48, alignSelf: 'center' }}
    //   size={GoogleSigninButton.Size.Wide}
    //   color={
    //     dark ? GoogleSigninButton.Color.Dark : GoogleSigninButton.Color.Light
    //   }
    //   onPress={() => Sign()}
    //   disabled={loading}
    // />
    <Button
      onPress={() => Sign()}
      mode="elevated"
      // labelStyle={styles.label}
      buttonColor={dark ? '#FFFFFF' : '#4285F4'}
      textColor={dark ? 'black' : 'white'}
      uppercase={false}
      disabled={loading}
      contentStyle={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      icon={({ size }) => (
        <View
          style={{
            backgroundColor: '#FFFFFF',
            flex: 1,
            justifyContent: 'center',
            width: 50,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: -15,
            margin: 1,
            borderRadius: 3,
            opacity: loading ? 0.25 : 1
          }}
        >
          <Image
            source={require('../assets/google-logo.png')}
            style={{
              width: size,
              height: size
            }}
          />
        </View>
      )}
    >
      {text}
    </Button>
  )
}

export default MGoogleButton
