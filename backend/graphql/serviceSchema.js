const { gql } = require('apollo-server-express');

const serviceTypeDefs = gql`
  type Service {
    id: ID!
    title: String!
    description: String!
    category: String!
    methodology: String!
    targetAudience: [String!]!
    pricing: String!
    createdAt: String!
    updatedAt: String!
  }

  input ServiceInput {
    title: String!
    description: String!
    category: String!
    methodology: String!
    targetAudience: [String!]!
    pricing: String!
  }

  input ServiceUpdateInput {
    title: String
    description: String
    category: String
    methodology: String
    targetAudience: [String!]
    pricing: String
  }

  type Query {
    services: [Service!]!
    service(id: ID!): Service
  }

  type Mutation {
    addService(input: ServiceInput!): Service!
    updateService(id: ID!, input: ServiceUpdateInput!): Service!
    deleteService(id: ID!): Boolean!
  }
`;

module.exports = serviceTypeDefs;
