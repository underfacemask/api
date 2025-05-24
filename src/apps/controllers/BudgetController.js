const { Budget, User, Client, Project } = require('../models');

module.exports = {
  async index(req, res) {
    const budgets = await Budget.findAll({
      include: [
        { model: User, as: 'responsible' },
        Client,
        Project
      ]
    });
    return res.json(budgets);
  },

  async show(req, res) {
    const budget = await Budget.findByPk(req.params.id, {
      include: [
        { model: User, as: 'responsible' },
        Client,
        Project
      ]
    });
    if (!budget) return res.status(404).json({ error: 'Budget not found' });
    return res.json(budget);
  },

  async store(req, res) {
    const budget = await Budget.create(req.body);
    return res.status(201).json(budget);
  },

  async update(req, res) {
    const budget = await Budget.findByPk(req.params.id);
    if (!budget) return res.status(404).json({ error: 'Budget not found' });
    await budget.update(req.body);
    return res.json(budget);
  },

  async destroy(req, res) {
    const budget = await Budget.findByPk(req.params.id);
    if (!budget) return res.status(404).json({ error: 'Budget not found' });
    await budget.destroy();
    return res.status(204).send();
  }
};