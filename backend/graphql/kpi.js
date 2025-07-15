const { gql } = require('apollo-server-express');
const userTypeDefs = require('./userTypeDefs');

const typeDefs = gql`
  ${userTypeDefs}

  type WellbeingTrend {
    id: ID!
    userId: Int!
    weekLabel: String!
    value: Float!
    createdAt: String
    updatedAt: String
  }

  type RadarSkill {
    id: ID!
    userId: Int!
    period: String!
    subject: String!
    value: Int!
    createdAt: String
    updatedAt: String
  }

  type KpiSummary {
    id: ID!
    userId: Int!
    period: String!
    summary: String!
    createdAt: String
    updatedAt: String
  }

  input RadarSkillInput {
    subject: String!
    value: Int!
  }

  type Query {
    wellbeingTrend(userId: Int!): [WellbeingTrend!]!
    radarSkills(userId: Int!, period: String!): [RadarSkill!]!
    kpiSummary(userId: Int!, period: String!): KpiSummary
  }

  type Mutation {
    addWellbeingTrend(userId: Int!, weekLabel: String!, value: Float!): WellbeingTrend!
    addRadarSkills(userId: Int!, period: String!, data: [RadarSkillInput!]!): [RadarSkill!]!
    addKpiSummary(userId: Int!, period: String!, summary: String!): KpiSummary!
    deleteWellbeingTrend(id: ID!): Boolean!
    deleteRadarSkill(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
