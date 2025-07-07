const { News } = require('../../models');

module.exports = {
  Query: {
    newsList: async () => {
      return await News.findAll({ order: [['createdAt', 'DESC']] });
    },
  },

  Mutation: {
    createNews: async (_, { input }, { user }) => {
      // Optional: add authentication check if needed, e.g.
       if (!user || user.role !== 'admin') throw new Error('Unauthorized');

      const news = await News.create({
        title: input.title,
        date: input.date,
        description: input.description,
        type: input.type,
        image: input.image || null,
      });

      return news;
    },
  },
};
