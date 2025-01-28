import { ApolloClient, InMemoryCache } from '@apollo/client'
import { CONTENTFUL_GRAPHQL_ENDPOINT } from './constants'

export const createApolloClient = () => {
  return new ApolloClient({
    uri: CONTENTFUL_GRAPHQL_ENDPOINT,
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_CDA_ACCESS_TOKEN}`
    },
    cache: new InMemoryCache()
  })
}
