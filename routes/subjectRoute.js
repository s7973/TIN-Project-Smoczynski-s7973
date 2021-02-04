const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const authUtils = require('../util/authUtils');

router.get('/',authUtils.permitAuthenticatedUserRole_STUDENT, subjectController.showSubjectList);
router.get('/add', authUtils.permitAuthenticatedUserRole_TEACHER, subjectController.showAddSubjectForm);
router.get('/edit/:subjectId', authUtils.permitAuthenticatedUserRole_TEACHER, subjectController.showEditSubjectForm);
router.get('/details/:subjectId', authUtils.permitAuthenticatedUserRole_TEACHER, subjectController.showSubjectDetails);
router.post('/add', authUtils.permitAuthenticatedUserRole_TEACHER, subjectController.addSubject);
router.post('/edit', authUtils.permitAuthenticatedUserRole_TEACHER, subjectController.updateSubject);
router.get('/delete/:subjectId', authUtils.permitAuthenticatedUserRole_TEACHER, subjectController.deleteSubject);

module.exports = router;

