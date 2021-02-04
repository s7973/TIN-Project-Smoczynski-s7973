const StudentRepository = require('../repository/sequelize/StudentRepository');
const authUtil = require("../util/authUtils");

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    StudentRepository.findByEmail(email)
        .then(stud => {
            if(!stud) {
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('logging.message')
                })
            } else if(authUtil.comparePasswords(password, stud.password) === true) {
                req.session.loggedUser = stud;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: req.__('logging.message')
                })
            }
        })
        .catch(err => {
            console.log(err);
        });


}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}