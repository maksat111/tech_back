const bcrypt = require('bcryptjs');
const Admin = require('../models/admins');

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
        const { name, surname, email, phone_number, is_active, password } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10);

        let updatedUser = await Admin.findByIdAndUpdate(id, {
            name,
            surname,
            email,
            phone_number,
            is_active,
            password: encryptedPassword
        });

        updatedUser.name = name;
        updatedUser.surname = surname;
        updatedUser.email = email;
        updatedUser.phone_number = phone_number;
        updatedUser.is_active = is_active;

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