import { ApolloClient, InMemoryCache } from '@apollo/client'
//typedef
import { userDefInput } from './typeDefs'

const Client = new ApolloClient({
  uri: `${process.env.REACT_APP_API}/graphql/admin`,
  cache: new InMemoryCache(),
  credentials: 'include',
  typeDefs: [userDefInput],
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

export default Client

// Error('Unauthorized')
