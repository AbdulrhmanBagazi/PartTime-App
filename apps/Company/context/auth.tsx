import React, { useEffect } from 'react'
import {
  AppleArgs,
  GoogleArgs,
  QueryResponse,
  SignTypes,
  UserTypes
} from '../types/types'
import { fetcher, poster } from '../api/auth.api'
import * as AppleAuthentication from 'expo-apple-authentication'
import { Platform } from 'react-native'
import OneSignal from 'react-native-onesignal'

type AuthContextType = {
  setAuth: (isAuth: boolean) => void
  auth: boolean
  user: UserTypes
  loading: boolean
  SignOut: () => void
  GoogleSignIn: (arg0: GoogleArgs) => void
  AppleSignIn: (arg0: AppleArgs) => void
  Authenticate: () => void
  SignIn: (arg0: SignTypes) => void
  SignUp: (arg0: SignTypes) => void
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

  useEffect(() => {
    //check if user authenticated
    Authenticate()
  }, [])

  const Authenticate = async () => {
    setLoading(true)
    const [error, data] = await fetcher('/authentication')

    if (error && !data) {
      // addError(error)
      setAuth(false)
      setLoading(false)

      setTimeout(() => {
        // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
        // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 7)
        if (Platform.OS === 'ios') {
          OneSignal.promptForPushNotificationsWithUserResponse((response) => {
            if (!response) {
              OneSignal.disablePush(true)
            }
          })
        }
      }, 1000)
      return
    }

    if (data?.user?.Type === 'APPLE' && data?.user?.AppleId) {
      const check = await AppleAuthentication.getCredentialStateAsync(
        data?.user?.AppleId
      )

      if (check === 0) {
        setAuth(false)
        setLoading(false)

        return
      }
    }

    setUser(data?.user)
    setAuth(true)
    setLoading(false)

    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 7)
    if (Platform.OS === 'ios') {
      OneSignal.promptForPushNotificationsWithUserResponse((response) => {
        if (!response) {
          OneSignal.disablePush(true)
        }
      })
    }

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
    setUser(data?.user)

    if (data?.user?.id) {
      OneSignal.setExternalUserId(data?.user?.id)
    }

    return [error, data]
  }

  //Apple
  const AppleSignIn = async (values: AppleArgs): Promise<QueryResponse> => {
    setLoading(true)

    const [error, data]: any[string] = await poster(
      '/authentication/apple',
      values
    )

    if (error && !data) {
      setUser(null)
      setLoading(false)
      return [error, data]
    }

    setAuth(true)
    setLoading(false)
    setUser(data?.user)

    if (data?.user?.id) {
      OneSignal.setExternalUserId(data?.user?.id)
    }

    return [error, data]
  }

  //Email

  const SignIn = async (values: SignTypes): Promise<QueryResponse> => {
    setLoading(true)

    const [error, data]: any[string] = await poster(
      '/authentication/signin',
      values
    )

    if (error && !data) {
      setUser(null)
      setLoading(false)
      return [error, data]
    }

    setAuth(true)
    setLoading(false)
    setUser(data?.user)

    if (data?.user?.id) {
      OneSignal.setExternalUserId(data?.user?.id)
    }

    return [error, data]
  }

  const SignUp = async (values: SignTypes) => {
    setLoading(true)

    const [error, data]: any[string] = await poster(
      '/authentication/signup',
      values
    )

    if (error && !data) {
      setUser(null)
      setLoading(false)
      return [error, data]
    }

    setAuth(true)
    setLoading(false)
    setUser(data?.user)

    if (data?.user?.id) {
      OneSignal.setExternalUserId(data?.user?.id)
    }

    return [error, data]
  }

  const SignOut = async () => {
    setLoading(true)

    const [error, data] = await fetcher('/authentication/signout')

    //if google account
    // if (user?.Type === 'GOOGLE') {
    //   // await GoogleSignin.signOut()
    // }

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
        AppleSignIn,
        SignIn,
        SignUp,
        SignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
