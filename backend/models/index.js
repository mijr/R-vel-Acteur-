const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, DataTypes);
const News = require('./News')(sequelize, DataTypes);
const Article = require('./Article')(sequelize, DataTypes);
const Testimonial = require('./Testimonial')(sequelize, DataTypes);
const WellbeingTrend = require('./kpiWellbeingTrend')(sequelize, DataTypes);
const RadarSkill = require('./kpiRadarSkill')(sequelize, DataTypes);
const KpiSummary = require('./kpiSummary')(sequelize, DataTypes);

// Associations
User.hasMany(WellbeingTrend, { foreignKey: 'userId', as: 'wellbeingTrends' });
WellbeingTrend.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(RadarSkill, { foreignKey: 'userId', as: 'radarSkills' });
RadarSkill.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(KpiSummary, { foreignKey: 'userId', as: 'kpiSummaries' });
KpiSummary.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const db = {
  sequelize,
  Sequelize,
  User,
  News,
  Article,
  Testimonial,
  WellbeingTrend,
  RadarSkill,
  KpiSummary,
};

module.exports = db;
