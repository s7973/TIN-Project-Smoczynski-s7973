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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required"
            },
            isNumeric: {
                msg: "The field should be a number"
            },
            min: {
                args: 2,
                msg: "The value should be greater than 1"
            },
            max:  {
                args: 5,
                msg: "The value should be less than 6"
            }
        }
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required"
            },
            isDate: {
                msg: "The value should be a date"
            }
        }
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required"
            }
        }
    },
    subject_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required"
            }
        }
    }
});

module.exports = Grade;