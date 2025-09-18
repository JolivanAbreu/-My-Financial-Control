// backend/src/controllers/TransactionController.js
const Transaction = require("../models/Transaction");

class TransactionController {
  // Listar todas as transações do usuário logado
  // backend/src/controllers/TransactionController.js

  // ...
  async index(req, res) {
    try {
      const transactions = await Transaction.findAll({
        where: { user_id: req.userId },
        order: [['data', 'DESC']],
      });
      return res.json(transactions);
    } catch (error) {
      // Linhas modificadas abaixo
      console.error('ERRO AO LISTAR TRANSAÇÕES:', error);
      return res.status(500).json({
        error: 'Erro ao listar transações.',
        details: error.message,
      });
    }
  }
  // ...

  // Criar uma nova transação
  async store(req, res) {
    try {
      const { tipo, categoria, valor, data, descricao } = req.body;

      // Objeto que será salvo no banco
      const transactionData = {
        user_id: req.userId, // req.userId vem do middleware de autenticação
        tipo,
        categoria,
        valor,
        data,
        descricao,
      };

      // ADICIONE ESTE LOG PARA VERIFICAR OS DADOS
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

  // NOVO MÉTODO: ATUALIZAR UMA TRANSAÇÃO
  async update(req, res) {
    try {
      const { id } = req.params; // Pega o ID da transação pela URL

      // Procura a transação pelo ID, mas garante que ela pertence ao usuário logado
      const transaction = await Transaction.findOne({
        where: { id, user_id: req.userId },
      });

      // Se não encontrar, significa que a transação não existe ou não é do usuário
      if (!transaction) {
        return res.status(404).json({ error: "Transação não encontrada." });
      }

      // Atualiza a transação com os novos dados
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

  // NOVO MÉTODO: APAGAR UMA TRANSAÇÃO
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

      // Retorna uma resposta de sucesso sem conteúdo
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
