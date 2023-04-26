import gql from 'graphql-tag'
import { SectionType } from '../types'
import { Context } from '../../../../../../context'

export const list_app_section_TypeDefs = gql`
  type Query {
    app_section_list: [app_section!]!
  }

  type ListMetadata {
    count: Int!
  }

  input Filters {
    published: Boolean
  }

  type app_section {
    id: String!
    title: String!
    title_en: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    published: Boolean!
    count: Int!
  }

  scalar DateTime
`

export const list_app_section_Query = {
  app_section_list: async (_parent, _args, context: Context) => {
    const data = await context.prisma.app_section.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        published: true
      }
    })
    return data
  }
}

export const list_app_section_Resolver = {
  app_section: {
    count: async (parent: SectionType, _args, context: Context) => {
      return context.prisma.events.count({
        where: {
          published: true,
          app_sectionId: parent.id,
          details: {
            isEmpty: false
          },
          details_en: {
            isEmpty: false
          }
        }
      })
    }
  }
}
