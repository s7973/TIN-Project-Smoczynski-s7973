const GradeRepository = require('../repository/sequelize/GradeRepository');
const StudentRepository = require('../repository/sequelize/StudentRepository');
const SubjectRepository = require('../repository/sequelize/SubjectRepository');

exports.showGradeList = (req, res, next) => {
    GradeRepository.getGrades()
        .then(grade => {
            res.render('pages/grade/list', {
                grade: grade,
                navLocation: 'grade',
                message: req.flash('message')
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
                pageTitle: req.__('grade.form.add.pageTitle'),
                btnLabel: req.__('grade.form.add.btnLabel'),
                formAction: '/grade/add',
                navLocation: 'grade',
                validationErrors: []
            });
        });
}

exports.showGradeDetails = (req, res, next) => {
    let allStudents, allSubjects;
    StudentRepository.getStudents()
        .then(stud => {
            allStudents = stud;
            return StudentRepository.getStudents();
        });
    SubjectRepository.getSubjects()
        .then(subject => {
            allSubjects = subject;
            return SubjectRepository.getSubjects();
        });
    const gradeId = req.params.gradeId;
    GradeRepository.getGradeById(gradeId)
        .then(grade => {
            res.render('pages/grade/form', {
                grade: grade,
                allStudents: allStudents,
                allSubjects: allSubjects,
                formMode: 'showDetails',
                pageTitle: req.__('grade.form.details.pageTitle'),
                btnLabel: req.__('grade.form.add.btnLabel'),
                formAction: 'grade/details',
                navLocation: 'grade',
                validationErrors: []
            });
        });
};

exports.showEditGradeForm = (req, res, next) => {
    let allStudents, allSubjects;
    StudentRepository.getStudents()
        .then(stud => {
            allStudents = stud;
            return StudentRepository.getStudents();
        });
        SubjectRepository.getSubjects()
        .then(subject => {
            allSubjects = subject;
            return SubjectRepository.getSubjects();
        });
    const gradeId = req.params.gradeId;
    GradeRepository.getGradeById(gradeId)
        .then(grade => {
            res.render('pages/grade/form', {
                grade: grade,
                allStudents: allStudents,
                allSubjects: allSubjects,
                formMode: 'edit',
                pageTitle: req.__('grade.form.details.pageTitle'),
                btnLabel: req.__('grade.form.edit.btnLabel'),
                formAction: '/grade/edit',
                navLocation: 'grade',
                validationErrors: []
            });
        });
};

exports.addGrade = (req, res, next) => {
    req.flash('message', req.__('grade.form.add.confirm.text'));
    const gradeData = { ...req.body };
    GradeRepository.createGrade(gradeData)
        .then( result => {
            res.redirect('/grade');
        });
};

exports.updateGrade= (req, res, next) => {
    req.flash('message', req.__('grade.form.edit.confirm.text'));
    const gradeId = req.body._id;
    const gradeData = { ...req.body };
    GradeRepository.updateGrade(gradeId, gradeData)
        .then( result => {
            res.redirect('/grade');
        });
};


exports.deleteGrade = (req, res, next) => {
    req.flash('message', req.__('grade.form.delete.text'));
    const gradeId = req.params.gradeId;
    GradeRepository.deleteGrade(gradeId)
        .then( () => {
            res.redirect('/grade');
        });
};