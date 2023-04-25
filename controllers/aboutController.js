const About = require('../models/about');

const getAboutContent = async (req, res) => {
    try {
        const content = await About.find();
        const jsonData = JSON.stringify(content);
        res.set('Content-Type', "application/json");
        res.status(200).json({
            success: 1,
            data: content
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}


const createAboutContent = async (req, res) => {
    try {
        const { content_tm, content_ru, active } = req.body;

        const found = await About.findOne({ content_tm, content_ru });

        if (found) {
            return res.status(200).json({
                success: 0,
                msg: "This content is already exists!"
            });
        }

        const newAbout = await About.create({
            content_tm,
            content_ru,
            active
        });

        res.status(201).json({
            success: 1,
            data: newAbout
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}


const updateAboutContent = async (req, res) => {
    try {
        const { id } = req.params;
        const { content_tm, content_ru, active } = req.body;

        await About.findByIdAndUpdate(id, {
            content_tm,
            content_ru,
            active
        });

        res.status(200).json({
            success: 1,
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}


const deleteAboutContent = async (req, res) => {
    try {
        const { id } = req.params;
        const found = await About.findOne({ _id: id });

        if (!found) {
            return res.status(200).json({ success: 0, msg: 'No About in this id!' });
        }

        const deletedGroup = await About.deleteOne({ _id: id });

        res.status(200).json({
            success: 1,
            data: found
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}

exports.getAboutContent = getAboutContent;
exports.createAboutContent = createAboutContent;
exports.updateAboutContent = updateAboutContent;
exports.deleteAboutContent = deleteAboutContent;