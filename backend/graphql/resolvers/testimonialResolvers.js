const { Testimonial } = require('../../models');

module.exports = {
  Query: {
    testimonials: async () => Testimonial.findAll(),
  },
  Mutation: {
    createTestimonial: async (_, { input }) => Testimonial.create(input),
  },
};
