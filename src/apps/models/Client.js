module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: { type: DataTypes.STRING, allowNull: false },
    contactEmail: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
    company: DataTypes.STRING
  });

  Client.associate = models => {
    Client.hasMany(models.Budget, { foreignKey: 'clientId' });
    Client.hasMany(models.Project, { foreignKey: 'clientId' });
  };

  return Client;
};