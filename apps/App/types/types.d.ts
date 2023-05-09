import 'react-native-svg'

interface UserProfileType {
  id: string
  createdAt: DateTime
  updatedAt: DateTime
  //
  userId: string
  //
  Name: string
  nationality: CountryCode
  nationalID: string
  dateOfBirth: Date | null
  gender: string
  //
  whatsapp: string
  phone: string
  //
  About: string
  Degree: string
  Experiences: Json[]
  //
  ArabicVideo: string
  EnglishVideo: string!
}

export type UserTypes = {
  email: string
  verfied: boolean
  Type: string
  verificationEmail: string
  AppleId?: string
  Profile: UserProfileType | null
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
}

declare module 'react-native-svg' {
  export interface SvgProps {
    xmlns?: string
    xmlnsXlink?: string
  }
}
