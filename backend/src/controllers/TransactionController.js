// backend/src/controllers/TransactionController.js

const { Op } = require('sequelize');
const Transaction = require("../models/Transaction");

class TransactionController {

  async index(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const whereCondition = { user_id: req.userId };

      if (startDate && endDate) {
        whereCondition.data = {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        };
      }

      const transactions = await Transaction.findAll({
        where: whereCondition,
        order: [['data', 'DESC']],
      });
      return res.json(transactions);
    } catch (error) {
      console.error('ERRO AO LISTAR TRANSAÇÕES:', error);
      return res.status(500).json({
        error: 'Erro ao listar transações.',
        details: error.message,
      });
    }
  }

  async store(req, res) {
    try {
      const { tipo, categoria, valor, data, descricao } = req.body;

      const transactionData = {
        user_id: req.userId,
        tipo,
        categoria,
        valor,
        data,
        descricao,
      };

      console.log('--- DADOS A SEREM SALVOS NA TRANSAÇÃO ---');
      console.log(transactionData);
      console.log('-----------------------------------------');

      const transaction = await Transaction.create(transactionData);

      return res.status(201).json(transaction);
    } catch (error) {
      console.error('ERRO AO CRIAR TRANSAÇÃO:', error);
      return res.status(500).json({
        error: 'Falha ao criar transação.',
        details: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const transaction = await Transaction.findOne({
        where: { id, user_id: req.userId },
      });

      if (!transaction) {
        return res.status(404).json({ error: "Transação não encontrada." });
      }

      const updatedTransaction = await transaction.update(req.body);

      return res.json(updatedTransaction);
    } catch (error) {
      console.error("ERRO AO ATUALIZAR TRANSAÇÃO:", error);
      return res.status(500).json({
        error: "Falha ao atualizar transação.",
        details: error.message,
      });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const transaction = await Transaction.findOne({
        where: { id, user_id: req.userId },
      });

      if (!transaction) {
        return res.status(404).json({ error: "Transação não encontrada." });
      }

      await transaction.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error("ERRO AO APAGAR TRANSAÇÃO:", error);
      return res.status(500).json({
        error: "Falha ao apagar transação.",
        details: error.message,
      });
    }
  }
}

module.exports = new TransactionController();
