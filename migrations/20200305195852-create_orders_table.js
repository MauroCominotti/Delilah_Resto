'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("orders", {
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        unique: true
      },
      state: {
        allowNull: false,
        type: Sequelize.ENUM('entregado', 'enviando', 'preparando', 'confirmado', 'nuevo', 'cancelado')
      },
      paymentMethod: {
        allowNull: false,
        type: Sequelize.ENUM('efectivo', 'debito', 'credito')
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER(11).UNSIGNED
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("orders");
  }
};
