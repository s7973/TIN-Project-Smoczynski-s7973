const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const authUtils = require('../util/authUtils');

router.get('/',authUtils.permitAuthenticatedUserRole_STUDENT, gradeController.showGradeList);
router.get('/add', authUtils.permitAuthenticatedUserRole_TEACHER, gradeController.showAddGradeForm);
router.get('/edit/:gradeId', authUtils.permitAuthenticatedUserRole_TEACHER, gradeController.showEditGradeForm);
router.get('/details/:gradeId', authUtils.permitAuthenticatedUserRole_STUDENT, gradeController.showGradeDetails);
router.post('/add', authUtils.permitAuthenticatedUserRole_TEACHER, gradeController.addGrade);
router.post('/edit/', authUtils.permitAuthenticatedUserRole_TEACHER, gradeController.updateGrade);
router.get('/delete/:gradeId', authUtils.permitAuthenticatedUserRole_TEACHER, gradeController.deleteGrade);

module.exports = router;

