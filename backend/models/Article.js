// models/article.js
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT
    },
    category: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM('TEXT', 'VIDEO', 'AUDIO'),
      allowNull: false
    },
    mediaUrl: {
      type: DataTypes.STRING
    },
    duration: {
      type: DataTypes.INTEGER // in seconds or minutes
    },
    theme: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATEONLY
    },
    allowDownload: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Article.associate = (models) => {
    Article.hasMany(models.Comment, {
      foreignKey: 'articleId',
      as: 'comments',
      onDelete: 'CASCADE'
    });
  };

  return Article;
};
