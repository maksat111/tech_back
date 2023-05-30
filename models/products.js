const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name_tm: {
        type: String,
        required: true,
    },
    name_en: {
        type: String,
        default: 'No Name'
    },
    name_ru: {
        type: String,
        default: 'No Name'
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategories'
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brands'
    },
    main_image: {
        type: String,
        default: ''
    },
    images: {
        type: Array,
        default: ''
    },
    desctiption_tm: {
        type: String,
        default: ''
    },
    desctiption_ru: {
        type: String,
        default: ''
    },
    desctiption_en: {
        type: String,
        default: ''
    },
    is_active: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Products", ProductsSchema);