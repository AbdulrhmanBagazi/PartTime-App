import { Request, Response } from 'express';

const Authenticate = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    return res.status(200).send({
      user: {
        email: user.email,
        verfied: user.verfied,
        Type: user.Type,
        Profile: user.Profile,
        verificationEmail: user.verificationEmail,
      },
    });
  } catch (e: unknown) {
    return res.sendStatus(500);
  }
};

export default Authenticate;
