import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  Create_UserProfile?: Maybe<Profile>;
};


export type MutationCreate_UserProfileArgs = {
  age: Scalars['String'];
  gender: Scalars['String'];
  name: Scalars['String'];
  nationalID: Scalars['String'];
  nationality: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  about?: Maybe<Scalars['String']>;
  age?: Maybe<Scalars['String']>;
  arabicVideo?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  degree?: Maybe<Scalars['String']>;
  englishVideo?: Maybe<Scalars['String']>;
  experiences?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  gender?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nationalID?: Maybe<Scalars['String']>;
  nationality?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId?: Maybe<Scalars['String']>;
  whatsapp?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  test?: Maybe<Scalars['String']>;
};

export type Create_UserProfileMutationVariables = Exact<{
  name: Scalars['String'];
  nationality: Scalars['String'];
  nationalID: Scalars['String'];
  age: Scalars['String'];
  gender: Scalars['String'];
}>;


export type Create_UserProfileMutation = { __typename?: 'Mutation', Create_UserProfile?: { __typename?: 'Profile', id?: string | null, createdAt?: any | null, updatedAt?: any | null, userId?: string | null, name?: string | null, nationality?: string | null, nationalID?: string | null, age?: string | null, gender?: string | null, city?: string | null, phone?: string | null, whatsapp?: string | null, about?: string | null, degree?: string | null, experiences?: Array<any | null> | null, arabicVideo?: string | null, englishVideo?: string | null } | null };


export const Create_UserProfileDocument = gql`
    mutation Create_UserProfile($name: String!, $nationality: String!, $nationalID: String!, $age: String!, $gender: String!) {
  Create_UserProfile(
    name: $name
    nationality: $nationality
    nationalID: $nationalID
    age: $age
    gender: $gender
  ) {
    id
    createdAt
    updatedAt
    userId
    name
    nationality
    nationalID
    age
    gender
    city
    phone
    whatsapp
    about
    degree
    experiences
    arabicVideo
    englishVideo
  }
}
    `;
export type Create_UserProfileMutationFn = Apollo.MutationFunction<Create_UserProfileMutation, Create_UserProfileMutationVariables>;

/**
 * __useCreate_UserProfileMutation__
 *
 * To run a mutation, you first call `useCreate_UserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreate_UserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserProfileMutation, { data, loading, error }] = useCreate_UserProfileMutation({
 *   variables: {
 *      name: // value for 'name'
 *      nationality: // value for 'nationality'
 *      nationalID: // value for 'nationalID'
 *      age: // value for 'age'
 *      gender: // value for 'gender'
 *   },
 * });
 */
export function useCreate_UserProfileMutation(baseOptions?: Apollo.MutationHookOptions<Create_UserProfileMutation, Create_UserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Create_UserProfileMutation, Create_UserProfileMutationVariables>(Create_UserProfileDocument, options);
      }
export type Create_UserProfileMutationHookResult = ReturnType<typeof useCreate_UserProfileMutation>;
export type Create_UserProfileMutationResult = Apollo.MutationResult<Create_UserProfileMutation>;
export type Create_UserProfileMutationOptions = Apollo.BaseMutationOptions<Create_UserProfileMutation, Create_UserProfileMutationVariables>;