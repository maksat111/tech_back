const News = require('../models/news');
const date = require('date-and-time');

const createNews = async (req, res) => {
    try {
        const { title_tm, title_ru, content_tm, content_ru, author, phone_number, section, show_at } = req.body;

        if (!title_tm || !title_ru || !content_ru || !content_tm || !section) {
            return res.status(200).json({
                success: 0,
                msg: 'Missing fields!'
            })
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

        const found = await News.find({ show_at: { $lt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss') } })
            .skip(limit * (page - 1))
            .limit(limit)
            .sort({ show_at: 'asc' })
            .exec();

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


const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;

        const foundNews = await News.findOne({ _id: id });

        if (!foundNews) {
            return res.status(200).json({ success: 0, msg: 'No News in this id!' });
        }

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

        const found = await News.find({ show_at: { $lt: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss') }, section: id })
            .skip(limit * (page - 1))
            .limit(limit)
            .sort({ show_at: 'asc' })
            .exec();

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

        const found = await News.find({ _id: id });
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