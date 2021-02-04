const StudentRepository = require('../repository/sequelize/StudentRepository');
const authUtil = require('../util/authUtils');

exports.showAddUserForm = (req, res, next) => {
    res.render('pages/register', {
        stud: {},
        pageTitle: req.__('student.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('student.form.add.btnLabel'),
        formAction: '/register',
        navLocation: 'main',
        validationErrors: [],
        message: req.flash('message')
            });
}

exports.addUser = (req, res, next) => {
    const studData = { ...req.body };
    if (studData.password != '') studData.password = authUtil.hashPassword(studData.password);
    studData.accessLevel = 1;
    if (studData.studentAlias == '') studData.studentAlias = null;
    StudentRepository.createStudent(studData)
        .then( result => {
            res.redirect('/register');
        })
        .catch(err => {
            res.render('pages/register', {
                stud: studData,
                pageTitle: req.__('student.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('student.form.add.btnLabel'),
                formAction: '/register',
                navLocation: 'main',
                validationErrors: err.errors,
                message: req.flash('')
            });
        });
    req.flash('message', req.__('student.form.add.confirm.text'));
};