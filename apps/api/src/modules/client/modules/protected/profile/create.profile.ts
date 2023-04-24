import { Context } from '../../../../../context';
import { createUserProfile } from './types';
import { gql } from 'apollo-server';

export const Create_Profile_TypeDefs = gql`
  type Query {
    test: String
  }
  type Mutation {
    Create_UserProfile(
      firstName: String
      lastName: String
      nationality: String
      nationalID: String
      dateOfBirth: String
      gender: String
    ): Profile
  }

  type Profile {
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    userId: String
    firstName: String
    lastName: String
    nationality: String
    nationalID: String
    dateOfBirth: String
    gender: String
    whatsapp: String
    phone: String
  }

  scalar DateTime
`;

export const Create_Profile_Mutation = {
  Create_UserProfile: async (_parent, args: createUserProfile, context: Context) => {
    const CreateProfile = await context.prisma.profile.create({
      data: {
        firstName: args.firstName,
        lastName: args.lastName,
        nationality: args.nationality,
        nationalID: args.nationalID,
        dateOfBirth: args.dateOfBirth,
        gender: args.gender,
        userId: context.req.user.id,
      },
    });

    return CreateProfile;
  },
};
