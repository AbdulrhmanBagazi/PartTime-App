import React from 'react'
import { GoogleArgs, QueryResponse, UserTypes } from '../types/types'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { fetcher, poster } from '../api/auth.api'

type AuthContextType = {
  setAuth: (isAuth: boolean) => void
  auth: boolean
  user: UserTypes
  loading: boolean
  SignOut: () => void
  GoogleSignIn: (arg0: GoogleArgs) => void
  Authenticate: () => void
}

const AuthContext = React.createContext<AuthContextType>(null)

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext)
}

export const AuthProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [auth, setAuth] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState(null)

  const Authenticate = async () => {
    setLoading(true)
    const [error, data] = await fetcher('/authentication')

    if (error && !data) {
      // addError(error)
      setAuth(false)
      setLoading(false)

      // setTimeout(() => {
      //   // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
      //   // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 7)
      //   if (Platform.OS === 'ios') {
      //     OneSignal.promptForPushNotificationsWithUserResponse(response => {
      //       if (!response) {
      //         OneSignal.disablePush(true);
      //       }
      //     });
      //   }
      // }, 1000);
      return
    }

    // setVerfied(data?.user?.verfied);
    setUser(data?.user)
    setAuth(true)
    setLoading(false)

    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 7)
    // if (Platform.OS === 'ios') {
    //   OneSignal.promptForPushNotificationsWithUserResponse(response => {
    //     if (!response) {
    //       OneSignal.disablePush(true);
    //     }
    //   });
    // }

    return
  }

  //Google
  const GoogleSignIn = async (values: GoogleArgs): Promise<QueryResponse> => {
    setLoading(true)

    const [error, data]: any[string] = await poster(
      '/authentication/google',
      values
    )

    if (error && !data) {
      setUser(null)
      setLoading(false)
      return [error, data]
    }

    setAuth(true)
    setLoading(false)
    // setVerfied(data?.user?.verfied)
    setUser(data?.user)

    // if (data?.user?.id) {
    //   OneSignal.setExternalUserId(data?.user?.id)
    // }

    return [error, data]
  }

  const SignOut = async () => {
    setLoading(true)

    const [error, data] = await fetcher('/authentication/signout')

    //if google account
    if (user?.Type === 'GOOGLE') {
      await GoogleSignin.signOut()
    }

    if (error && !data) {
      setUser(null)
      setLoading(false)
      return
    }

    setUser(null)
    setAuth(false)
    setLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        setAuth: (isAuth) => setAuth(isAuth),
        auth,
        loading,
        user,
        Authenticate,
        GoogleSignIn,
        SignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
