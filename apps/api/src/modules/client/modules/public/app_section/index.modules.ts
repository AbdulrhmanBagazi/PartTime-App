import { list_app_section_Query, list_app_section_TypeDefs, list_app_section_Resolver } from './list/list.app_section';

const Query = { ...list_app_section_Query };

// const Mutation = { ...Create_Posts_Mutation };

const Resolver = { ...list_app_section_Resolver };

const typeDef = [list_app_section_TypeDefs];

export const AppSection = {
  Query,
  // Mutation,
  Resolver,
  typeDef,
};
