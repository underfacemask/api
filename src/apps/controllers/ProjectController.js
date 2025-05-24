const Project = require('../models/Project');
const Client = require('../models/Client');

module.exports = {
  async index(req, res) {
    const projects = await Project.findAll({
      include: [{ model: Client, as: 'client' }]
    });
    return res.json(projects);
  },

  async show(req, res) {
    const project = await Project.findByPk(req.params.id, {
      include: [{ model: Client, as: 'client' }]
    });
    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    return res.json(project);
  },

  async store(req, res) {
    try {
      const project = await Project.create(req.body);
      return res.status(201).json(project);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    try {
      await project.update(req.body);
      return res.json(project);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async destroy(req, res) {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }
    await project.destroy();
    return res.json({ message: 'Projeto excluído com sucesso' });
  }
};
