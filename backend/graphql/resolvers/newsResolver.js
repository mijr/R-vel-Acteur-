const { News } = require('../../models');

module.exports = {
  Query: {
    newsList: async () => {
      return await News.findAll({ order: [['createdAt', 'DESC']] });
    },
    news: async (_, { id }) => {
      return await News.findByPk(id);
    },
  },

  Mutation: {
    createNews: async (_, { input }, { user }) => {
      if (!user || user.role !== 'admin') throw new Error('Unauthorized');

      return await News.create({
        title: input.title,
        date: input.date,
        description: input.description,
        type: input.type,
        image: input.image || null,
        featured: input.featured ?? false,
      });
    },

    updateNews: async (_, { input }, { user }) => {
      if (!user || user.role !== 'admin') throw new Error('Unauthorized');

      const news = await News.findByPk(input.id);
      if (!news) throw new Error('News not found');

      await news.update({
        title: input.title ?? news.title,
        date: input.date ?? news.date,
        description: input.description ?? news.description,  // fixed from input.content
        type: input.type ?? news.type,
        image: input.image ?? news.image,
        featured: input.featured ?? news.featured,
      });

      return news;
    },

    deleteNews: async (_, { id }, { user }) => {
      if (!user || user.role !== 'admin') throw new Error('Unauthorized');

      const news = await News.findByPk(id);
      if (!news) throw new Error('News not found');

      await news.destroy();
      return true;
    },
  },
};
