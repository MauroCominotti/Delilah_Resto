'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("carts", {
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER(11).UNSIGNED
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER(11).UNSIGNED
      },
      productCuantity: {
        allowNull: false,
        type: Sequelize.INTEGER(50).UNSIGNED
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
    return queryInterface.dropTable("carts");
  }
};
