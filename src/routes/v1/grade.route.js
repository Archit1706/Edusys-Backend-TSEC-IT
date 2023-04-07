const express = require('express');
const auth = require('../../middlewares/auth');
const gradeController = require('../../controllers/grade.controller');

const router = express.Router();

router.route('/').get(gradeController.getGrades);
router.route('/all').get(gradeController.getAllGrades);

router.route('/calculate').post(gradeController.calculateGrades);

router.route('/:gradeId').get(gradeController.getGrade).delete(auth('manageBatches'), gradeController.deleteGrade);

router.route('/assign').post(gradeController.assignSubject);
router.route('/assignLab').post(gradeController.assignLab);

module.exports = router;
