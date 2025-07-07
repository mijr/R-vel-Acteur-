const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const crypto = require('crypto');
const { Op } = require('sequelize');
require('dotenv').config();

const sendEmail = require('../../utils/sendEmail');
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

      const resetLink = `http://localhost:3000/reset-password/${token}`;

      const html = `
        <p>Bonjour ${user.firstName || ''},</p>
        <p>Vous avez demandé une réinitialisation de mot de passe.</p>
        <p>Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>Ce lien expire dans une heure.</p>
        <p>Si vous n'avez rien demandé, ignorez simplement ce message.</p>
      `;

      try {
        await sendEmail(user.email, "Réinitialisation de mot de passe", html);
        return "Reset link sent to your  email.";
      } catch (err) {
        console.error('Erreur lors de l’envoi du mail :', err.message);
        throw new Error(`Échec de l'envoi de l'email : ${err.message}`);
      }
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
      if (user.role !== 'admin') throw new Error('Access denied, admin only');

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
      if (!dbUser) throw new Error('Utilisateur introuvable');

      const valid = await bcrypt.compare(currentPassword, dbUser.password);
      if (!valid) throw new Error('Mot de passe actuel incorrect');

      dbUser.password = await bcrypt.hash(newPassword, 10);
      await dbUser.save();
      return "Mot de passe mis à jour avec succès";
    },
  },
};
