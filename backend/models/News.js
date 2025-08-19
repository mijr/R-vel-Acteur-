module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    title: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    featured: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'News'
  });

  return News;
};
