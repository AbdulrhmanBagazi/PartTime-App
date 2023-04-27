import { Request, Response } from 'express'

const Authenticate = async (req: Request, res: Response) => {
  try {
    const user = req.user

    return res.status(200).send({
      user: {
        id: user.id,
        email: user.email,
        verfied: user.verfied,
        Type: user.Type,
        Profile: user.Profile,
        verificationEmail: user.verificationEmail,
        AppleId: user?.AppleId
      }
    })
  } catch (e: unknown) {
    return res.sendStatus(500)
  }
}

export default Authenticate
