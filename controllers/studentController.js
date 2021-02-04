const StudentRepository = require('../repository/sequelize/StudentRepository');
const RoleRepository = require('../repository/sequelize/RoleRepository');
const authUtil = require('../util/authUtils');

exports.showStudentList = (req, res, next) => {
    StudentRepository.getStudents()
        .then(stud => {
            res.render('pages/student/list', {
                students: stud,
                navLocation: 'student',
                message: req.flash('message')
            });
        });
}

exports.showAddStudentForm = (req, res, next) => {
    let allRoles;
    RoleRepository.getRoles()
        .then(role => {
            allRoles = role;
        res.render('pages/student/form', {
        stud: {},
        allRoles: allRoles,
        pageTitle: req.__('student.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('student.form.add.btnLabel'),
        formAction: '/student/add',
        navLocation: 'student',
        validationErrors: []
        });
        });
}

exports.showEditStudentForm = (req, res, next) => {
    let allRoles;
    RoleRepository.getRoles()
        .then(role => {
            allRoles = role;
            return RoleRepository.getRoles();
        });
    const studId = req.params.studId;
    StudentRepository.getStudentById(studId)
        .then(stud => {
            res.render('pages/student/form', {
                stud: stud,
                formMode: 'edit',
                allRoles: allRoles,
                pageTitle: req.__('student.form.edit.pageTitle'),
                btnLabel: req.__('student.form.edit.btnLabel'),
                formAction: '/student/edit',
                navLocation: 'student',
                validationErrors: []
            });
        });
}

exports.showStudentDetails = (req, res, next) => {
    let allRoles;
    RoleRepository.getRoles()
        .then(role => {
            allRoles = role;
            return RoleRepository.getRoles();
        });
    const studId = req.params.studId;
    StudentRepository.getStudentById(studId)
        .then(stud => {
            res.render('pages/student/form', {
                stud: stud,
                formMode: 'showDetails',
                allRoles: allRoles,
                pageTitle: req.__('student.form.details.pageTitle'),
                formAction: '',
                navLocation: 'student',
                validationErrors: []
            });
        });
}

exports.addStudent = (req, res, next) => {
    let allRoles;
    RoleRepository.getRoles()
        .then(role => {
            allRoles = role;
            return RoleRepository.getRoles();
        });
    const studData = { ...req.body };
    studData.password = authUtil.hashPassword(studData.password);
    studData.accessLevel = 1;
    if (studData.studentAlias == '') studData.studentAlias = null;
    StudentRepository.createStudent(studData)
        .then( result => {
            res.redirect('/student');
        })
        .catch(err => {
            res.render('pages/student/form', {
                stud: studData,
                allRoles: allRoles,
                pageTitle: req.__('student.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('student.form.add.btnLabel'),
                formAction: '/student/add',
                navLocation: 'student',
                validationErrors: err.errors
            });
        });
    req.flash('message', req.__('student.form.add.confirm.text'));
};


exports.updateStudent = (req, res, next) => {
    const studId = req.body._id;
    const studData = { ...req.body };
    studData.password = authUtil.hashPassword(studData.password);
    StudentRepository.updateStudent(studId, studData)
        .then( result => {
            res.redirect('/student');
        })
        .catch(err => {
            res.render('pages/student/form', {
                stud: studData,
                pageTitle: req.__('student.form.edit.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('student.form.edit.btnLabel'),
                formAction: '/student/add',
                navLocation: 'student',
                validationErrors: err.errors
            });
        });
    req.flash('message', req.__('student.form.edit.confirm.text'));
};



exports.deleteStudent = (req, res, next) => {
    req.flash('message', req.__('student.form.delete.text'));
    const studId = req.params.studId;
    StudentRepository.deleteStudent(studId)
        .then( () => {
            res.redirect('/student');
        });
};
