const User = require('../models/users');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    try {
        const { name, surname, username, password } = req.body;
        const foundUser = await User.findOne({ username });

        if (foundUser) {
            return res.status(403).json({ success: 0, message: 'This username is not aviable!' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const User = await User.create({
            name,
            surname,
            username,
            password: encryptedPassword,
        });

        res.status(201).json({ success: 1, data: User });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}


const getAllUsers = async (req, res) => {
    try {
        const Users = await User.find();

        res.status(200).json({
            success: 1,
            data: Users
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}


const deleteUser = async (req, res) => {
    try {
        const { User_id } = req.params;
        const foundUser = await User.findOne({ _id: User_id });

        if (!foundUser) {
            return res.status(200).json({ success: 0, msg: 'No User in this id!' });
        }

        const deletedUser = await User.deleteOne({ _id: User_id });

        res.status(200).json({
            success: 1,
            data: foundUser
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const { User_id } = req.params;
        const { name, surname, username, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        let updatedUser = await User.findByIdAndUpdate(User_id, {
            name,
            surname,
            username,
            password: encryptedPassword
        });

        updatedUser.name = name;
        updatedUser.surname = surname;
        updatedUser.username = username;
        updatedUser.password = encryptedPassword;

        res.status(200).json({
            success: 1,
            data: updatedUser
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}

exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;