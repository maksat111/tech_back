const mongoose = require('mongoose');
const date = require('date-and-time');

const BannersSchema = new mongoose.Schema({
    content_tm: {
        type: String,
        default: ''
    },
    content_ru: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: String,
        default: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    },
});

module.exports = mongoose.model("Banners", BannersSchema);