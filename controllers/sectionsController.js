const Section = require('../models/sections');

const getSections = async (req, res) => {
    try {
        const sections = await Section.find();
        res.status(200).json({
            success: 1,
            data: sections
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}

exports.getSections = getSections;