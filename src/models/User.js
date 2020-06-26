const Sequelize = require('sequelize');
require('../database/connection');

module.exports = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    },
    username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(50)
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING(50)
    },
    address: {
        allowNull: false,
        type: Sequelize.STRING(100)
    },
    email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100)
    },
    phone: {
        allowNull: false,
        type: Sequelize.INTEGER(13).UNSIGNED
    },
    type: {
        allowNull: false,
        type: Sequelize.ENUM('admin', 'user')
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING(300)
    }
});
