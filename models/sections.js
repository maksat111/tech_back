const mongoose = require('mongoose');
const date = require('date-and-time');

const BreakingRulesSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Students'
    },
    uniform: {
        type: Boolean,
        default: false
    },
    late: {
        type: Boolean,
        default: false
    },
    note: {
        type: String,
        default: null
    },
    created_at: {
        type: String,
        default: date.format(new Date(), 'YYYY-MM-DD'),
    },
});

module.exports = mongoose.model("BreakingRules", BreakingRulesSchema);