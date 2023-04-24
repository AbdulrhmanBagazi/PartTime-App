export type UserTypes = {
  email: string
  verfied: boolean
  Type: string
  verificationEmail: string
  AppleId?: string
}

export interface user {
  user: UserTypes
}

export type QueryResponse = [
  error: { data: Array<any> | object | string; status: number } | null,
  data: user | any
]

export type GoogleArgs = {
  user: {
    id: string
    name: string | null
    email: string
    photo: string | null
    familyName: string | null
    givenName: string | null
  }
  scopes?: string[]
  idToken: string | null
  /**
   * Not null only if a valid webClientId and offlineAccess: true was
   * specified in configure().
   */
  serverAuthCode: string | null
}

export type AppleArgs = {
  user: String
  email: String | null
  appleId: String
  identityToken: String
  realUserStatus: number
}
