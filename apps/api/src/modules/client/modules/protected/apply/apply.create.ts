import { Context } from '../../../../../context'
import gql from 'graphql-tag'
import { createApplicants } from './types'

export const Create_Applicants_TypeDefs = gql`
  type Query {
    test: String
  }
  type Mutation {
    Create_Applicants(
      eventId: String!
      companyId: String!
      shiftId: String!
      jobId: String!
      name: String!
      nationality: String!
      nationalID: String!
      dateOfBirth: String!
      gender: String!
    ): Create_ApplicantsResult
  }

  union Create_ApplicantsResult =
      Applicants
    | CreateApplicantsExsist
    | CreateApplicantsUnknown

  enum Applicants_Status {
    CANCELED
    DECLINED
    WAITLIST
    PENDING
    INTERVIEW
    APPROVED
    COMPLETED
    INACTIVE
  }

  type Applicants {
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    eventId: String
    companyId: String
    userId: String
    shiftId: String
    jobId: String
    name: String
    nationality: String
    nationalID: String
    dateOfBirth: String
    gender: String
    status: Applicants_Status
  }

  type CreateApplicantsExsist {
    message: String!
  }

  type CreateApplicantsUnknown {
    message: String!
  }

  scalar DateTime
`

export const Create_Applicants_Mutation = {
  Create_Applicants: async (
    _parent: any,
    args: createApplicants,
    context: Context
  ) => {
    try {
      const check = await context.prisma.applicants.findFirst({
        where: {
          userId: context.req.user.id,
          eventId: args.eventId
        }
      })

      if (check) {
        return {
          __typename: 'CreateApplicantsExsist',
          message: 'exsist'
        }
      }

      const Create_Applicants = await context.prisma.applicants.create({
        data: {
          userId: context.req.user.id,
          companyId: args.companyId,
          eventId: args.eventId,
          shiftId: args.shiftId,
          jobId: args.jobId,
          name: args.name,
          nationality: args.nationality,
          nationalID: args.nationalID,
          dateOfBirth: args.dateOfBirth,
          gender: args.gender
        }
      })

      return { __typename: 'Applicants', ...Create_Applicants }
    } catch (e) {
      return {
        __typename: 'CreateApplicantsUnknown',
        message: 'unknown error'
      }
    }
  }
}
