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


const create = async (req, res) => {
    try {
        const { name_tm, name_ru } = req.body;

        const found = await Section.findOne({ name_tm, name_ru });

        if (found) {
            return res.status(200).json({
                success: 0,
                msg: "This section is already exists!"
            });
        }

        const newSection = await Section.create({
            name_tm,
            name_ru,
        });

        res.status(201).json({
            success: 1,
            data: newSection
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}


const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_tm, name_ru } = req.body;

        const updatedSection = await Section.findByIdAndUpdate(id, {
            name_tm,
            name_ru,
        });

        updatedSection.name_ru = name_ru;
        updatedSection.name_tm = name_tm;

        res.status(200).json({
            success: 1,
            data: updatedSection
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}


const deleteSection = async (req, res) => {
    try {
        const { id } = req.params;
        const found = await Section.findOne({ _id: id });

        if (!found) {
            return res.status(200).json({ success: 0, msg: 'No Section in this id!' });
        }

        const deletedGroup = await Section.deleteOne({ _id: id });

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

exports.getSections = getSections;
exports.create = create;
exports.update = update;
exports.deleteSection = deleteSection;