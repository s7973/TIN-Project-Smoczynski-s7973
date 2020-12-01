const express = require('express');
const router = express.Router();

const gradeApiController = require('../../api/GradeAPI');

router.get('/', gradeApiController.getGrades);
router.post('/', gradeApiController.createGrade);
router.put('/:gradeId', gradeApiController.updateGrade);
router.delete('/:gradeId', gradeApiController.deleteGrade);

module.exports = router;