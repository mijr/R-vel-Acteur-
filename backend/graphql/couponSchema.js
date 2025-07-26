const { gql } = require('apollo-server-express');

module.exports = gql`

type Coupon {
  id: ID!
  code: String!
  type: String!
  value: Float!
  currency: String!
  expiration_date: String!
  created_at: String
  updated_at: String
}

input CreateCouponInput {
  code: String!
  type: String!
  value: Float!
  currency: String!
  expiration_date: String!
}

input UpdateCouponInput {
  id: ID!
  code: String
  type: String
  value: Float
  currency: String
  expiration_date: String
}

type Query {
  getCoupons: [Coupon]
  getCoupon(id: ID!): Coupon
}

type Mutation {
  createCoupon(input: CreateCouponInput!): Coupon
  updateCoupon(input: UpdateCouponInput!): Coupon
  deleteCoupon(id: ID!): Boolean
}
`;