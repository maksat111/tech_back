const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Admin = require('../models/admins');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const registerUser = async (req, res) => {
    try {
        const { name, surname, phone_number, email, password } = req.body;
        const foundUser = await User.findOne({ $or: [{ email }, { phone_number }] });

        if (foundUser) {
            return res.status(403).json({ success: 0, message: 'This creadentials are not aviable!' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            name,
            surname,
            email,
            phone_number,
            password: encryptedPassword,
        });

        res.status(201).json({ success: 1, data: createdUser });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}

const LoginUser = async (req, res) => {
    try {
        const { password, email, phone_number } = req.body;

        const foundUser = await User.findOne({ $or: [{ email }, { phone_number }] });

        if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
            const token = jwt.sign(
                { user_id: foundUser._id, username },
                process.env.TOKEN_KEY_USER,
                {
                    expiresIn: "15h",
                }
            );

            foundUser.password = undefined;

            return res.status(200).json({ success: 1, data: { ...foundUser._doc, token } });
        }

        res.status(400).json({ success: 0, msg: 'Invalid creadentils!' });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        })
    }
}

const registerAdmin = async (req, res) => {
    try {
        const { name, surname, email, phone_number, password, is_active } = req.body;
        const foundAdmin = await Admin.findOne({ $or: [{ email }, { phone_number }] });

        if (foundAdmin) {
            return res.status(403).json({ success: 0, message: 'This Admin is not aviable!' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const createdAdmin = await Admin.create({
            name,
            surname,
            email,
            phone_number,
            is_active,
            password: encryptedPassword,
        });

        res.status(201).json({ success: 1, data: createdAdmin });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        });
    }
}

const LoginAdmin = async (req, res) => {
    try {
        const { password, email, phone_number } = req.body;

        const foundAdmin = await User.findOne({ $or: [{ email }, { phone_number }], is_active });

        if (foundAdmin && (await bcrypt.compare(password, foundAdmin.password))) {
            const token = jwt.sign(
                { user_id: foundAdmin._id, username },
                process.env.TOKEN_KEY_ADMIN,
                {
                    expiresIn: "15h",
                }
            );

            foundAdmin.password = undefined;

            return res.status(200).json({ success: 1, data: { ...foundAdmin._doc, token } });
        }

        res.status(400).json({ success: 0, msg: 'Invalid credentials!' });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        })
    }
}


exports.LoginUser = LoginUser;
exports.LoginAdmin = LoginAdmin;
exports.registerAdmin = registerAdmin;
exports.registerUser = registerUser;
