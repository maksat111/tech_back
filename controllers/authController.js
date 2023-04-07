const jwt = require('jsonwebtoken');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const foundUser = await User.findOne({ username });

        if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
            const token = jwt.sign(
                { user_id: foundUser._id, username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "15h",
                }
            );

            foundUser.password = undefined;

            return res.status(200).json({ success: 1, data: { ...foundUser._doc, token } });
        }

        res.status(400).json({ success: 0, msg: 'Invalid username or password!' });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        })
    }
}


exports.Login = Login;
