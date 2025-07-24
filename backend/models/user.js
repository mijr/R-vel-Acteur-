module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    resetToken: DataTypes.STRING,
    resetTokenExpiry: DataTypes.DATE,
    otpCode: DataTypes.STRING,
    otpExpiry: DataTypes.DATE,
  });
};
