const Banner = require('../models/banners');
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

        let randomNumber_tm = Math.floor(Math.random() * 999999999999);
        let img_direction = `./uploads/` + randomNumber_tm + `${req.files.image.name}`;
        fs.writeFile(img_direction, req.files.image.data, function (err) { console.log(err) });

        const newBanner = await Banner.create({
            url,
            active,
            image: img_direction
        });

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

        await fs.unlinkSync(found.image);
        let randomNumber_tm = Math.floor(Math.random() * 999999999999);
        let img_direction = `./uploads/` + randomNumber_tm + `${req.files.image.name}`;
        fs.writeFile(img_direction, req.files.image.data, function (err) { console.log(err) });

        const updatedBanner = await Banner.findByIdAndUpdate(id, {
            url,
            active,
            image: img_direction
        });

        updatedBanner.url = url;
        updatedBanner.active = active;
        updatedBanner.image = img_direction;

        res.status(200).json({
            success: 1,
            data: updatedBanner
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

        await fs.unlinkSync(found.image);

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