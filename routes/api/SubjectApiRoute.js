const express = require('express');
const router = express.Router();

const subjectApiController = require('../../api/SubjectAPI');

router.get('/', subjectApiController.getSubjects);
router.get('/:subjectId', subjectApiController.getSubjectById);
router.post('/', subjectApiController.createSubject);
router.put('/:subjectId', subjectApiController.updateSubject);
router.delete('/:subjectId', subjectApiController.deleteSubject);

module.exports = router;