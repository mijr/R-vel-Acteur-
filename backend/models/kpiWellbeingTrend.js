module.exports = (sequelize, DataTypes) => {
  return sequelize.define('WellbeingTrend', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userid',  // colonne en base
    },
    weekLabel: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'weeklabel',  // colonne en base
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'createdat',
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updatedat',
    },
  }, {
    tableName: 'wellbeing_trends',
    timestamps: false, // car tu gères manuellement les champs createdAt/updatedAt
  });
};
