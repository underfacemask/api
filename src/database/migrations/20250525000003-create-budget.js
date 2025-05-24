'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Budgets', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      number: { type: Sequelize.STRING, allowNull: false, unique: true },
      description: { type: Sequelize.TEXT, allowNull: false },
      estimatedValue: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      status: { type: Sequelize.ENUM('em_analise','aprovado','reprovado'), allowNull: false, defaultValue: 'em_analise' },
      responsibleId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'SET NULL'
      },
      clientId: {
        type: Sequelize.INTEGER,
        references: { model: 'Clients', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'SET NULL'
      },
      projectId: {
        type: Sequelize.INTEGER,
        references: { model: 'Projects', key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'SET NULL'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('Budgets');
  }
};