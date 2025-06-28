const { gql } = require('apollo-server-express');

module.exports = gql`
  type Appointment {
    id: ID!
    email: String!
    dateTime: String!
    type: String!
    createdAt: String!
    updatedAt: String!
  }

  input AppointmentInput {
    email: String!
    dateTime: String!
    type: String!
  }

  extend type Query {
    getAppointments(email: String!): [Appointment]
  }

  extend type Mutation {
    createAppointment(input: AppointmentInput!): Appointment
  }
`;
