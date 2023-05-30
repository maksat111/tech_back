const Subcategory = require('../models/subcategories');
const imageUpload = require('../helper/imageUpload');

const getSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find();
        res.status(200).json({
            success: 1,
            data: subcategories
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
        const { name_tm, name_ru, name_en, category } = req.body;

        const found = await Subcategory.findOne({ name_tm, name_ru, name_en });

        if (found) {
            return res.status(200).json({
                success: 0,
                msg: "This Subcategory is already exists!"
            });
        }

        if (req.files?.image) {
            img = await imageUpload(req.files.image.name, req.files.image.data);
            req.body.image = img;
        }

        const newSubCategory = await Category.create({
            name_tm,
            name_ru,
            name_en,
            category,
            image: req.body.image
        });

        res.status(201).json({
            success: 1,
            data: newSubCategory
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
        const { name_tm, name_ru, name_en, category } = req.body;

        const found = await Subcategory.findOne({ _id: id });

        if (!found) {
            return res.status(404).json({
                success: 0,
                msg: "No SubCategory on this id!"
            });
        }

        if (req.files?.image) {
            img = await imageUpload(req.files.image.name, req.files.image.data);
            await fs.unlinkSync(found.image)
            req.body.image = img;
        }

        const updatedSubCategory = await Subcategory.findByIdAndUpdate(id, {
            name_tm,
            name_ru,
            name_en,
            category,
            image: req.body.image
        });

        updatedSubCategory.name_ru = name_ru;
        updatedSubCategory.name_tm = name_tm;
        updatedSubCategory.name_en = name_en;
        updatedSubCategory.category = category;
        updatedSubCategory.image = req.body.image;

        res.status(200).json({
            success: 1,
            data: updatedSubCategory
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}


const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const found = await Subcategory.findOne({ _id: id });

        if (!found) {
            return res.status(200).json({ success: 0, msg: 'No Category in this id!' });
        }

        if (req.files?.image) {
            img = await imageUpload(req.files.image.name, req.files.image.data);
            await fs.unlinkSync(found.image);
            req.body.image = img;
        }

        const deletedSubCategory = await Subcategory.deleteOne({ _id: id });

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

exports.getSubcategories = getSubcategories;
exports.create = create;
exports.update = update;
exports.deleteSubCategory = deleteSubCategory;