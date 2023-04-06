const mongoose = require('mongoose');
const date = require('date-and-time');

const SectionsSchema = new mongoose.Schema({
    name_tm: {
        type: String,
        default: 'No name'
    },
    name_ru: {
        type: String,
        default: 'No name'
    },
    created_at: {
        type: String,
        default: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    },
});

module.exports = mongoose.model("Sections", SectionsSchema);