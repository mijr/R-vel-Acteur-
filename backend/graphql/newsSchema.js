// graphql/newsSchema.js
const { gql } = require('apollo-server-express');

const newsSchema = gql`
  type News {
    id: ID!
    title: String!
    date: String!
    description: String!
    type: String!
    image: String
  }

  type Query {
    newsList: [News!]!
  }

  input CreateNewsInput {
    title: String!
    date: String!
    description: String!
    type: String!
    image: String
  }

  type Mutation {
    createNews(input: CreateNewsInput!): News!
  }
`;

module.exports = newsSchema;
