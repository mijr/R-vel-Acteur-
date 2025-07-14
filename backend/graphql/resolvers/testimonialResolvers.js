const { Testimonial } = require('../../models');

module.exports = {
  Query: {
    testimonials: async () => {
      return await Testimonial.findAll();
    },
  },
  Mutation: {
    createTestimonial: async (_, { input }) => {
      return await Testimonial.create(input);
    },
  },
};
