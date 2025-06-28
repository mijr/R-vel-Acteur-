// graphql/appointmentResolvers.js
const { Appointment } = require('../../models'); // ✅ Corrigé


module.exports = {
  Query: {
    getAppointments: async (_, { email }) => {
      return await Appointment.findAll({
        where: { email },
        order: [['dateTime', 'DESC']],
      });
    },
  },

  Mutation: {
    createAppointment: async (_, { input }) => {
      const { email, dateTime, type } = input;

      const conflict = await Appointment.findOne({ where: { dateTime } });
      if (conflict) throw new Error('Ce créneau est déjà réservé.');

      return await Appointment.create({ email, dateTime, type });
    },
  },
};
