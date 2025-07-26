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

   applyCouponToService: async (_, { serviceId, couponCode }, { models }) => {
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

  // Apply coupon to all region prices
  const discountedPrices = pricingArr.map(price => {
    if (!price.region || typeof price.amount !== 'number') return null;

    let discountedAmount;
    if (coupon.type === 'FIXED') {
      discountedAmount = price.amount - coupon.value;
    } else if (coupon.type === 'PERCENT') {
      const maxDiscount = service.couponRules?.maxDiscount ?? 100;
      const discountPercent = Math.min(coupon.value, maxDiscount);
      discountedAmount = price.amount * (1 - discountPercent / 100);
    } else {
      throw new UserInputError('Unsupported coupon type');
    }

    return {
      region: price.region,
      currency: price.currency,
      originalPrice: price.amount,
      discountedPrice: Math.max(0, discountedAmount),
    };
  }).filter(Boolean); // remove nulls

  if (discountedPrices.length === 0) {
    throw new Error('No valid pricing found for this service');
  }

  return {
    service: service.toJSON(),
    appliedCoupon: coupon.code,
    prices: discountedPrices,
  };
},
  },
};
