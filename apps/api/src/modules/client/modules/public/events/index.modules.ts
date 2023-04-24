import { getOne_Events_Query, getOne_Events_TypeDefs } from './getOne/getOne.events';
import { list_Events_Query, list_Events_Resolver, list_Events_TypeDefs } from './list/events.list';

const Query = { ...list_Events_Query, ...getOne_Events_Query };

// const Mutation = { ...Create_Posts_Mutation };

const Resolver = { ...list_Events_Resolver };

const typeDef = [list_Events_TypeDefs, getOne_Events_TypeDefs];

export const Events = {
  Query,
  // Mutation,
  Resolver,
  typeDef,
};
