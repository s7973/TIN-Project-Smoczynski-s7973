const express = require('express');
const router = express.Router();

const studentApiController = require('../../api/StudentAPI');

router.get('/', studentApiController.getStudents);
router.get('/:studentId', studentApiController.getStudentById);
router.post('/', studentApiController.createStudent);
router.put('/:studentId', studentApiController.updateStudent);
router.delete('/:studentId', studentApiController.deleteStudent);

module.exports = router;