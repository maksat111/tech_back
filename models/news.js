const mongoose = require('mongoose');
const date = require('date-and-time');

const NewsSchema = new mongoose.Schema({
    title_tm: {
        type: String,
        default: 'No title'
    },
    title_ru: {
        type: String,
        default: 'No title'
    },
    content_tm: {
        type: String,
        default: 'No content'
    },
    content_ru: {
        type: String,
        default: 'No content'
    },
    image: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: null
    },
    phone_number: {
        type: String,
        default: null
    },
    section_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sections'
    },
    created_at: {
        type: String,
        default: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    },
});

module.exports = mongoose.model("News", NewsSchema);