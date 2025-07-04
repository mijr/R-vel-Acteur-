const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const crypto = require('crypto');
const { Op } = require('sequelize');
require('dotenv').config();

const generateToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

module.exports = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthorized');
      return await User.findByPk(user.id);
    },
    users: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin') throw new Error('Access denied, admin only');
      return await User.findAll();
    }
  },

  Mutation: {
    signup: async (_, { email, password, firstName, lastName }) => {
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashed, firstName, lastName });
      const token = generateToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      const token = generateToken(user);
      return { token, user };
    },
    requestPasswordReset: async (_, { email }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) return "If the email exists, a reset link was sent.";
      const token = crypto.randomBytes(32).toString('hex');
      user.resetToken = token;
      user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1h
      await user.save();
      console.log(`🔐 Reset link: http://localhost:3000/reset-password/${token}`);
      return "Reset link sent if email is valid.";
    },
    resetPassword: async (_, { token, newPassword }) => {
      const user = await User.findOne({
        where: {
          resetToken: token,
          resetTokenExpiry: { [Op.gt]: new Date() },
        },
      });
      if (!user) throw new Error('Invalid or expired token');
      user.password = await bcrypt.hash(newPassword, 10);
      user.resetToken = null;
      user.resetTokenExpiry = null;
      await user.save();
      return "Password has been reset successfully.";
    },
  },
};
