const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/db');

class Member extends Model {}

Member.init({
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { 
      isEmail: true,
      // ajuste o domínio institucional abaixo
      is: /@yourdomain\.edu\.br$/i 
    }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: DataTypes.STRING,
  gender: {
    type: DataTypes.ENUM('M','F','O'),
    allowNull: true
  },
  photo: DataTypes.STRING,
  joinDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  skills: DataTypes.TEXT
}, {
  sequelize,
  modelName: 'Member'
});

module.exports = Member;
