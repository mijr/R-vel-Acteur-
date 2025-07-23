const { gql } = require('apollo-server-express');

module.exports = gql`
  type Testimonial {
    id: ID!
    name: String!
    role: String
    organization: String
    quote: String!
    serviceCategory: String!
    rating: Int!
  }

  input TestimonialInput {
    name: String!
    role: String
    organization: String
    quote: String!
    serviceCategory: String!
    rating: Int!
  }

  extend type Query {
    testimonials: [Testimonial!]!
  }

  extend type Mutation {
    createTestimonial(input: TestimonialInput!): Testimonial!
  }
`;
