const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

// Test de connexion
sequelize.authenticate()
  .then(() => console.log('✅ Connexion à PostgreSQL réussie !'))
  .catch(err => console.error('❌ Erreur de connexion :', err));

module.exports = sequelize;
