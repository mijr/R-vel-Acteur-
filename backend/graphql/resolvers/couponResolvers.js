const { Coupon } = require('../../models'); 

const resolvers = {
  Query: {
    getCoupons: async () => await Coupon.findAll(),
    getCoupon: async (_, { id }) => await Coupon.findByPk(id)
  },
  Mutation: {
    createCoupon: async (_, { input }) => await Coupon.create(input),
    updateCoupon: async (_, { input }) => {
      const coupon = await Coupon.findByPk(input.id);
      if (!coupon) throw new Error('Coupon not found');
      await coupon.update(input);
      return coupon;
    },
    deleteCoupon: async (_, { id }) => {
      const deleted = await Coupon.destroy({ where: { id } });
      return deleted > 0;
    }
  }
};

module.exports = resolvers;
