const fs = require("fs");
const Product = require("../models/products");
const imageUpload = require("../helper/imageUpload");

const getProducts = async (req, res) => {
  try {
    const { search } = req.query;

    let config = {};

    if (search) {
      config = {
        $or: [
          { name_en: { $regex: `(?i)${search}` } },
          { name_ru: { $regex: `(?i)${search}` } },
          { name_tm: { $regex: `(?i)${search}` } },
        ],
      };
    }

    const categories = await Product.find(config).populate("brand category");

    res.status(200).json({
      success: 1,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const getProductsByCatId = async (req, res) => {
  try {
    const { id } = req.params;

    const categories = await Product.find({ category: id }).populate(
      "brand category"
    );

    res.status(200).json({
      success: 1,
      data: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const categories = await Product.find({ _id: id }).populate(
      "brand category"
    );

    res.status(200).json({
      success: 1,
      data: categories[0],
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { name_tm, name_ru, name_en } = req.body;

    const found = await Product.findOne({ name_tm, name_ru, name_en });

    if (found) {
      return res.status(200).json({
        success: 0,
        msg: "This product is already exists!",
      });
    }

    if (req.files?.main_image) {
      img = await imageUpload(
        req.files.main_image.name,
        req.files.main_image.data
      );
      req.body.main_image = img;
    }

    const newCategory = await Product.create(req.body);

    res.status(201).json({
      success: 1,
      data: newCategory,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const found = await Product.findOne({ _id: id });

    if (!found) {
      return res.status(404).json({
        success: 0,
        msg: "No Product on this id!",
      });
    }

    if (req.files?.main_image) {
      img = await imageUpload(
        req.files.main_image.name,
        req.files.main_image.data
      );
      await fs.unlinkSync(found.main_image);
      req.body.main_image = img;
    }

    if (!req.files?.main_image) {
      req.body.main_image = found.main_image;
    }

    const updatedCategory = await Product.findByIdAndUpdate(id, req.body);

    res.status(200).json({
      success: 1,
      data: req.body,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await Product.findOne({ _id: id });

    if (!found) {
      return res
        .status(200)
        .json({ success: 0, msg: "No Product in this id!" });
    }

    found.main_image && (await fs.unlinkSync(found.main_image));

    const deletedProduct = await Product.deleteOne({ _id: id });

    res.status(200).json({
      success: 1,
      data: found,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

const getHome = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      succes: 1,
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: 0,
      msg: err.message,
    });
  }
};

exports.getProducts = getProducts;
exports.create = create;
exports.update = update;
exports.deleteProduct = deleteProduct;
exports.getHome = getHome;
exports.getProductsByCatId = getProductsByCatId;
exports.getProductDetails = getProductDetails;
