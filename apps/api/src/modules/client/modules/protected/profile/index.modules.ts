import {
  Create_Profile_Mutation,
  Create_Profile_TypeDefs
} from './create.profile'

// const Query = {  };

const Mutation = {
  ...Create_Profile_Mutation
}

// const Resolver = {  };

const typeDef = [Create_Profile_TypeDefs]

export const Profile = {
  // Query,
  Mutation,
  // Resolver,
  typeDef
}
