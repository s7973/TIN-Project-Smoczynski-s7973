const Sequelize = require('sequelize');

const Grade = require('../../model/sequelize/Grade');
const Student = require('../../model/sequelize/Student');
const Subject = require('../../model/sequelize/Subject');

exports.getGrades = () => {
    return Grade.findAll({include: [
            {
                model: Student,
                as: 'student'
            },
            {
                model: Subject,
                as: 'subject'
            }]
    });
};


exports.getGradeById = (gradeId) => {
    return Grade.findByPk(gradeId, {include: [
            {
                model: Student,
                as: 'student'
            },
            {
                model: Subject,
                as: 'subject'
            }]
    });
};

exports.createGrade = (data) => {
    console.log(JSON.stringify(data));

    return Grade.create({
        student_id: data.student_id,
        subject_id: data.subject_id,
        grade: data.grade,
        date: data.date
    });
};


exports.updateGrade = (gradeId, data) => {
    return Grade.update(data, {where: {_id: gradeId }});
}

exports.deleteGrade = (gradeId) => {
    return Grade.destroy({
        where: { _id: gradeId }
    });
}

exports.deleteManyGrades = (gradeIds) => {
    return Grade.find({ _id: { [Sequelize.Op.in]: gradeIds }})
}

