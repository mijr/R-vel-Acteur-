module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define('Coupon', {
    code: { type: DataTypes.STRING, unique: true, allowNull: false },
    type: { type: DataTypes.ENUM('FIXED', 'PERCENT'), allowNull: false },
    value: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    currency: { type: DataTypes.STRING, allowNull: false },
    expiration_date: { type: DataTypes.DATE, allowNull: false }
  }, {
    timestamps: true,
    tableName: 'Coupons'
  });

  return Coupon;
};
