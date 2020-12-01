const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Student = sequelize.define('Student', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    studentAlias: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Student;