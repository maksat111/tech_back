const mongoose = require('mongoose');

const AdminsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: ''
    },
    phone_number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Admins", AdminsSchema);