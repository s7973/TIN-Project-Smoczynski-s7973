const db = require('../../config/mysql2/db');

exports.getGrades = () => {
    return db.promise().query('SELECT * FROM Grade')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createGrade = (newGradeData) => {
    const student_id = newGradeData.student_id;
    const subject_id = newGradeData.subject_id;
    const grade = newGradeData.grade;
    const date = newGradeData.date;
    const sql = 'INSERT into Grade (student_id, subject_id, grade, date) VALUES (?, ?, ?, ?)'
    return db.promise().execute(sql, [student_id, subject_id, grade, date]);
};

exports.updateGrade = (gradeId, gradeData) => {
    const student_id = gradeData.student_id;
    const subject_id = gradeData.subject_id;
    const grade = gradeData.grade;
    const date = gradeData.date;
    const sql = `UPDATE Grade set student_id = ?, subject_id = ?, grade = ?, date = ? where _id = ?`;
    return db.promise().execute(sql, [student_id, subject_id, grade, date, gradeId]);
};

exports.deleteGrade = (gradeId) => {
    const sql1 = 'DELETE FROM Grade where _id = ?'

    return db.promise().execute(sql1, [gradeId]);
};

