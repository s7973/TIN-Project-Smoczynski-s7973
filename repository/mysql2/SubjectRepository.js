const db = require('../../config/mysql2/db');

exports.getSubjects = () => {
    return db.promise().query('SELECT * FROM Subject')
        .then( (results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getSubjectById = (subjectId) => {
    const query = `SELECT s._id as subject_id, s.name, s.subjectAlias, g._id as grade_id, g.grade, g.date,  
    stud._id as student_id, stud.firstName, stud.lastName, stud.email, stud.studentAlias
    FROM Subject s 
    left join Grade g on g._id = s._id
    left join Student stud on g._id = stud._id 
    where s._id = ?`
    return db.promise().query(query, [subjectId])
        .then( (results, fields) => {
            const firstRow = results[0][0];
            if(!firstRow) {
                return {};
            }
            const subject = {
                _id: parseInt(subjectId),
                name: firstRow.name,
                subjectAlias: firstRow.subjectAlias,
                grades: []
            }
            for( let i=0; i<results[0].length; i++ ) {
                const row = results[0][i];
                if(row.grade_id) {
                    const grade = {
                        _id: row.g_id,
                        grade: row.grade,
                        date: row.date,
                        student: {
                            _id: row.stud_id,
                            firstName: row.firstName,
                            lastName: row.lastName,
                            email: firstRow.email,
                            studentAlias: firstRow.studentAlias,
                        }
                    };
                    subject.grades.push(grade);
                }
            }
            return subject;

        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createSubject = (newSubjectData) => {
    const name = newSubjectData.name;
    const subjectAlias = newSubjectData.subjectAlias;
    const semester = newSubjectData.semester;
    const sql = 'INSERT into Subject (name, subjectAlias, semester) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [name, subjectAlias, semester]);
};

exports.updateSubject= (subjectId, subjectData) => {
    const name = subjectData.name;
    const subjectAlias = subjectData.subjectAlias;
    const semester = subjectData.semester;
    const sql = `UPDATE Subject set name = ?, subjectAlias = ?, semester = ? where _id = ?`;
    return db.promise().execute(sql, [name, subjectAlias, semester, subjectId]);
};

exports.deleteSubject= (subjectId) => {
    const sql1 = 'DELETE FROM Grade where _id = ?'
    const sql2 = 'DELETE FROM Subject where _id = ?'

    return db.promise().execute(sql1, [subjectId])
        .then(() => {
            return db.promise().execute(sql2, [subjectId])
        });
};

