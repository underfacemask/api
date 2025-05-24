const Client = require('../models/Client');

module.exports = {
  async index(req, res) {
    const clients = await Client.findAll();
    return res.json(clients);
  },

  async show(req, res) {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    return res.json(client);
  },

  async store(req, res) {
    try {
      const client = await Client.create(req.body);
      return res.status(201).json(client);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    try {
      await client.update(req.body);
      return res.json(client);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async destroy(req, res) {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    await client.destroy();
    return res.json({ message: 'Cliente excluído com sucesso' });
  }
};
