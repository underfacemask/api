const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/db');
const Member = require('./Member');
const Client = require('./Client');
const Project = require('./Project');

class Budget extends Model {}

Budget.init({
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  estimatedValue: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('em_analise','aprovado','reprovado'),
    allowNull: false,
    defaultValue: 'em_analise'
  }
}, {
  sequelize,
  modelName: 'Budget'
});

// Associações
Member.hasMany(Budget, { foreignKey: 'memberId', as: 'budgets' });
Budget.belongsTo(Member, { foreignKey: 'memberId', as: 'responsible' });

Client.hasMany(Budget, { foreignKey: 'clientId', as: 'budgets' });
Budget.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });

Project.hasMany(Budget, { foreignKey: 'projectId', as: 'budgets' });
Budget.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

module.exports = Budget;
