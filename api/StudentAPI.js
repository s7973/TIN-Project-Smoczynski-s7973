const StudentRepository = require('../repository/mysql2/StudentRepository');

exports.getStudents = (req, res, next) => {
    StudentRepository.getStudents()
        .then(students => {
            res.status(200).json(students);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getStudentById = (req, res, next) => {
    const studentId = req.params.studentId;
    StudentRepository.getStudentById(studentId)
        .then(stud => {
            if(!stud) {
                res.status(404).json({
                    message: 'Student with id: '+studentId+' not found'
                })
            } else {
                res.status(200).json(stud);
            }
        });
};

exports.createStudent = (req, res, next) => {
    StudentRepository.createStudent(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateStudent = (req, res, next) => {
    const studentId = req.params.studentId;
    StudentRepository.updateStudent(studentId, req.body)
        .then(result => {
            res.status(200).json({message: 'Student updated!', student: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteStudent = (req, res, next) => {
    const studentId = req.params.studentId;
    StudentRepository.deleteStudent(studentId)
        .then(result => {
            res.status(200).json({message: 'Removed student', student: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};