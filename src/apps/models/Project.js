module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT
  });

  Project.associate = models => {
    Project.belongsTo(models.Client, { foreignKey: 'clientId' });
    Project.hasMany(models.Budget, { foreignKey: 'projectId' });
  };

  return Project;
};