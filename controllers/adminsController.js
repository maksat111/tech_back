const Admin = require('../models/admins');
const bcrypt = require('bcryptjs');

const getAdmin = async (req, res) => {
    try {
        const Admins = await Admin.find();

        res.status(200).json({
            success: 1,
            data: Admins
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}


const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const foundUser = await Admin.findOne({ _id: id });

        if (!foundUser) {
            return res.status(200).json({ success: 0, msg: 'No Admin in this id!' });
        }

        const deletedUser = await Admin.deleteOne({ _id: id });

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

const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, email, phone_number } = req.body;

        let updatedUser = await User.findByIdAndUpdate(id, {
            name,
            surname,
            email,
            phone_number
        });

        updatedUser.name = name;
        updatedUser.surname = surname;
        updatedUser.email = email;
        updatedUser.phone_number = phone_number;

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


exports.getAdmin = getAdmin;
exports.deleteAdmin = deleteAdmin;
exports.updateAdmin = updateAdmin;