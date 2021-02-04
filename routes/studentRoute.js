const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authUtils = require('../util/authUtils');

router.get('/',authUtils.permitAuthenticatedUserRole_STUDENT, studentController.showStudentList);
router.get('/add', authUtils.permitAuthenticatedUserRole_TEACHER,  studentController.showAddStudentForm);
router.get('/edit/:studId', authUtils.permitAuthenticatedUserRole_TEACHER, studentController.showEditStudentForm);
router.get('/details/:studId', authUtils.permitAuthenticatedUser, studentController.showStudentDetails);
router.post('/add',authUtils.permitAuthenticatedUserRole_TEACHER, studentController.addStudent);
router.post('/edit',authUtils.permitAuthenticatedUserRole_TEACHER, studentController.updateStudent);
router.get('/delete/:studId',authUtils.permitAuthenticatedUserRole_TEACHER, studentController.deleteStudent);

module.exports = router;

