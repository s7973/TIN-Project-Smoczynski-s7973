const StudentRepository = require('../repository/sequelize/StudentRepository');

exports.showStudentList = (req, res, next) => {
    StudentRepository.getStudents()
        .then(stud => {
            res.render('pages/student/list', {
                students: stud,
                navLocation: 'student'
            });
        });
}

exports.showAddStudentForm = (req, res, next) => {
    res.render('pages/student/form', {
        stud: {},
        pageTitle: 'Nowy student',
        formMode: 'createNew',
        btnLabel: 'Dodaj studenta',
        formAction: '/student/add',
        navLocation: 'stud'
    });
}

exports.showEditStudentForm = (req, res, next) => {
    const studId = req.params.studId;
    StudentRepository.getStudentById(studId)
        .then(stud => {
            res.render('pages/student/form', {
                stud: stud,
                formMode: 'edit',
                pageTitle: 'Edycja studenta',
                btnLabel: 'Zapisz zmiany',
                formAction: '/student/edit',
                navLocation: 'stud'
            });
        });
};

exports.showStudentDetails = (req, res, next) => {
    const studId = req.params.studId;
    StudentRepository.getStudentById(studId)
        .then(stud => {
            res.render('pages/student/form', {
                stud: stud,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły studenta',
                formAction: '',
                navLocation: 'stud'
            });
        });
}

exports.addStudent = (req, res, next) => {
    const studData = { ...req.body };
    StudentRepository.createStudent(studData)
        .then( result => {
            res.redirect('/student');
        })
        .catch(err => {
            res.render('pages/student/form', {
                stud: studData,
                pageTitle: 'Dodawanie studenta',
                formMode: 'createNew',
                btnLabel: 'Dodaj studenta',
                formAction: '/student/add',
                navLocation: 'student',
                validationErrors: err.details
            });
        });
};


exports.updateStudent = (req, res, next) => {
    const studId = req.body._id;
    const studData = { ...req.body };
    StudentRepository.updateStudent(studId, studData)
        .then( result => {
            res.redirect('/student');
        });
};

exports.deleteStudent = (req, res, next) => {
    const studId = req.params.studId;
    StudentRepository.deleteStudent(studId)
        .then( () => {
            res.redirect('/student');
        });
};