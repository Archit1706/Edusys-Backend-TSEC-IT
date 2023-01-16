const express = require('express');
const auth = require('../../middlewares/auth');
const labController = require('../../controllers/lab.controller');

const router = express.Router();

router.route('/').post(auth('manageBatches'), labController.createLab).get(labController.getLabs);

router
    .route('/:subjectId')
    .get(labController.getLab)
    .patch(labController.updateLab)
    .delete(auth('manageBatches'), labController.deleteLab);

module.exports = router;
