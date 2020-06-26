'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("products", {
      id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(50)
      },
      description: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100)
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER(11).UNSIGNED,
      },
      img: {
        allowNull: false,
        type: Sequelize.TEXT
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
    return queryInterface.dropTable("products");
  }
};
