const { Sequelize } = require('sequelize');
require('dotenv').config(); // carrega variáveis do .env

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
  NODE_ENV
} = process.env;

// Em ambiente de testes, podemos usar um banco separado
const database = NODE_ENV === 'test'
  ? `${DB_NAME}_test`
  : DB_NAME;

const sequelize = new Sequelize(database, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: NODE_ENV === 'development' ? console.log : false,
  define: {
    underscored: true,       // snake_case nas colunas
    freezeTableName: false,  // pluraliza tabelas automaticamente
    timestamps: true         // adiciona createdAt/updatedAt
  }
});

module.exports = sequelize;

