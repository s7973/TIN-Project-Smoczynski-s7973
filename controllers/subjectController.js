const SubjectRepository = require('../repository/sequelize/SubjectRepository');

exports.showSubjectList = (req, res, next) => {
    SubjectRepository.getSubjects()
        .then(sub => {
            res.render('pages/subject/list', {
                subject: sub,
                navLocation: 'subject'
            });
        });
}

exports.showAddSubjectForm = (req, res, next) => {
    res.render('pages/subject/form', {
        subject: {},
        pageTitle: 'Nowy przedmiot',
        formMode: 'createNew',
        btnLabel: 'Dodaj przedmiot',
        formAction: '/subject/add',
        navLocation: 'subject'
    });
}

exports.showEditSubjectForm = (req, res, next) => {
    const subjectId = req.params.subjectId;
    SubjectRepository.getSubjectById(subjectId)
        .then(sub => {
            res.render('pages/subject/form', {
                subject: sub,
                formMode: 'edit',
                pageTitle: 'Edycja przedmiotu',
                btnLabel: 'Zapisz zmiany',
                formAction: '/subject/edit',
                navLocation: 'subject'
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
                pageTitle: 'Szczegóły przedmiotu',
                formAction: '',
                navLocation: 'subject'
            });
        });
}

exports.addSubject = (req, res, next) => {
    const subjectData = { ...req.body };
    SubjectRepository.createSubject(subjectData)
        .then( result => {
            res.redirect('/subject');
        });
};

exports.updateSubject = (req, res, next) => {
    const subjectId = req.body._id;
    const subjectData = { ...req.body };
    SubjectRepository.updateSubject(subjectId, subjectData)
        .then( result => {
            res.redirect('/subject');
        });
};

exports.deleteSubject = (req, res, next) => {
    const subjectId = req.params.subjectId;
    SubjectRepository.deleteSubject(subjectId)
        .then( () => {
            res.redirect('/subject');
        });
};