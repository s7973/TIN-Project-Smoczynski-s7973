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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required"
            },
            len: {
                args: [2,60],
                msg: "The field should contains 2 to 60 chars"
            },
        }
    },
    subjectAlias: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required"
            },
            len: {
                args: [2,3],
                msg: "The field should contains 2 to 3 chars"
            },
        }
    },
    semester: {
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
                args: 1,
                msg: "The value should be greater than 0"
            },
            max:  {
                args: 8,
                msg: "The value should be less than 9"
            }
        }
    }
});

module.exports = Subject;