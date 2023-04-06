const jwt = require('jsonwebtoken');
const Teacher = require('../models/teachers');
const bcrypt = require('bcryptjs');

const createTeacher = async (req, res) => {
    try {
        const { username, password } = req.body;

        const foundTeacher = await Teacher.findOne({ username });

        if (foundTeacher) {
            return res.status(200).json({ success: 0, msg: 'User already exists!' });
        }

        const newTeacher = await Teacher.create({
            name: 'Test',
            surname: 'Test',
            username,
            password: bcrypt.hashSync(password, 10),
        });

        res.status(200).json({ success: 1, data: { username, password } });
    } catch (err) {
        res.status(500).json({ success: 0, msg: err.message })
    }
}

const teacherLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const foundTeacher = await Teacher.findOne({ username });

        if (foundTeacher && (await bcrypt.compare(password, foundTeacher.password))) {
            const token = jwt.sign(
                { teacher_id: foundTeacher._id, username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "15h",
                }
            );
            foundTeacher.token = token;
            return res.status(200).json({ success: 1, data: foundTeacher });
        }

        res.status(200).json({ success: 0, msg: 'Invalid username or password!' });
    } catch (err) {
        res.status(500).json({
            success: 0,
            message: err.message
        })
    }
}


exports.teacherLogin = teacherLogin;
exports.createTeacher = createTeacher;