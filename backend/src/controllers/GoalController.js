// backend/src/controllers/GoalController.js

const Goal = require('../models/Goal');

class GoalController {
    // Criar uma nova meta
    async store(req, res) {
        try {
            const { titulo, valor_objetivo, valor_atual, prazo } = req.body;
            const goal = await Goal.create({
                user_id: req.userId,
                titulo,
                valor_objetivo,
                valor_atual,
                prazo,
            });
            return res.status(201).json(goal);
        } catch (error) {
            return res.status(500).json({ error: 'Falha ao criar meta.', details: error.message });
        }
    }

    // Listar metas do usuário
    async index(req, res) {
        try {
            const goals = await Goal.findAll({ where: { user_id: req.userId } });
            return res.json(goals);
        } catch (error) {
            return res.status(500).json({ error: 'Falha ao listar metas.', details: error.message });
        }
    }

    // Atualizar uma meta (ex: mudar o título ou o valor objetivo)
    async update(req, res) {
        try {
            const { id } = req.params;
            const goal = await Goal.findOne({ where: { id, user_id: req.userId } });
            if (!goal) {
                return res.status(404).json({ error: 'Meta não encontrada.' });
            }
            const updatedGoal = await goal.update(req.body);
            return res.json(updatedGoal);
        } catch (error) {
            return res.status(500).json({ error: 'Falha ao atualizar meta.', details: error.message });
        }
    }

    // Apagar uma meta
    async destroy(req, res) {
        try {
            const { id } = req.params;
            const goal = await Goal.findOne({ where: { id, user_id: req.userId } });
            if (!goal) {
                return res.status(404).json({ error: 'Meta não encontrada.' });
            }
            await goal.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Falha ao apagar meta.', details: error.message });
        }
    }
}

module.exports = new GoalController();