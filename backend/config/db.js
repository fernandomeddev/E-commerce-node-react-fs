const Sequelize = require('sequelize');

const connection = new Sequelize('db_nexchallenge', 'postgres', '123456', {
    host:'localhost',
    dialect: 'postgres'
})

module.exports = connection;