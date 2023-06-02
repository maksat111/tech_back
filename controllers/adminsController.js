const bcrypt = require('bcryptjs');
const Admin = require('../models/admins');

const getAdmin = async (req, res) => {
    try {
        const Admins = await Admin.find();

        Admins.forEach(item => item.password = undefined);

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
        const { new_password, password } = req.body;

        const foundUser = await Admin.findOne({ _id: id });

        if (new_password && (await bcrypt.compare(password, foundUser.password))) {
            req.body.password = await bcrypt.hash(new_password, 10);
        } else {
            req.body.password = undefined;
        }

        let updatedUser = await Admin.findByIdAndUpdate(id, req.body);

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


exports.getAdmin = getAdmin;
exports.deleteAdmin = deleteAdmin;
exports.updateAdmin = updateAdmin;