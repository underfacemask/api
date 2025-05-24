const Budget = require('../models/Budget');
const Member = require('../models/Member');
const Client = require('../models/Client');
const Project = require('../models/Project');

module.exports = {
  async index(req, res) {
    const budgets = await Budget.findAll({
      include: [
        { model: Member,  as: 'responsible' },
        { model: Client,  as: 'client' },
        { model: Project, as: 'project' }
      ]
    });
    return res.json(budgets);
  },

  async show(req, res) {
    const budget = await Budget.findByPk(req.params.id, {
      include: [
        { model: Member,  as: 'responsible' },
        { model: Client,  as: 'client' },
        { model: Project, as: 'project' }
      ]
    });
    if (!budget) {
      return res.status(404).json({ error: 'Orçamento não encontrado' });
    }
    return res.json(budget);
  },

  async store(req, res) {
    try {
      const { number, description, estimatedValue, memberId, clientId, projectId } = req.body;
      const budget = await Budget.create({ number, description, estimatedValue, memberId, clientId, projectId });
      return res.status(201).json(budget);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    const budget = await Budget.findByPk(req.params.id);
    if (!budget) {
      return res.status(404).json({ error: 'Orçamento não encontrado' });
    }
    try {
      await budget.update(req.body);
      return res.json(budget);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async destroy(req, res) {
    const budget = await Budget.findByPk(req.params.id);
    if (!budget) {
      return res.status(404).json({ error: 'Orçamento não encontrado' });
    }
    await budget.destroy();
    return res.json({ message: 'Orçamento excluído com sucesso' });
  }
};
