const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const labSchema = mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    subjectCode: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['Theory', 'Lab'],
        default: 'Lab',
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    target: Object,
    attainment: {
        type: [
            {
                co: String,
                description: String,
                data: [
                    {
                        title: String,
                        value: Number,
                    },
                ],
            },
        ],
        required: true,
    },
});

// add plugin that converts mongoose to json
labSchema.plugin(toJSON);
labSchema.plugin(paginate);

labSchema.statics.isSubjectExists = async function (subjectCode) {
    const batch = await this.findOne({ subjectCode });
    return !!batch;
};

/**
 * @typedef Token
 */
const Lab = mongoose.model('Lab', labSchema);

module.exports = Lab;
