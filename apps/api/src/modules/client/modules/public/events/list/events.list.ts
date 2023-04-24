import { Context } from '../../../../../../context';
import { gql } from 'apollo-server';
import { eventType, Order } from '../types';

export const list_Events_TypeDefs = gql`
  type Query {
    Events_list(page: Int, perPage: Int, sortOrder: Order, app_sectionId: String!): [Events!]!
    Events_list_meta(app_sectionId: String): ListMetadata
  }

  type ListMetadata {
    total: Int!
  }

  type Events {
    id: String!
    published: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    companyId: String!
    locationId: String!
    title: String!
    content: String!
    title_en: String!
    content_en: String!
    image_url: String!
    location_url: String!
    status: EventStatus!
    companyLogo: String
    app_sectionId: String!
    Location: Location!
    Event_Jobs: [eventjob!]!
    Event_Shifts: [eventshift!]!
    details: [JSON!]!
    details_en: [JSON!]!
    eventcalendar: [String!]!
  }

  type Location {
    title: String!
    title_en: String!
  }

  enum Order {
    desc
    asc
  }

  enum EventStatus {
    SOON
    ACTIVE
    COMPLETED
  }

  type eventjob {
    id: String!
    title: String!
    title_en: String!
    status: Event_JobsStatus!
    rate: Int!
    rate_type: Rate_type!
    eventId: String!
  }

  type eventshift {
    id: String!
    start_time: String!
    end_time: String!
    status: Event_JobsStatus!
    eventId: String!
  }

  enum Event_JobsStatus {
    CLOSED
    OPEN
  }

  enum Rate_type {
    MONTHLY
    DAY
  }

  scalar DateTime
  scalar JSON
`;

export const list_Events_Query = {
  Events_list: async (
    _parent,
    args: { page: number; perPage: number; sortOrder: Order; app_sectionId: string },
    context: Context,
  ) => {
    const order = args.sortOrder;

    const data = await context.prisma.events.findMany({
      skip: args.page * args.perPage,
      take: args.perPage,
      orderBy: {
        createdAt: order,
      },
      where: {
        published: true,
        app_sectionId: args.app_sectionId,
        details: {
          isEmpty: false,
        },
        details_en: {
          isEmpty: false,
        },
      },
      include: {
        Event_Jobs: true,
        Event_Shifts: true,
      },
    });
    return data;
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  Events_list_meta: async (_parent, args: { app_sectionId: string }, context: Context) => {
    const cal = await context.prisma.events.aggregate({
      _count: {
        id: true,
      },
      where: {
        published: true,
        app_sectionId: args.app_sectionId,
        details: {
          isEmpty: false,
        },
        details_en: {
          isEmpty: false,
        },
      },
    });

    const total = cal._count.id;

    return { total };
  },
};

export const list_Events_Resolver = {
  Events: {
    companyLogo: async (parent: eventType, _args, context: Context) => {
      const Logo = await context.prisma.companies.findFirst({
        where: { id: parent.companyId },
      });

      return Logo?.logo_url;
    },
    Location: async (parent: eventType, _args, context: Context) => {
      const Location = await context.prisma.location.findFirst({
        where: { id: parent.locationId },
      });

      return {
        title: Location?.title,
        title_en: Location?.title_en,
      };
    },
  },
};
