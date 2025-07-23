// graphql/resolvers/index.js
const authResolvers = require('./authResolvers');
const appointmentResolvers = require('./appointmentResolvers');
const testimonialResolvers = require('./testimonialResolvers'); // <-- ton resolver témoignages
const articleResolvers = require('./articleResolvers');
const serviceResolvers = require('./serviceResolvers'); // <-- ton resolver services
module.exports = {
  Query: {
    ...authResolvers.Query,
    ...appointmentResolvers.Query,
    ...testimonialResolvers.Query,  // <-- ajouté ici
    ...articleResolvers.Query,
    ...serviceResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...appointmentResolvers.Mutation,
    ...testimonialResolvers.Mutation,  // <-- ajouté ici
    ...articleResolvers.Mutation,
    ...serviceResolvers.Mutation, // <-- ajouté ici
  },
};
