import { MyContext } from '../../../../../context'
import { updateUserProfile } from './types'
import gql from 'graphql-tag'

export const Update_Profile_TypeDefs = gql`
  type Query {
    test: String
  }
  type Mutation {
    Update_UserProfile(
      phone: String
      whatsapp: String
      about: String
      city: String
      education: String
      experiences: [JSON]
    ): Profile
  }

  scalar JSON
`

export const Update_Profile_Mutation = {
  Update_UserProfile: async (
    _parent: any,
    args: updateUserProfile,
    context: MyContext
  ) => {
    const CreateProfile = await context.prisma.profile.update({
      data: {
        phone: args.phone,
        whatsapp: args.whatsapp,
        about: args.about,
        city: args.city,
        education: args.education,
        experiences: args.experiences
      },
      where: {
        userId: context.req.user.id
      }
    })

    return CreateProfile
  }
}
