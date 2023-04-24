import React from 'react'
import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin'
import { Button } from 'react-native-paper'
import { Image } from 'react-native'
import { webClientId, iosClientId } from '../config/app.config'

const MGoogleButton: React.FC<{ text: String }> = ({ text }) => {
  // const {authLoading, GoogleSignIn} = UseAuth() as AuthenticatedTypes;

  GoogleSignin.configure({
    webClientId: webClientId,
    offlineAccess: false
  })

  const Sign = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log(userInfo)
      // return GoogleSignIn(userInfo)
    } catch (error: any) {
      //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //     //user cancelled the login flow
      //     // console.log('user cancelled the login flow');
      //     return
      //   } else if (error.code === statusCodes.IN_PROGRESS) {
      //     // operation (e.g. sign in) is in progress already
      //     // console.log('operation (e.g. sign in) is in progress already');
      //     return
      //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //     // play services not available or outdated
      //     // console.log('play services not available or outdated');
      //     return
      //   } else {
      //     // some other error happened
      //     // console.log(error);
      //     return
      //   }
      console.log({ error })
    }
  }

  return (
    <Button
      onPress={() => Sign()}
      // labelStyle={styles.label}
      // color={isDarkMode ? '#FFFFFF' : '#4285F4'}
      // color="#FFFFFF"
      mode="contained"
      uppercase={false}
      //   disabled={authLoading}
      icon={({ size }) => (
        <Image
          source={require('../assets/google-logo.png')}
          style={{
            width: size + 5,
            height: size + 5
          }}
        />
      )}
    >
      {text}
    </Button>
  )
}

export default MGoogleButton