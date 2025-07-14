module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Testimonial', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
    },
    organization: {
      type: DataTypes.STRING,
    },
    quote: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    typeDePrestation: {
      type: DataTypes.STRING,
    }
  });
};
