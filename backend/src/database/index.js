// backend/src/database/index.js (VERSÃO CORRIGIDA E FINAL)
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Budget = require('../models/Budget');
const Goal = require('../models/Goal');

// Coloque todos os seus modelos neste array
const models = [User, Transaction, Budget, Goal];

class Database {
  constructor() {
    this.connection = new Sequelize(dbConfig);
    this.init();
    this.associate();
  }

  init() {
    // Percorre cada modelo e chama o método init dele
    models.forEach((model) => model.init(this.connection));
  }

  associate() {
    // Percorre cada modelo e chama o método associate (se ele existir)
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

// Exporta uma nova instância da classe, já com a conexão pronta
module.exports = new Database();