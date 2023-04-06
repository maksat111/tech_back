const mongoose = require('mongoose');
const date = require('date-and-time');

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        default: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
    },
});

module.exports = mongoose.model("Users", UsersSchema);