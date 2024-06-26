const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    name_tm: {
      type: String,
      required: true,
    },
    name_en: {
      type: String,
      default: "No Name",
    },
    name_ru: {
      type: String,
      default: "No Name",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
    },
    main_image: {
      type: String,
      default: "",
    },
    images: {
      type: Array,
      default: "",
    },
    description_tm: {
      type: String,
      default: "",
    },
    description_ru: {
      type: String,
      default: "",
    },
    description_en: {
      type: String,
      default: "",
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", ProductsSchema);
