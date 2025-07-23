const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Service extends Model {}

  Service.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      methodology: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      targetAudience: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        field: 'target_audience',
      },
      pricing: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Service',
      tableName: 'services',
      underscored: true,
      timestamps: true,
    }
  );

  return Service;
};
