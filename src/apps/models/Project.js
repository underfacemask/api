const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/db');
const Client = require('./Client');

class Project extends Model {}

Project.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'Project'
});

// Associações
Project.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
Client.hasMany(Project, { foreignKey: 'clientId', as: 'projects' });

module.exports = Project;
