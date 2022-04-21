const Sequelize = require('sequelize');
const sequelize = new Sequelize('db_nexchallenge', 'localhost', '123456',{dialect: 'postgres'} );

module.exports = sequelize;