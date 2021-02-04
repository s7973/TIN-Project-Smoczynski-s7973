const SubjectRepository = require('../repository/sequelize/SubjectRepository');

exports.showSubjectList = (req, res, next) => {
    SubjectRepository.getSubjects()
        .then(sub => {
            res.render('pages/subject/list', {
                subject: sub,
                navLocation: 'subject',
                message: req.flash('message')
            });
        });

}



exports.showAddSubjectForm = (req, res, next) => {
    res.render('pages/subject/form', {
        subject: {},
        pageTitle: req.__('subject.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('subject.form.add.btnLabel'),
        formAction: '/subject/add',
        navLocation: 'subject',
        validationErrors: []
    });
}

exports.showEditSubjectForm = (req, res, next) => {
    const subjectId = req.params.subjectId;
    SubjectRepository.getSubjectById(subjectId)
        .then(sub => {
            res.render('pages/subject/form', {
                subject: sub,
                formMode: 'edit',
                pageTitle: req.__('subject.form.edit.pageTitle'),
                btnLabel: req.__('subject.form.edit.btnLabel'),
                formAction: '/subject/edit',
                navLocation: 'subject',
                validationErrors: []
            });
        });
};

exports.showSubjectDetails = (req, res, next) => {
    const subjectId = req.params.subjectId;
    SubjectRepository.getSubjectById(subjectId)
        .then(sub => {
            res.render('pages/subject/form', {
                subject: sub,
                formMode: 'showDetails',
                pageTitle: req.__('subject.form.details.pageTitle'),
                formAction: '',
                navLocation: 'subject',
                validationErrors: []
            });
        });
}

exports.addSubject = (req, res, next) => {
    req.flash('message', req.__('subject.form.add.confirm.text'));
    const subjectData = { ...req.body };
    SubjectRepository.createSubject(subjectData)
        .then( result => {
            res.redirect('/subject');
        })
        .catch(err => {
        res.render('pages/subject/form', {
            subject: subjectData,
            pageTitle: req.__('subject.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('subject.form.add.btnLabel'),
            formAction: '/subject/add',
            navLocation: 'subject',
            validationErrors: err.errors
        });
    });

};

exports.updateSubject = (req, res, next) => {
    req.flash('message', req.__('subject.form.edit.confirm.text'));
    const subjectId = req.body._id;
    const subjectData = { ...req.body };
    SubjectRepository.updateSubject(subjectId, subjectData)
        .then( result => {
            res.redirect('/subject');
        })
        .catch(err => {
            res.render('pages/subject/form', {
                subject: subjectData,
                pageTitle: req.__('subject.form.edit.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('subject.form.edit.btnLabel'),
                formAction: '/subject/add',
                navLocation: 'subject',
                validationErrors: err.errors
            });
        });
};


exports.deleteSubject = (req, res, next) => {
    req.flash('message', req.__('subject.form.delete.text'));
    const subjectId = req.params.subjectId;
    SubjectRepository.deleteSubject(subjectId)
        .then( () => {
            res.redirect('/subject');
        });
};