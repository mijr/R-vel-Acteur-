const { gql } = require('apollo-server-express');

const newsSchema = gql`
  type News {
    id: ID!
    title: String!
    date: String!
    description: String!
    type: String!
    image: String
    featured: Boolean!
  }

  input CreateNewsInput {
    title: String!
    date: String!
    description: String!
    type: String!
    image: String
    featured: Boolean
  }

  input UpdateNewsInput {
    id: ID!
    title: String
    date: String
    description: String
    type: String
    image: String
    featured: Boolean
  }

  type Query {
    newsList: [News!]!
    news(id: ID!): News
  }

  type Mutation {
    createNews(input: CreateNewsInput!): News!
    updateNews(input: UpdateNewsInput!): News!
    deleteNews(id: ID!): Boolean!
  }
`;

module.exports = newsSchema;
