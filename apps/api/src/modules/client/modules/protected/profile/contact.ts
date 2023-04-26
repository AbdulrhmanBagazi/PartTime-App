import { Context } from '../../../../../context'
import { updateUserProfile } from './types'
import gql from 'graphql-tag'

export const Contact_Profile_TypeDefs = gql`
  type Query {
    test: String
  }
  type Mutation {
    Contact_UserProfile(phone: String, whatsapp: String): Profile
  }
`

export const Contact_Profile_Mutation = {
  Contact_UserProfile: async (
    _parent,
    args: updateUserProfile,
    context: Context
  ) => {
    const addContactProfile = await context.prisma.profile.update({
      where: {
        userId: context.req.user.id
      },
      data: {
        phone: args.phone,
        whatsapp: args.whatsapp
      }
    })

    return addContactProfile
  }
}
