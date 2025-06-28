// graphql/resolvers/index.js
const authResolvers = require('./authResolvers');
const appointmentResolvers = require('./appointmentResolvers');

module.exports = {
  Query: {
    ...authResolvers.Query,
    ...appointmentResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...appointmentResolvers.Mutation,
  },
};
