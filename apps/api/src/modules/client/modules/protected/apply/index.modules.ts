// const Query = {  };

import { Create_Applicants_Mutation, Create_Applicants_TypeDefs } from './apply.create';

const Mutation = {
  ...Create_Applicants_Mutation,
};

// const Resolver = {  };

const typeDef = [Create_Applicants_TypeDefs];

export const Apply = {
  // Query,
  Mutation,
  // Resolver,
  typeDef,
};
