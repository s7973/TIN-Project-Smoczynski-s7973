const db = require('../../config/mysql2/db');

exports.getStudents = () => {
    return db.promise().query('SELECT * FROM Student')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};


exports.getStudentById = (studentId) => {
    const query = `SELECT s._id as _id, s.firstName, s.lastName, s.email, s.studentAlias, 
    g._id as grade_id, g.grade, g.date, 
    sub._id as subject_id, sub.name, sub.subjectAlias
    FROM Student s 
    left join Grade g on g._id = s._id
    left join Subject sub on g._id = sub._id 
    where s._id = ?`
    return db.promise().query(query, [studentId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return {};
            }
            const stud = {
                _id: parseInt(studentId),
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                email: firstRow.email,
                studentAlias: firstRow.studentAlias,
                grades: []
            }
            for( let i=0; i<results[0].length; i++ ) {
                const row = results[0][i];
                if(row.grade_id) {
                    const grade = {
                        _id: row.g_id,
                        grade: row.grade,
                        date: row.date,
                        subject: {
                            _id: row.sub_id,
                            name: row.name,
                            subjectAlias: row.subjectAlias
                        }
                    };
                    stud.grades.push(grade);
                }
            }
            return stud;

        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createStudent = (newStudentData) => {
    const firstName = newStudentData.firstName;
    const lastName = newStudentData.lastName;
    const email = newStudentData.email;
    const studentAlias = newStudentData.studentAlias;
    const sql = 'INSERT into Student (firstName, lastName, email, studentAlias) VALUES (?, ?, ?, ?)'
    return db.promise().execute(sql, [firstName, lastName, email, studentAlias]);
};

exports.updateStudent= (studentId, studentData) => {
    const firstName = studentData.firstName;
    const lastName = studentData.lastName;
    const email = studentData.email;
    const studentAlias = studentData.studentAlias;
    const sql = `UPDATE Student set firstName = ?, lastName = ?, email = ?, studentAlias = ? where _id = ?`;
    return db.promise().execute(sql, [firstName, lastName, email, studentAlias, studentId]);
};

exports.deleteStudent= (studentId) => {
    const sql1 = 'DELETE FROM Grade where _id = ?'
    const sql2 = 'DELETE FROM Student where _id = ?'

    return db.promise().execute(sql1, [studentId])
        .then(() => {
            return db.promise().execute(sql2, [studentId])
        });
};