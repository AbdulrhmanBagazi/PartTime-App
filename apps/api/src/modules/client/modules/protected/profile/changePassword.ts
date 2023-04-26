import { Context } from '../../../../../context'
import gql from 'graphql-tag'
import { HashPassword } from '../../../routes/authentication/index.utils'

export const Change_Password_TypeDefs = gql`
  type Query {
    test: String
  }
  type Mutation {
    Change_Password(password: String): Profile
  }
`

export const Change_Password_Mutation = {
  Change_Password: async (
    _parent: any,
    args: { password: string },
    context: Context
  ) => {
    const hash = await HashPassword(args.password)

    const Change_Password = await context.prisma.user.update({
      where: {
        id: context.req.user.id
      },
      data: {
        password: hash
      }
    })

    return Change_Password ? true : false
  }
}
