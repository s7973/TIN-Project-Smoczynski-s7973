const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Grade = sequelize.define('Grade', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    grade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Grade;