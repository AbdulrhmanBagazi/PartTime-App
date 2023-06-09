import { gql } from '@apollo/client'

export const userDefInput = gql`
  input Filters {
    email: String
    verfied: Boolean
    suspended: Boolean
    published: Boolean
    locationId: String
  }
`
