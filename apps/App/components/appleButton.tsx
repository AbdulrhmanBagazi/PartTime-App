import * as AppleAuthentication from 'expo-apple-authentication'
import { Button } from 'react-native-paper'
import { useAuth } from '../context/auth'

const MAppleButton: React.FC<{ text: string; dark: boolean }> = ({
  text,
  dark
}) => {
  const { loading, AppleSignIn } = useAuth()

  return (
    <Button
      mode="elevated"
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.EMAIL
            ]
          })

          const {
            user: newUser,
            email,
            // nonce,
            identityToken,
            realUserStatus,
            user
          } = credential

          return AppleSignIn({
            user: newUser,
            email,
            appleId: user,
            identityToken,
            realUserStatus /* etc */
          })
          // signed in
        } catch (e) {
          if (e.code === 'ERR_REQUEST_CANCELED') {
            // handle that the user canceled the sign-in flow
          } else {
            // handle other errors
          }
        }
      }}
      buttonColor={dark ? '#FFFFFF' : '#000'}
      textColor={dark ? 'black' : 'white'}
      uppercase={false}
      disabled={loading}
      contentStyle={{
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      icon="apple"
    >
      {text}
    </Button>
  )
}

export default MAppleButton
