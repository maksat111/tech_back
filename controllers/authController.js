const jwt = require('jsonwebtoken');
const Teacher = require('../models/teachers');
const bcrypt = require('bcryptjs');

const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const foundUser = await Teacher.findOne({ username });

        if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
            const token = jwt.sign(
                { user_id: foundUser._id, username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "15h",
                }
            );
            foundUser.token = token;
            return res.status(200).json({ success: 1, data: foundUser });
        }

        res.status(200).json({ success: 0, msg: 'Invalid username or password!' });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        })
    }
}


exports.Login = Login;
