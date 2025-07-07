const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    email: String!
    role: String!
    firstName: String
    lastName: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input UpdateUserInput {
    email: String
    firstName: String
    lastName: String
    role: String
  }

  type Query {
    me: User
    users: [User!]!
  }

  type Mutation {
    signup(email: String!, password: String!, firstName: String!, lastName: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    requestPasswordReset(email: String!): String
    resetPassword(token: String!, newPassword: String!): String



    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean
   changePassword(currentPassword: String!, newPassword: String!): String
  }
`;
