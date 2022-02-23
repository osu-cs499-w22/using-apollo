const { ApolloClient, gql, InMemoryCache } = require('@apollo/client');
const fetch = require('isomorphic-unfetch');

const token = process.env.REACT_APP_NOT_SECRET_GITHUB_TOKEN;

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization:  `Bearer ${token}`
  },
  fetch: fetch,
  cache: new InMemoryCache()
});

const query = gql`{
  user(login: "robwhess") {
    name
    url
    avatarUrl(size: 96)
  }
}`;

client.query({ query: query })
  .then(result => console.log(result));
