const { gql } = require('apollo-server-express');
const userTypeDefs = require('./userTypeDefs');

module.exports = gql`
   ${userTypeDefs}

  type AuthPayload {
    token: String!
    user: User!
  }

  input UpdateUserInput {
    email: String
    firstName: String
    lastName: String
     phone: String
    role: String
  }

  type Query {
    me: User
    users: [User!]!
  }

   type Query {
    _empty: String
  }


  type Mutation {
    signup(email: String!, password: String!, firstName: String!, lastName: String!,  phone: String): AuthPayload
    login(email: String!, password: String!): AuthPayload
    requestPasswordReset(email: String!): String
     resetPasswordWithOTP(email: String!, otpCode: String!, newPassword: String!): String
    resetPassword(token: String!, newPassword: String!): String



    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): Boolean
   changePassword(currentPassword: String!, newPassword: String!): String
  }

    type Mutation {
    _empty: String
  }
`;
