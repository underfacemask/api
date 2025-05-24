module.exports = (sequelize, DataTypes) => {
  const Budget = sequelize.define('Budget', {
    number: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    estimatedValue: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    status: { type: DataTypes.ENUM('em_analise','aprovado','reprovado'), allowNull: false, defaultValue: 'em_analise' }
  });

  Budget.associate = models => {
    Budget.belongsTo(models.User, { as: 'responsible', foreignKey: 'responsibleId' });
    Budget.belongsTo(models.Client, { foreignKey: 'clientId' });
    Budget.belongsTo(models.Project, { foreignKey: 'projectId' });
  };

  return Budget;
};