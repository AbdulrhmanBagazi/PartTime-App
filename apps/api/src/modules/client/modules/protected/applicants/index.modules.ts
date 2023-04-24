import { list_Applicants_Query, list_Applicants_TypeDefs, list_Applicants_Resolver } from './list/list.applicants';

const Query = {
  ...list_Applicants_Query,
};

// const Mutation = { ...Update_Events_Mutation, ...Create_Event_Mutation };

const Resolver = { ...list_Applicants_Resolver };

const typeDef = [list_Applicants_TypeDefs];

export const Applicants = {
  Query,
  // Mutation,
  Resolver,
  typeDef,
};
