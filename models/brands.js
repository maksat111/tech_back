const mongoose = require('mongoose');

const BrandsSchema = new mongoose.Schema({
    name_tm: {
        type: String,
        default: ''
    },
    name_en: {
        type: String,
        default: ''
    },
    name_ru: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    is_active: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Brands", BrandsSchema);