const { Service } = require('../../models');

module.exports = {
  Query: {
    services: async (_, __, { models }) => {
      return await models.Service.findAll({ order: [['createdAt', 'DESC']] });
    },

    service: async (_, { id }, { models }) => {
      return await models.Service.findByPk(id);
    },
  },

  Mutation: {
    addService: async (_, { input }, { models }) => {
      const service = await models.Service.create(input);
      return service;
    },

    updateService: async (_, { id, input }, { models }) => {
      const service = await models.Service.findByPk(id);
      if (!service) throw new UserInputError('Service not found');

      await service.update(input);
      return service;
    },

    deleteService: async (_, { id }, { models }) => {
      const service = await models.Service.findByPk(id);
      if (!service) throw new UserInputError('Service not found');

      await service.destroy();
      return true;
    },
  },
};
