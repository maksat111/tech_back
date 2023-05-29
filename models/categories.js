const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
    name_tm: {
        type: String,
        default: 'No name'
    },
    name_en: {
        type: String,
        default: 'No name'
    },
    name_ru: {
        type: String,
        default: 'No name'
    },
    image: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Categories", CategoriesSchema);