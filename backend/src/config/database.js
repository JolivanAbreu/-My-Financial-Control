// backend/src/config/database.js

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

// Configuração para o ambiente de desenvolvimento (o seu computador)
const developmentConfig = {
  dialect: 'mariadb',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

// Configuração para o ambiente de produção (Render)
const productionConfig = {
  dialect: 'postgres',
  url: process.env.DB_URL_PROD,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

module.exports = process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;