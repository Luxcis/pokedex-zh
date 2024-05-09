import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://beta.pokeapi.co/graphql/v1beta',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }),
  cache: new InMemoryCache()
})

export default client
