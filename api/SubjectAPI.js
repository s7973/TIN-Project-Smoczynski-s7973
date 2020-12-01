const SubjectRepository = require('../repository/mysql2/SubjectRepository');

exports.getSubjects = (req, res, next) => {
    SubjectRepository.getSubjects()
        .then(subjects => {
            res.status(200).json(subjects);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSubjectById = (req, res, next) => {
    const subjectId = req.params.subjectId;
    SubjectRepository.getSubjectById(subjectId)
        .then(sub => {
            if(!sub) {
                res.status(404).json({
                    message: 'Subject with id: '+subjectId+' not found'
                })
            } else {
                res.status(200).json(sub);
            }
        });
};

exports.createSubject = (req, res, next) => {
    SubjectRepository.createSubject(req.body)
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

exports.updateSubject = (req, res, next) => {
    const subjectId = req.params.subjectId;
    SubjectRepository.updateSubject(subjectId, req.body)
        .then(result => {
            res.status(200).json({message: 'Subject updated!', subject: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteSubject = (req, res, next) => {
    const subjectId = req.params.subjectId;
    SubjectRepository.deleteSubject(subjectId)
        .then(result => {
            res.status(200).json({message: 'Removed subject', subject: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};