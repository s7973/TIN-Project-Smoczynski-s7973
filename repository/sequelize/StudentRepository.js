const Student = require("../../model/sequelize/Student");
const Subject = require("../../model/sequelize/Subject");
const Grade = require("../../model/sequelize/Grade");

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
            }]
        }
        );
};

exports.createStudent = (newStudentData) => {
    return Student.create({
        firstName: newStudentData.firstName,
        lastName: newStudentData.lastName,
        studentAlias: newStudentData.studentAlias,
        email: newStudentData.email
    });
};

exports.updateStudent = (studentId, studentData) => {
    const firstName = studentData.firstName;
    const lastName = studentData.lastName;
    const email = studentData.email;
    const studentAlias = studentData.studentAlias;
    return Student.update(studentData, {where: {_id: studentId }});
};

exports.deleteStudent = (studentId) => {
    return Student.destroy({
        where: { _id: studentId }
    });

};
