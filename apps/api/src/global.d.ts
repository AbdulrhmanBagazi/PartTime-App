import 'express'
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
        email: string
        verificationEmail: Date
        verfied: boolean
        Type: string
        Profile: userProfileType
        AppleId?: string
      }
    }
  }
}
