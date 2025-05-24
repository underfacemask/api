const { Client } = require('../models');

module.exports = {
  async index(req, res) {
    const clients = await Client.findAll();
    return res.json(clients);
  },

  async show(req, res) {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    return res.json(client);
  },

  async store(req, res) {
    const client = await Client.create(req.body);
    return res.status(201).json(client);
  },

  async update(req, res) {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    await client.update(req.body);
    return res.json(client);
  },

  async destroy(req, res) {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    await client.destroy();
    return res.status(204).send();
  }
};