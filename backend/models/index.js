// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, DataTypes);
const Appointment = require('./Appointment')(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize,
  User,
  Appointment,
};

module.exports = db;
