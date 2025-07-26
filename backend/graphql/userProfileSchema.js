const { gql } = require('apollo-server-express');

module.exports = gql`

type UserProfile {
  id: Int!
  user_id: Int!
  currency: String
  profession: String
  weight: Float
  height: Float
  date_of_birth: String
  marital_status: String
  description: String
  age: Int
}

input UpdateUserProfileInput {
  currency: String
  profession: String
  weight: Float
  height: Float
  date_of_birth: String
  marital_status: String
  description: String
}

type Mutation {
  updateUserProfile(id: Int!, input: UpdateUserProfileInput!): UserProfile!
}
`;