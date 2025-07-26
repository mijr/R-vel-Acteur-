const { UserInputError } = require('apollo-server-express');

module.exports = {
  Query: {
    services: async (_, __, { models }) => {
      return await models.Service.findAll({ order: [['createdAt', 'DESC']] });
    },
    service: async (_, { id }, { models }) => {
      return await models.Service.findByPk(id);
    },
  },

  Service: {
    pricing: (parent) => {
      let pricingArr = [];
      if (!parent.pricing) return [];

      if (typeof parent.pricing === 'string') {
        try {
          pricingArr = JSON.parse(parent.pricing);
        } catch {
          return [];
        }
      } else if (Array.isArray(parent.pricing)) {
        pricingArr = parent.pricing;
      } else {
        pricingArr = [parent.pricing];
      }

      // Filter out items missing required fields (region, amount, currency)
      return pricingArr.filter(p => p.region && p.amount != null && p.currency);
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

    applyCouponToService: async (_, { serviceId, couponCode }, { models, userRegion }) => {
      // Fetch the service
      const service = await models.Service.findByPk(serviceId);
      if (!service) throw new UserInputError('Service not found');

      // Fetch the coupon
      const coupon = await models.Coupon.findOne({ where: { code: couponCode } });
      if (!coupon) throw new UserInputError('Invalid coupon');

      // Check coupon expiration
      if (coupon.expiration_date && new Date(coupon.expiration_date) < new Date()) {
        throw new UserInputError('Coupon has expired');
      }

      // Check if coupons allowed for this service
      if (!service.couponRules?.allowed) {
        throw new UserInputError('Coupons not allowed for this service');
      }

      // Determine user region (passed from context middleware or default)
      const region = userRegion || 'europe'; // fallback region

      // Parse pricing JSON if needed
      let pricingArr = [];
      if (typeof service.pricing === 'string') {
        try {
          pricingArr = JSON.parse(service.pricing);
        } catch {
          throw new Error('Invalid pricing data');
        }
      } else if (Array.isArray(service.pricing)) {
        pricingArr = service.pricing;
      } else {
        pricingArr = [service.pricing];
      }

      // Find price for user region
      const geoPrice = pricingArr.find(p => p.region.toLowerCase() === region.toLowerCase());
      if (!geoPrice) throw new Error('Pricing not available for your region');

      let discountedPrice;
      if (coupon.type === 'FIXED') {
        discountedPrice = geoPrice.amount - coupon.value;
        if (discountedPrice < 0) discountedPrice = 0; // no negative prices
      } else if (coupon.type === 'PERCENT') {
        const maxDiscount = service.couponRules?.maxDiscount ?? 100;
        const discountPercent = Math.min(coupon.value, maxDiscount);
        discountedPrice = geoPrice.amount * (1 - discountPercent / 100);
        if (discountedPrice < 0) discountedPrice = 0;
      } else {
        throw new UserInputError('Unsupported coupon type');
      }

      return {
        service: service.toJSON(),
        originalPrice: geoPrice.amount,
        discountedPrice,
        currency: geoPrice.currency,
        appliedCoupon: coupon.code,
      };
    },
  },
};
