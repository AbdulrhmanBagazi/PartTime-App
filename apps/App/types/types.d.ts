import 'react-native-svg'
import { Profile } from '../graphql/generated'

export type UserTypes = {
  email: string
  verfied: boolean
  Type: string
  verificationEmail: string
  AppleId?: string
  Profile: Profile | null
}

export interface user {
  user: UserTypes
}

export type QueryResponse = [
  error: { data: Array<any> | object | string; status: number } | null,
  data: user | any
]

export type GoogleArgs = {
  idToken: string
}

export type AppleArgs = {
  user: String
  email: String | null
  appleId: String
  identityToken: String
  realUserStatus: number
}

export type SignTypes = {
  email: string
  password: string
}

export type AuthenticatedTypes = {
  setAuth: (isAuth: boolean) => void
  auth: boolean
  user: UserTypes
  loading: boolean
  SignOut: () => void
  GoogleSignIn: (arg0: GoogleArgs) => void
  AppleSignIn: (arg0: AppleArgs) => void
  Authenticate: () => void
  SignIn: (arg0: SignTypes) => QueryResponse
  SignUp: (arg0: SignTypes) => QueryResponse
  UpdateUserProfile: (arg0: Profile) => void
}

declare module 'react-native-svg' {
  export interface SvgProps {
    xmlns?: string
    xmlnsXlink?: string
  }
}
