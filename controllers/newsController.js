const News = require('../models/news');
const date = require('date-and-time');
const imageUpload = require('../helper/imageUpload');
const fs = require('fs');

const createNews = async (req, res) => {
    try {
        let img = '';
        const { title_tm, title_ru, content_tm, content_ru, section } = req.body;

        if (!title_tm || !title_ru || !content_ru || !content_tm || !section) {
            return res.status(200).json({
                success: 0,
                msg: 'Missing fields!'
            })
        }
        console.log(req.files);
        if (req.files?.image) {
            img = await imageUpload(req.files.image.name, req.files.image.data);
            req.body.image = img;
        }

        const newNews = await News.create(req.body);

        res.status(201).json({
            success: 1,
            data: newNews
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}


const getNews = async (req, res) => {
    try {
        let { limit, page } = req.query;

        if (!limit || limit > 100) {
            limit = 10
        }

        if (!page) {
            page = 1
        }

        page = parseInt(page);
        limit = parseInt(limit);

        const found = await News.find({ show_at: { $lt: Date.now() } })
            .skip(limit * (page - 1))
            .populate('section')
            .limit(limit)
            .sort({ createdAt: 'desc' })
            .exec();

        const count = await News.countDocuments();

        found.content_ru = undefined;
        found.content_tm = undefined;
        found.created_at = undefined;

        res.status(200).json({
            success: 1,
            count,
            data: found,
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        })
    }
}


const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;

        const foundNews = await News.findOne({ _id: id });

        if (!foundNews) {
            return res.status(200).json({ success: 0, msg: 'No News in this id!' });
        }

        foundNews.image !== '' && await fs.unlinkSync(foundNews.image);

        const deletedNews = await News.deleteOne({ _id: id });

        res.status(200).json({
            success: 1,
            data: foundNews
        });
    } catch (err) {
        res.status(500).json({
            success: 0,
            msg: err.message
        });
    }
}

const updateNews = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.files?.image) {
            img = await imageUpload(req.files.image.name, req.files.image.data);
            req.body.image = img;
        }

        await News.findByIdAndUpdate(id, req.body);

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


const getNewsBySection = async (req, res) => {
    try {
        const { id } = req.params;
        let { limit, page } = req.query;

        if (!limit || limit > 100) {
            limit = 10
        }

        if (!page) {
            page = 1
        }

        page = parseInt(page);
        limit = parseInt(limit);

        const found = await News.find({ show_at: { $lt: Date.now() }, section: id })
            .skip(limit * (page - 1))
            .limit(limit)
            .populate('section')
            .sort({ createdAt: 'desc' })
            .exec();

        found.content_ru = undefined;
        found.content_tm = undefined;
        found.created_at = undefined;

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


const getNewsDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const found = await News.findOne({ _id: id }).populate('section');

        await News.findByIdAndUpdate(id, { view: ++found.view });

        found.created_at = undefined;

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

exports.getNews = getNews;
exports.createNews = createNews;
exports.deleteNews = deleteNews;
exports.updateNews = updateNews;
exports.getNewsDetail = getNewsDetail;
exports.getNewsBySection = getNewsBySection;