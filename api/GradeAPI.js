const GradeRepository = require('../repository/mysql2/GradeRepository');

exports.getGrades = (req, res, next) => {
    GradeRepository.getGrades()
        .then(grades => {
            res.status(200).json(grades);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.createGrade = (req, res, next) => {
    GradeRepository.createGrade(req.body)
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

exports.updateGrade = (req, res, next) => {
    const gradeId = req.params.gradeId;
    GradeRepository.updateGrade(gradeId, req.body)
        .then(result => {
            res.status(200).json({message: 'Grade updated!', grade: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteGrade = (req, res, next) => {
    const gradeId = req.params.gradeId;
    GradeRepository.deleteGrade(gradeId)
        .then(result => {
            res.status(200).json({message: 'Removed grade', grade: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};