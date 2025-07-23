module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Testimonial', {
    name: { type: DataTypes.STRING, allowNull: false },
    role: DataTypes.STRING,
    organization: DataTypes.STRING,
    quote: { type: DataTypes.TEXT, allowNull: false },
    serviceCategory: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
  });
};
