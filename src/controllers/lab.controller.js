const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { labService } = require('../services');

const createLab = catchAsync(async (req, res) => {
    const subject = await labService.createLab(req.body);
    res.status(httpStatus.CREATED).send(subject);
});

const getLabs = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['semester', 'year']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    options.select = '-attainment';
    options.limit = 100;
    const result = await labService.queryLabs(filter, options);
    res.send(result);
});

const getLab = catchAsync(async (req, res) => {
    const subject = await labService.getLabById(req.params.subjectId);
    if (!subject) {
        throw new ApiError(httpStatus.NOT_FOUND, 'batch not found');
    }
    res.send(subject);
});

const updateLab = catchAsync(async (req, res) => {
    const subject = await labService.updateLabById(req.params.subjectId, req.body);
    res.send(subject);
});

const deleteLab = catchAsync(async (req, res) => {
    await labService.deleteLabById(req.params.subjectId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createLab,
    getLabs,
    getLab,
    updateLab,
    deleteLab,
};
