const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

class Client extends Model {}

Client.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  phone: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Client'
});

module.exports = Client;
