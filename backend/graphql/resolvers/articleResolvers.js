const { Article, Comment } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
  Query: {
    articles: async (_, args) => {
      const { keyword, category, type, theme } = args;

      const whereClause = {};

      if (keyword) {
        whereClause[Op.or] = [
          { title: { [Op.iLike]: `%${keyword}%` } },
          { content: { [Op.iLike]: `%${keyword}%` } },
        ];
      }

      if (category) whereClause.category = category;
      if (type) whereClause.type = type;
      if (theme) whereClause.theme = theme;

      return await Article.findAll({ where: whereClause });
    },

    article: async (_, { id }) => {
      return await Article.findByPk(id);
    }
  },

  Article: {
    comments: async (article) => {
      return await Comment.findAll({
        where: { articleId: article.id },
        order: [['date', 'DESC']],
      });
    }
  },

  Mutation: {
    createArticle: async (_, { input }) => {
      // Optionally validate or sanitize input here
      return await Article.create(input);
    },

    deleteArticle: async (_, { id }) => {
      const article = await Article.findByPk(id);
      if (!article) {
        // Return false or throw error if article not found
        return false;
      }
      await article.destroy();
      return true;
    },

    createComment: async (_, { input }) => {
      const { articleId, userName, message } = input;
      // Optionally validate input
      return await Comment.create({ articleId, userName, message });
    }
  }
};
