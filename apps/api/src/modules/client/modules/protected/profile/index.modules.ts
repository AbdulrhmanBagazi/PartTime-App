import { Change_Password_Mutation, Change_Password_TypeDefs } from './changePassword';
import { Contact_Profile_Mutation, Contact_Profile_TypeDefs } from './contact';
import { Create_Profile_Mutation, Create_Profile_TypeDefs } from './create.profile';
import { Update_Profile_Mutation, Update_Profile_TypeDefs } from './update.profile';

// const Query = {  };

const Mutation = {
  ...Create_Profile_Mutation,
  ...Update_Profile_Mutation,
  ...Change_Password_Mutation,
  ...Contact_Profile_Mutation,
};

// const Resolver = {  };

const typeDef = [Create_Profile_TypeDefs, Update_Profile_TypeDefs, Change_Password_TypeDefs, Contact_Profile_TypeDefs];

export const Profile = {
  // Query,
  Mutation,
  // Resolver,
  typeDef,
};
