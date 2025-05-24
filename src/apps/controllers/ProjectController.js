const { Project, Client } = require('../models');

module.exports = {
  async index(req, res) {
    const projects = await Project.findAll({ include: [Client] });
    return res.json(projects);
  },

  async show(req, res) {
    const project = await Project.findByPk(req.params.id, { include: [Client] });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    return res.json(project);
  },

  async store(req, res) {
    const project = await Project.create(req.body);
    return res.status(201).json(project);
  },

  async update(req, res) {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await project.update(req.body);
    return res.json(project);
  },

  async destroy(req, res) {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await project.destroy();
    return res.status(204).send();
  }
};