const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../configs/db');

const sequelize = new Sequelize(config);
const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(name => {
  if (db[name].associate) db[name].associate(db);
});

db.sequelize = sequelize;
module.exports = db;