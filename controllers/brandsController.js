const fs = require('fs');
const Brand = require('../models/brands');
const imageUpload = require('../helper/imageUpload');

const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json({
            success: 1,
            data: brands
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
        const { name, is_active } = req.body;

        const found = await Brand.findOne({ name });

        if (found) {
            return res.status(200).json({
                success: 0,
                msg: "This brand is already exists!"
            });
        }

        if (req.files?.image) {
            img = await imageUpload(req.files.image.name, req.files.image.data);
            req.body.image = img;
        }

        const newBrand = await Brand.create({
            name,
            image: req.body.image,
            is_active
        });

        res.status(201).json({
            success: 1,
            data: newBrand
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
        const { name, is_active } = req.body;

        const found = await Brand.findOne({ _id: id });

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

        const updatedBrand = await Brand.findByIdAndUpdate(id, {
            name,
            image: req.body.image,
            is_active
        });

        updatedBrand.name = name;
        updatedBrand.is_active = is_active;
        updatedBrand.image = req.body.image;

        res.status(200).json({
            success: 1,
            data: updatedBrand
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}


const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        const found = await Brand.findOne({ _id: id });

        if (!found) {
            return res.status(200).json({ success: 0, msg: 'No Brand in this id!' });
        }

        found.image && await fs.unlinkSync(found.image);

        const deletedCategory = await Brand.deleteOne({ _id: id });

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

exports.getBrands = getBrands;
exports.create = create;
exports.update = update;
exports.deleteBrand = deleteBrand;