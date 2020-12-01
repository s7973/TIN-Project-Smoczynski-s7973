const GradeRepository = require('../repository/sequelize/GradeRepository');
const StudentRepository = require('../repository/sequelize/StudentRepository');
const SubjectRepository = require('../repository/sequelize/SubjectRepository');

exports.showGradeList = (req, res, next) => {
    GradeRepository.getGrades()
        .then(grade => {
            res.render('pages/grade/list', {
                grade: grade,
                navLocation: 'grade'
            });
        });
}

exports.showAddGradeForm = (req, res, next) => {
    let allStudents, allSubjects;
    StudentRepository.getStudents()
        .then(stud => {
            allStudents = stud;
            return SubjectRepository.getSubjects();
        })
        .then(subject => {
            allSubjects = subject;
            res.render('pages/grade/form', {
                grade: {},
                formMode: 'createNew',
                allStudents: allStudents,
                allSubjects: allSubjects,
                pageTitle: 'Nowa ocena',
                btnLabel: 'Dodaj ocenę',
                formAction: '/grade/add',
                navLocation: 'grade'
            });
        });
}

exports.showGradeDetails = (req, res, next) => {
    let allStudents, allSubjects;
    StudentRepository.getStudents()
        .then(stud => {
            allStudents = stud;
            return SubjectRepository.getSubjects();
        })
        .then(subject => {
            allSubjects = subject;
            res.render('pages/grade/form', {
                grade: {},
                formMode: 'showDetails',
                allStudents: allStudents,
                allSubjects: allSubjects,
                pageTitle: 'Nowa ocena',
                btnLabel: 'Dodaj ocenę',
                formAction: '',
                navLocation: 'grade'
            });
        });
}



exports.showEditGradeForm = (req, res, next) => {
    let allStudents, allSubjects;
    StudentRepository.getStudents()
        .then(stud => {
            allStudents = stud;
            return SubjectRepository.getSubjects();
        })
        .then(subject => {
            allSubjects = subject;
            res.render('pages/grade/form', {
                grade: {},
                formMode: 'edit',
                allStudents: allStudents,
                allSubjects: allSubjects,
                pageTitle: 'Szczegóły oceny',
                btnLabel: 'Zapisz zmiany',
                formAction: '/grade/edit',
                navLocation: 'grade'
            });
        });
}

exports.addGrade = (req, res, next) => {
    const gradeData = { ...req.body };
    GradeRepository.createGrade(gradeData)
        .then( result => {
            res.redirect('/grade');
        });
};

exports.updateGrade= (req, res, next) => {
    const gradeId = req.body._id;
    const gradeData = { ...req.body };
    GradeRepository.updateGrade(gradeId, gradeData)
        .then( result => {
            res.redirect('/grade');
        });
};

exports.deleteGrade = (req, res, next) => {
    const gradeId = req.params.gradeId;
    GradeRepository.deleteGrade(gradeId)
        .then( () => {
            res.redirect('/grade');
        });
};