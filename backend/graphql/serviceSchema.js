const { gql } = require('apollo-server-express');

const serviceTypeDefs = gql`
  type Service {
    id: ID!
    title: String!
    description: String!
    category: String!
    methodology: String!
    targetAudience: [String!]!
    pricing: [GeoPrice!]!
    billingMode: BillingMode!
    couponRules: CouponRules
    createdAt: String!
    updatedAt: String!
  }

  type GeoPrice {
    region: String!        # "africa", "europe", "asia", etc.
    amount: Float!
    currency: String!
  }

  type BillingMode {
    type: String!          # "one-time", "subscription", "installment"
    periodicity: String    # "monthly", "yearly", etc. for subscriptions
    installments: Int      # for installment plans
    expiration: String     # date when billing mode expires
    rules: String          # custom rules
  }

  input ServiceInput {
    title: String!
    description: String!
    category: String!
    methodology: String!
    targetAudience: [String!]!
    pricing: [GeoPriceInput!]!
    billingMode: BillingModeInput!
    couponRules: CouponRulesInput
  }

  input GeoPriceInput {
    region: String!
    amount: Float!
    currency: String!
  }

  input BillingModeInput {
    type: String!
    periodicity: String
    installments: Int
    expiration: String
    rules: String
  }

  type CouponRules {
    allowed: Boolean
    maxDiscount: Float
    combinable: Boolean
  }

  input CouponRulesInput {
    allowed: Boolean
    maxDiscount: Float
    combinable: Boolean
  }

  input ServiceUpdateInput {
    title: String
    description: String
    category: String
    methodology: String
    targetAudience: [String!]
    pricing: String
  }

  #  NEW: Represents discounted price per region
  type DiscountedPrice {
    region: String!
    originalPrice: Float!
    discountedPrice: Float!
    currency: String!
  }

  # Updated to support multiple regions with discount
  type ServiceWithCoupon {
    service: Service!
    appliedCoupon: String!
    prices: [DiscountedPrice!]!
  }

  type Query {
    services: [Service!]!
    service(id: ID!): Service
    serviceWithCoupon(id: ID!, couponCode: String): ServiceWithCoupon
  }

  type Mutation {
    addService(input: ServiceInput!): Service!
    applyCouponToService(serviceId: ID!, couponCode: String!): ServiceWithCoupon!
    updateService(id: ID!, input: ServiceUpdateInput!): Service!
    deleteService(id: ID!): Boolean!
  }
`;

module.exports = serviceTypeDefs;
