const mongoose = require('mongoose');

const BannersSchema = new mongoose.Schema({
    url: {
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
    timestamps: true,
});

module.exports = mongoose.model("Banners", BannersSchema);