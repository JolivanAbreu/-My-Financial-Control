// backend/src/config/database.js

// Adicione estas 2 linhas no topo do arquivo
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

module.exports = {
  dialect: process.env.DB_DIALECT || 'mariadb',
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