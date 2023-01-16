const httpStatus = require('http-status');
const { Lab } = require('../models');
const ApiError = require('../utils/ApiError');

const makeArray = (a, b) => {
    var arr = new Array(a);
    for (var i = 0; i < a; i++) arr[i] = new Array(0, 0);
    return arr;
};

const calculateTarget = (attainment) => {
    const temp = makeArray(16, 2); // 2 each 0-sum, 1-count
    console.log(temp);
    const titles = [];
    attainment.forEach((item) => {
        item.data.forEach((data, idx) => {
            titles.push(data.title);
            if (data.value !== null) {
                temp[idx][0] += Number(data.value);
                temp[idx][1] += 1;
            }
        });
    });
    console.log(temp);
    const target = {};
    temp.forEach((item, idx) => {
        target[titles[idx]] = item[0] / item[1];
    });
    console.log(target);
    return target;
};

const createLab = async (userBody) => {
    if (await Lab.isSubjectExists(userBody.subjectCode)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Lab already exists');
    }
    const target = calculateTarget(userBody.attainment);
    userBody.target = target;
    console.log(userBody);
    return Lab.create(userBody);
};

const queryLabs = async (filter, options) => {
    const res = await Lab.paginate(filter, options);
    return res;
};

const getLabById = async (id) => {
    return Lab.findById(id);
};

const updateLabById = async (id, updateBody) => {
    const subject = await getLabById(id);
    if (!subject) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
    }
    Object.assign(subject, updateBody);
    await subject.save();
    return subject;
};

const deleteLabById = async (id) => {
    const subject = await getLabById(id);
    if (!subject) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Lab not found');
    }
    await subject.remove();
    return subject;
};

module.exports = {
    createLab,
    queryLabs,
    getLabById,
    updateLabById,
    deleteLabById,
};
