const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: Int!       # consistent with DB integer PK
    email: String!
    role: String!
    firstName: String
    lastName: String
    phone: String
  }
    
`;

module.exports = userTypeDefs;
