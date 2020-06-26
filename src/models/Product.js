const Sequelize = require('sequelize');
require('../database/connection');

module.exports = sequelize.define("Product", {
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
        type: Sequelize.STRING(50)
    },
    price: {
        allowNull: false,
        type: Sequelize.INTEGER(11).UNSIGNED,
    },
    img: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(600)
    }
});
