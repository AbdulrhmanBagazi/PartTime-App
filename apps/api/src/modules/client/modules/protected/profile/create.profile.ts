import { MyContext } from '../../../../../context'
import { createUserProfile } from './types'
import gql from 'graphql-tag'

export const Create_Profile_TypeDefs = gql`
  type Query {
    test: String
  }
  type Mutation {
    Create_UserProfile(
      name: String!
      nationality: String!
      nationalID: String!
      age: String!
      gender: String!
    ): Profile
  }

  type Profile {
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    userId: String
    name: String
    nationality: String
    nationalID: String
    age: String
    gender: String
    city: String
    phone: String
    whatsapp: String
    about: String
    education: String
    experiences: [JSON]
    arabicVideo: String
    englishVideo: String
  }

  scalar DateTime
  scalar JSON
`

export const Create_Profile_Mutation = {
  Create_UserProfile: async (
    _parent: any,
    args: createUserProfile,
    context: MyContext
  ) => {
    const CreateProfile = await context.prisma.profile.create({
      data: {
        userId: context.req.user.id,
        name: args.name,
        nationality: args.nationality,
        nationalID: args.nationalID,
        age: args.age,
        gender: args.gender
      }
    })

    return CreateProfile
  }
}
