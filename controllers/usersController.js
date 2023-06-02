const User = require('../models/users');
const bcrypt = require('bcryptjs');

const getUser = async (req, res) => {
    try {
        const Users = await User.find();

        Users.forEach(item => item.password = undefined)

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
        const { new_password, password } = req.body;

        const foundUser = await User.findOne({ _id: id });

        if (new_password && (await bcrypt.compare(password, foundUser.password))) {
            req.body.password = await bcrypt.hash(new_password, 10);
        } else {
            req.body.password = undefined;
        }

        let updatedUser = await User.findByIdAndUpdate(id, req.body);

        req.body.new_password = undefined;

        res.status(200).json({
            success: 1,
            data: req.body
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