const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    name_tm: {
        type: String,
        default: 'No Name'
    },
    name_en: {
        type: String,
        default: 'No Name'
    },
    name_ru: {
        type: String,
        default: 'No Name'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    image: {
        type: String,
        default: ''
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("News", NewsSchema);