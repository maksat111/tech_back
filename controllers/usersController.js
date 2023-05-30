const User = require('../models/users');

const getUser = async (req, res) => {
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
        const { id } = req.params;
        const foundUser = await User.findOne({ _id: id });

        if (!foundUser) {
            return res.status(200).json({ success: 0, msg: 'No User in this id!' });
        }

        const deletedUser = await User.deleteOne({ _id: id });

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
        const { id } = req.params;
        const { name, surname, username } = req.body;

        let updatedUser = await User.findByIdAndUpdate(id, {
            name,
            surname,
            username,
        });

        updatedUser.name = name;
        updatedUser.surname = surname;
        updatedUser.username = username;

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


exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;