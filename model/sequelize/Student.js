const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const authUtil = require('../../util/authUtils');


const Student = sequelize.define('Student', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
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
    lastName: {
        type: Sequelize.STRING,
        allowNull: true,
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
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "The field is required"
            },
            len: {
                args: [5,60],
                msg: "The field should contains 5 to 60 chars"
            },
            isEmail: {
                msg: "The field should have correct e-mail adress"
            }
        }
    },
    studentAlias: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required"
            }
        }

    },
    accessLevel: {
        type: Sequelize.INTEGER,
        allowNull: true
        /* wywala blad w validationerrors
        defaultValue: 0
        */

    },


});

module.exports = Student;

