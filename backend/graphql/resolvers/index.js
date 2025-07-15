// graphql/resolvers/index.js
const authResolvers = require('./authResolvers');
const appointmentResolvers = require('./appointmentResolvers');
const testimonialResolvers = require('./testimonialResolvers'); // <-- ton resolver témoignages
const articleResolvers = require('./articleResolvers');
module.exports = {
  Query: {
    ...authResolvers.Query,
    ...appointmentResolvers.Query,
    ...testimonialResolvers.Query,  // <-- ajouté ici
    ...articleResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...appointmentResolvers.Mutation,
    ...testimonialResolvers.Mutation,  // <-- ajouté ici
    ...articleResolvers.Mutation,
  },
};
