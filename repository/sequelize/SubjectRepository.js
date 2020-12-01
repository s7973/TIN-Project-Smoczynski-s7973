const Student = require("../../model/sequelize/Student");
const Subject = require("../../model/sequelize/Subject");
const Grade = require("../../model/sequelize/Grade");

exports.getSubjects = () => {
    return Subject.findAll();
};

exports.getSubjectById = (subjectId) => {
    return Subject.findByPk(subjectId,
        {
            include: [{
                model: Grade,
                as: 'grade',
                include: [{
                    model: Student,
                    as: 'student'
                }]
            }]
        });
};

exports.createSubject = (newSubjectData) => {
    return Subject.create({
        name: newSubjectData.name,
        subjectAlias: newSubjectData.subjectAlias,
        semester: newSubjectData.semester
    });
};

exports.updateSubject = (subjectId, subjectData) => {
    const name = subjectData.name;
    const subjectAlias = subjectData.subjectAlias;
    const semester = subjectData.semester;
    return Subject.update(subjectData, {where: {_id: subjectId }});
};

exports.deleteSubject = (subjectId) => {
    return Subject.destroy({
        where: { _id: subjectId }
    });

};
