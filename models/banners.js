const mongoose = require('mongoose');
const date = require('date-and-time');

const BannersSchema = new mongoose.Schema({
    url: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: ''
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Banners", BannersSchema);