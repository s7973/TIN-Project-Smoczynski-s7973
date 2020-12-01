const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.showStudentList);
router.get('/add', studentController.showAddStudentForm);
router.get('/edit/:studId', studentController.showEditStudentForm);
router.get('/details/:studId', studentController.showStudentDetails);
router.post('/add', studentController.addStudent);
router.post('/edit', studentController.updateStudent);
router.get('/delete/:studId', studentController.deleteStudent);

module.exports = router;

