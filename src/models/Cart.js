const Sequelize = require('sequelize');
require('../database/connection');

module.exports = sequelize.define("Cart", {
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
    }
});