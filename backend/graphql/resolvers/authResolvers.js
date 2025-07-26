const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { Op } = require('sequelize');
require('dotenv').config();

const sendEmail = require('../../utils/sendEmail');
const sendSms = require('../../utils/sendSms');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
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
    },
    getUserProfile: async (_, { id }, { models }) => {
      const user = await models.User.findByPk(id);

      if (!user) {
        throw new Error("User not found");
      }

      // Return default values if profile fields are missing
      return {
        id: user.id,
        currency: user.currency || '',
        profession: user.profession || '',
        weight: user.weight,
        height: user.height,
        date_of_birth: user.date_of_birth,
        age: user.date_of_birth
          ? new Date().getFullYear() - new Date(user.date_of_birth).getFullYear()
          : null,
        matrimonial_status: user.matrimonial_status || '',
        description: user.description || '',
      };
    },
  },

  Mutation: {
    signup: async (_, { email, password, firstName, lastName, phone }) => {
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashed, firstName, lastName, phone });
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
      if (!user) throw new Error("User not found");

      const otpCode = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

      user.otpCode = otpCode;
      user.otpExpiry = otpExpiry;
      await user.save();

      const subject = "Password Reset Request";
      const html = `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <h2>Password Reset Request</h2>
          <p>Hello ${user.firstName || ''},</p>
          <p>Your password reset OTP code is:</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${otpCode}</p>
          <p>This code will expire in 10 minutes.</p>
          <p>If you did not request a password reset, please ignore this email.</p>
        </div>`;

      const smsMessage = `Your password reset OTP code is: ${otpCode}. It expires in 10 minutes.`;

      try {
        await sendEmail(user.email, subject, html);

        if (user.phone) {
          await sendSms(user.phone, smsMessage);
        }

        return true;
      } catch (e) {
        console.error('Error sending OTP via email or SMS:', e);
        throw new Error("Failed to send OTP via email or SMS");
      }
    },

    resetPasswordWithOTP: async (_, { email, otpCode, newPassword }) => {
      const user = await User.findOne({ where: { email } });

      if (!user) throw new Error('User not found');
      if (!user.otpCode || user.otpCode !== otpCode) throw new Error('Invalid OTP code');
      if (user.otpExpiry < new Date()) throw new Error('OTP code expired');

      user.password = await bcrypt.hash(newPassword, 10);
      user.otpCode = null;
      user.otpExpiry = null;
      await user.save();

      return "Password has been reset successfully.";
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

    updateUser: async (_, { id, input }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin' && user.id !== id) {
        throw new Error('Access denied');
      }

      const userToUpdate = await User.findByPk(id);
      if (!userToUpdate) throw new Error('User not found');

      await userToUpdate.update(input);
      return userToUpdate;
    },

    deleteUser: async (_, { id }, { user }) => {
      if (!user) throw new Error('Unauthorized');
      if (user.role !== 'admin') throw new Error('Access denied, admin only');

      const userToDelete = await User.findByPk(id);
      if (!userToDelete) throw new Error('User not found');

      await userToDelete.destroy();
      return true;
    },

    changePassword: async (_, { currentPassword, newPassword }, { user }) => {
      if (!user) throw new Error('Unauthorized');

      const dbUser = await User.findByPk(user.id);
      if (!dbUser) throw new Error('User not found');

      const valid = await bcrypt.compare(currentPassword, dbUser.password);
      if (!valid) throw new Error('Current password is incorrect');

      dbUser.password = await bcrypt.hash(newPassword, 10);
      await dbUser.save();
      return "Password updated successfully";
    },

    updateUserProfile: async (_, { id, input }) => {
      const user = await User.findByPk(id);
      if (!user) throw new Error("User not found");

      await user.update(input);
      return user;
    },
  },
};
