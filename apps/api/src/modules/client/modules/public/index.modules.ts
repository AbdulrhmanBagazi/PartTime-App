import { Events } from './events/index.modules';
import { AppSection } from './app_section/index.modules';

export const PublicClientResolvers = {
  Query: {
    ...Events.Query,
    ...AppSection.Query,
  },
  // Mutation: {
  //   ...Posts.Mutation,
  // },
  ...Events.Resolver,
  ...AppSection.Resolver,
};
export const PublicClientTypeDefs = [Events.typeDef, AppSection.typeDef];
