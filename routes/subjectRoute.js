const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.get('/', subjectController.showSubjectList);
router.get('/add', subjectController.showAddSubjectForm);
router.get('/edit/:subjectId', subjectController.showEditSubjectForm);
router.get('/details/:subjectId', subjectController.showSubjectDetails);
router.post('/add', subjectController.addSubject);
router.post('/edit', subjectController.updateSubject);
router.get('/delete/:subjectId', subjectController.deleteSubject);

module.exports = router;

