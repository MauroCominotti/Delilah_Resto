const Sequelize = require('sequelize');
require('../database/connection');

module.exports = sequelize.define("Order", {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    userId: {
        allowNull: false,
        type: Sequelize.INTEGER(11).UNSIGNED
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
    }
});
