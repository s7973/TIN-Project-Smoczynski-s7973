const sequelize = require('./sequelize');

const Student = require('../../model/sequelize/Student');
const Subject = require('../../model/sequelize/Subject');
const Grade = require('../../model/sequelize/Grade');

module.exports = () => {
    Student.hasMany(Grade, {as: 'grade', foreignKey: {name: 'student_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Grade.belongsTo(Student, {as: 'student', foreignKey: {name: 'student_id', allowNull: false} } );
    Subject.hasMany(Grade, {as: 'grade', foreignKey: {name: 'subject_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Grade.belongsTo(Subject, {as: 'subject', foreignKey: {name: 'subject_id', allowNull: false} });

    let allStudents, allSubjects;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Student.findAll();
        })
        .then(students => {
            if( !students || students.length == 0 ) {
                return Student.bulkCreate([
                    {firstName: 'Jan', lastName: 'Kowalski', email: 'jan.kowalski@ait.com', studentAlias: 's1234'},
                    {firstName: 'Rafał', lastName: 'Smoczyński', email: 'rafal.smoczynski@ait.com', studentAlias: 's7973'},
                    {firstName: 'Maciej', lastName: 'Maciejewski', email: 'maciej.maciejewski@ait.com', studentAlias: 's3432'},
                    {firstName: 'Konrad', lastName: 'Modrzejewski', email: 'konrad.modrzejewski@ait.com', studentAlias: 's2432'},
                    {firstName: 'Paulina', lastName: 'Paulinek', email: 'paulina.paulinek@ait.com', studentAlias: 's3435'},
                    {firstName: 'Lucjan', lastName: 'Potocki', email: 'lucjan.potocki@ait.com', studentAlias: 's5432'},
                    {firstName: 'Władysław', lastName: 'Czereśnicki', email: 'wladyslaw.czeresnicki@ait.com', studentAlias: 's1826'},
                    {firstName: 'Katarzyna', lastName: 'Pierzyna', email: 'katarzyna.pierzyna@ait.com', studentAlias: 's5422'},
                    {firstName: 'Małgorzata', lastName: 'Subnicka', email: 'malgorzata.subnicka@ait.com', studentAlias: 's8212'},
                    {firstName: 'Ferdynand', lastName: 'Kiepski', email: 'ferdynand.kiepski@ait.com', studentAlias: 's3439'},
                ])
                    .then( () => {
                        return Student.findAll();
                    });
            } else {
                return students;
            }
        })
        .then( students => {
            allStudents = students;
            return Subject.findAll();
        })
        .then( subjects => {
            if( !subjects || subjects.length == 0 ) {
                return Subject.bulkCreate([
                    { name: 'Analiza matematyczna', subjectAlias: 'AM', semester: 1},
                    { name: 'Technika i architektura komputerów', subjectAlias: 'TAK', semester: 1},
                    { name: 'Podstawy programowania w Javie', subjectAlias: 'PPJ', semester: 1},
                    { name: 'Wprowadzenie do systemów informacyjnych', subjectAlias: 'WSI', semester: 1},
                    { name: 'Prawne podstawy działalności gospodarczej', subjectAlias: 'PPB', semester: 1},
                    { name: 'Historia i Kultura Japonii', subjectAlias: 'HKJ', semester: 1},
                    { name: 'Język angielski', subjectAlias: 'ANG', semester: 1}
                ])
                    .then( () => {
                        return Student.findAll();
                    });
            } else {
                return subjects;
            }
        })
        .then( subjects => {
            allSubjects = subjects;
            return Grade.findAll();
        })
        .then( grades => {
            if( !grades || grades.length == 0 ) {
                return Grade.bulkCreate([
                    {student_id: allStudents[0]._id, subject_id: allSubjects[0]._id, grade: 2, date: '2020-10-01'},
                    {student_id: allStudents[1]._id, subject_id: allSubjects[1]._id, grade: 5, date: '2020-10-01'},
                    {student_id: allStudents[2]._id, subject_id: allSubjects[2]._id, grade: 3, date: '2020-10-02'},
                    {student_id: allStudents[3]._id, subject_id: allSubjects[3]._id, grade: 4, date: '2020-10-02'},
                    {student_id: allStudents[4]._id, subject_id: allSubjects[4]._id, grade: 5, date: '2020-10-02'},
                    {student_id: allStudents[5]._id, subject_id: allSubjects[5]._id, grade: 2, date: '2020-10-02'},
                    {student_id: allStudents[6]._id, subject_id: allSubjects[6]._id, grade: 3, date: '2020-10-02'},
                    {student_id: allStudents[7]._id, subject_id: allSubjects[0]._id, grade: 2, date: '2020-10-02'},
                    {student_id: allStudents[8]._id, subject_id: allSubjects[1]._id, grade: 4, date: '2020-10-02'},
                    {student_id: allStudents[9]._id, subject_id: allSubjects[2]._id, grade: 5, date: '2020-10-02'},
                    {student_id: allStudents[1]._id, subject_id: allSubjects[2]._id, grade: 3, date: '2020-10-02'},
                    {student_id: allStudents[1]._id, subject_id: allSubjects[3]._id, grade: 3, date: '2020-10-02'},
                    {student_id: allStudents[1]._id, subject_id: allSubjects[4]._id, grade: 3, date: '2020-10-02'},
                    {student_id: allStudents[1]._id, subject_id: allSubjects[5]._id, grade: 4, date: '2020-10-02'},
                    {student_id: allStudents[1]._id, subject_id: allSubjects[6]._id, grade: 5, date: '2020-10-02'},
                ]);
            } else {
                return grades;
            }
        });


};