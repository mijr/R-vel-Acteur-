// models/Appointment.js
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('découverte', 'suivi', 'coaching', 'formation'),
      allowNull: false,
    },
  });

  return Appointment;
};
