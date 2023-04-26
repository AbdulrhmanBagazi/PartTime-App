import React, { useEffect } from 'react'
import { Button } from 'react-native-paper'
import { Image, View } from 'react-native'
import { androidClientId, iosClientId } from '../config/app.config'
import { useAuth } from '../context/auth'
import * as Google from 'expo-auth-session/providers/google'

const MGoogleButton: React.FC<{ text: String; dark: boolean }> = ({
  text,
  dark
}) => {
  const { loading, GoogleSignIn } = useAuth()

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: androidClientId,
    iosClientId: iosClientId
  })

  useEffect(() => {
    if (response?.type === 'success') {
      GoogleSignIn({ idToken: response.authentication.idToken })
    }
  }, [response])

  return (
    <Button
      onPress={() => {
        promptAsync()
      }}
      mode="contained"
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
              height: size,
              backgroundColor: 'white'
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
