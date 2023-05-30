const mongoose = require('mongoose');

const BrandsSchema = new mongoose.Schema({
    name: {
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