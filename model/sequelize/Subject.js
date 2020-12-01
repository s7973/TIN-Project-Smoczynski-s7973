const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Subject = sequelize.define('Subject', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subjectAlias: {
        type: Sequelize.STRING,
        allowNull: false
    },
    semester: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Subject;