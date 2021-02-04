const Student = require("../../model/sequelize/Student");
const Subject = require("../../model/sequelize/Subject");
const Grade = require("../../model/sequelize/Grade");
const Role = require("../../model/sequelize/Role");
const authUtil = require('../../util/authUtils');

exports.getStudents = () => {
    return Student.findAll();
};

exports.getStudentById = (studentId) => {
    return Student.findByPk(studentId,
        {
            include: [{
                model: Grade,
                as: 'grade',
                include: [{
                    model: Subject,
                    as: 'subject'
                }]
            },{
                model: Role,
                as: 'role'
            }]
        }
    );
};

exports.createStudent = (newStudentData) => {
    return Student.create({
        firstName: newStudentData.firstName,
        lastName: newStudentData.lastName,
        studentAlias: newStudentData.studentAlias,
        email: newStudentData.email,
        accessLevel: newStudentData.accessLevel,
        password: newStudentData.password
    });
};

exports.updateStudent = (studentId, studentData) => {
    const firstName = studentData.firstName;
    const lastName = studentData.lastName;
    const email = studentData.email;
    const studentAlias = studentData.studentAlias;
    const accessLevel = studentData.accessLevel;
    const password = studentData.password;
    return Student.update(studentData, {where: {_id: studentId }});
};

exports.deleteStudent = (studentId) => {
    return Student.destroy({
        where: { _id: studentId }
    });

};

exports.findByEmail = (email) => {
    return Student.findOne({
        where: {email: email}
    });
}