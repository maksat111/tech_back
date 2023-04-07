const Banner = require('../models/banners');
const imageUpload = require('../helper/imageUpload');
const fs = require('fs');

const getBanner = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.status(200).json({
            success: 1,
            data: banners
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}


const createBanner = async (req, res) => {
    try {
        const { url, active } = req.body;

        if (req.files?.image) {
            img = await imageUpload(req.files.image.name, req.files.image.data);
            req.body.image = img;
        }

        const newBanner = await Banner.create(req.body);

        res.status(201).json({
            success: 1,
            data: newBanner
        })
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}


const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const { url, active } = req.body;

        const found = await Banner.findOne({ _id: id });

        if (!found) {
            return res.status(404).json({
                success: 0,
                msg: "No banner on this id!"
            });
        }

        if (req.files?.image) {
            img = await imageUpload(req.files.image.name, req.files.image.data);
            req.body.image = img;
        }

        const updatedBanner = await Banner.findByIdAndUpdate(id, req.body);

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


const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const found = await Banner.findOne({ _id: id });

        if (!found) {
            return res.status(200).json({ success: 0, msg: 'No Banner in this id!' });
        }

        const deletedBanner = await Banner.deleteOne({ _id: id });

        found.image !== '' && await fs.unlinkSync(found.image);

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

exports.getBanner = getBanner;
exports.createBanner = createBanner;
exports.updateBanner = updateBanner;
exports.deleteBanner = deleteBanner;