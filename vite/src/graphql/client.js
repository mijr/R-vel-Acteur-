// src/graphql/client.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Lien vers ton backend GraphQL
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql'
});

// Middleware pour injecter le token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token'); // ou sessionStorage selon ton app
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

// Création du client Apollo avec auth
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
