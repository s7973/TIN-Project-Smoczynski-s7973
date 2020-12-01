const Sequelize = require('sequelize');

const sequelize = new Sequelize('Academy', 'root', 'Warszawa!1', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;