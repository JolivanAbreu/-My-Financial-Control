// backend/src/app.js (VERSÃO FINAL COM CORS)

require('dotenv').config();
const express = require('express');
const cors = require('cors'); // 1. Importe o pacote cors

require('./database');

const routes = require('./routes/routes');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors()); // 2. Use o cors como middleware
    this.server.use(express.json());
  }

  routes() {
    this.server.use('/api', routes);

    // Rota de teste
    this.server.get('/', (req, res) => {
      return res.json({ message: 'API Meu Controle Financeiro está no ar!' });
    });
  }
}

module.exports = new App().server;