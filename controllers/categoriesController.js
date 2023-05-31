const fs = require('fs');
const Category = require('../models/categories');
const imageUpload = require('../helper/imageUpload');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: 1,
            data: categories
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
        const { name_tm, name_ru, name_en, is_active } = req.body;

        const found = await Category.findOne({ name_tm, name_ru, name_en });

        if (found) {
            return res.status(200).json({
                success: 0,
                msg: "This category is already exists!"
            });
        }

        if (req.files?.image) {
            img = await imageUpload(req.files.image.name, req.files.image.data);
            req.body.image = img;
        }

        const newCategory = await Category.create({
            name_tm,
            name_ru,
            name_en,
            is_active,
            image: req.body.image
        });

        res.status(201).json({
            success: 1,
            data: newCategory
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
        const { name_tm, name_ru, name_en, is_active } = req.body;

        const found = await Category.findOne({ _id: id });

        if (!found) {
            return res.status(404).json({
                success: 0,
                msg: "No Category on this id!"
            });
        }

        if (req.files?.image) {
            img = await imageUpload(req.files.image.name, req.files.image.data);
            await fs.unlinkSync(found.image)
            req.body.image = img;
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, {
            name_tm,
            name_ru,
            name_en,
            is_active,
            image: req.body.image
        });

        updatedCategory.name_ru = name_ru;
        updatedCategory.name_tm = name_tm;
        updatedCategory.name_en = name_en;
        updatedCategory.is_active = is_active;
        updatedCategory.image = req.body.image;

        res.status(200).json({
            success: 1,
            data: updatedCategory
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}


const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const found = await Category.findOne({ _id: id });

        if (!found) {
            return res.status(200).json({ success: 0, msg: 'No Category in this id!' });
        }

        if (req.files?.image) {
            img = await imageUpload(req.files.image.name, req.files.image.data);
            await fs.unlinkSync(found.image);
            req.body.image = img;
        }

        const deletedCategory = await Category.deleteOne({ _id: id });

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

exports.getCategories = getCategories;
exports.create = create;
exports.update = update;
exports.deleteCategory = deleteCategory;