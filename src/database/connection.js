const conn = require('./dataConnection');
const Sequelize = require('sequelize');
const sequelize = new Sequelize (`mysql://${conn.conf_user}:${conn.conf_password}@${conn.conf_host}:${conn.conf_port}/${conn.conf_db_name}`);

module.exports = sequelize;
global.sequelize = sequelize;