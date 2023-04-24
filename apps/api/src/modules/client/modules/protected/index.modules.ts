import { Profile } from '../protected/profile/index.modules';
import { Applicants } from './applicants/index.modules';
import { Apply } from './apply/index.modules';

export const ClientResolvers = {
  Query: {
    ...Applicants.Query,
  },
  Mutation: {
    ...Profile.Mutation,
    ...Apply.Mutation,
  },
  // ...Posts.Resolver,
  ...Applicants.Resolver,
};
export const ClientTypeDefs = [Profile.typeDef, Apply.typeDef, Applicants.typeDef];
