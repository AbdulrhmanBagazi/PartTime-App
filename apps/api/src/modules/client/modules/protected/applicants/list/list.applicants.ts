import { Context } from '../../../../../../context';
import { applicantsFilterType, Order } from '../types';
import { gql } from 'apollo-server';

export const list_Applicants_TypeDefs = gql`
  type Query {
    applicants_list(page: Int, perPage: Int, sortOrder: Order, filter: Filters): [Applicants!]!
    applicants_list_meta: ListMetadata
  }

  type ListMetadata {
    total: Int!
  }

  input Filters {
    status: Applicants_Status
  }

  type Applicants {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    eventId: String!
    companyId: String!
    userId: String!
    shiftId: String!
    jobId: String!
    name: String!
    nationality: String!
    nationalID: String!
    dateOfBirth: String!
    gender: String!
    status: Applicants_Status!
    event: event!
    company: company
    shift: shift!
    job: job!
    # new
    start_date: DateTime!
  }

  type event {
    title: String!
    title_en: String!
    image_url: String!
    content: String!
    content_en: String!
  }

  type company {
    name: String!
    logo_url: String
  }

  type shift {
    start_time: String!
    end_time: String!
  }

  type job {
    title: String!
    title_en: String!
    rate: Int!
    rate_type: Rate_type!
  }

  enum Rate_type {
    MONTHLY
    DAY
  }

  enum Order {
    desc
    asc
  }

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

  scalar DateTime
`;

export const list_Applicants_Query = {
  applicants_list: async (
    _parent,
    args: { page: number; perPage: number; sortOrder: Order; filter: applicantsFilterType },
    context: Context,
  ) => {
    const order = args.sortOrder;

    const data = await context.prisma.applicants.findMany({
      skip: args.page * args.perPage,
      take: args.perPage,
      orderBy: {
        createdAt: order,
      },
      where: {
        status: args.filter?.status,
        userId: context.req.user.id,
      },
      include: {
        company: true,
        Event: true,
        job: true,
        shift: true,
      },
    });
    // throw Error;
    return data;
  },
  applicants_list_meta: async (_parent, args: { filter: applicantsFilterType }, context: Context) => {
    const cal = await context.prisma.applicants.aggregate({
      where: {
        status: args.filter?.status,
        userId: context.req.user.id,
      },
      _count: {
        id: true,
      },
    });

    const count = cal._count.id;

    return { count };
  },
};

export const list_Applicants_Resolver = {
  Applicants: {
    event: async (parent: applicantsFilterType, _args, context: Context) => {
      const event = await context.prisma.events.findFirst({
        where: { id: parent.eventId },
      });

      return {
        title: event?.title,
        title_en: event?.title_en,
        image_url: event?.image_url,
        content: event?.content,
        content_en: event?.content_en,
      };
    },
    company: async (parent: applicantsFilterType, _args, context: Context) => {
      const company = await context.prisma.companies.findFirst({
        where: { id: parent.companyId },
      });

      return {
        name: company?.name,
        logo_url: company?.logo_url,
      };
    },
    shift: async (parent: applicantsFilterType, _args, context: Context) => {
      const shift = await context.prisma.event_Shifts.findFirst({
        where: { id: parent.shiftId },
      });

      return {
        start_time: shift?.start_time,
        end_time: shift?.end_time,
      };
    },
    job: async (parent: applicantsFilterType, _args, context: Context) => {
      const job = await context.prisma.event_Jobs.findFirst({
        where: { id: parent.jobId },
      });

      return {
        title: job?.title,
        title_en: job?.title_en,
        rate: job?.rate,
        rate_type: job?.rate_type,
      };
    },
  },
};
