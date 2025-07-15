const { User, WellbeingTrend, RadarSkill, KpiSummary } = require('../../models');

function requireAdmin(user) {
  if (!user || user.role !== 'admin') throw new Error('Forbidden');
}

function requireSelfOrAdmin(requestingUser, targetUserId) {
  if (!requestingUser || (requestingUser.id !== targetUserId && requestingUser.role !== 'admin')) {
    throw new Error('Forbidden');
  }
}

const resolvers = {
  Query: {
    wellbeingTrend: async (_, { userId }, { user }) => {
      requireSelfOrAdmin(user, userId);
      return WellbeingTrend.findAll({
        where: { userId },
        order: [['weekLabel', 'ASC']],
      });
    },
    radarSkills: async (_, { userId, period }, { user }) => {
      requireSelfOrAdmin(user, userId);
      return RadarSkill.findAll({
        where: { userId, period },
      });
    },
    kpiSummary: async (_, { userId, period }, { user }) => {
      requireSelfOrAdmin(user, userId);
      return KpiSummary.findOne({
        where: { userId, period },
        order: [['createdAt', 'DESC']],
      });
    },
  },
  Mutation: {
    addWellbeingTrend: async (_, { userId, weekLabel, value }, { user }) => {
      requireAdmin(user);
      return WellbeingTrend.create({ userId, weekLabel, value });
    },
    addRadarSkills: async (_, { userId, period, data }, { user }) => {
      requireAdmin(user);
      const records = data.map(({ subject, value }) => ({ userId, period, subject, value }));
      return RadarSkill.bulkCreate(records);
    },
    addKpiSummary: async (_, { userId, period, summary }, { user }) => {
      requireAdmin(user);
      return KpiSummary.create({ userId, period, summary });
    },
    deleteWellbeingTrend: async (_, { id }, { user }) => {
      requireAdmin(user);
      await WellbeingTrend.destroy({ where: { id } });
      return true;
    },
    deleteRadarSkill: async (_, { id }, { user }) => {
      requireAdmin(user);
      await RadarSkill.destroy({ where: { id } });
      return true;
    },
  },
};

module.exports = resolvers;
