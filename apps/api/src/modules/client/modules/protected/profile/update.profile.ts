import { Context } from '../../../../../context'
import { updateUserProfile } from './types'
import gql from 'graphql-tag'

export const Update_Profile_TypeDefs = gql`
  type Query {
    test: String
  }
  type Mutation {
    Update_UserProfile(
      firstName: String
      lastName: String
      nationality: String
      nationalID: String
      dateOfBirth: String
      gender: String
    ): Profile
  }
`

export const Update_Profile_Mutation = {
  Update_UserProfile: async (
    _parent,
    args: updateUserProfile,
    context: Context
  ) => {
    const UpdateProfile = await context.prisma.profile.update({
      where: {
        userId: context.req.user.id
      },
      data: {
        firstName: args.firstName,
        lastName: args.lastName,
        nationality: args.nationality,
        nationalID: args.nationalID,
        dateOfBirth: args.dateOfBirth,
        gender: args.gender
      }
    })

    return UpdateProfile
  }
}
