const express = require("express");
const router = express.Router();

//--------------------------------------------- Middlewares ------------------------------------------------------- //
const auth = require("../middlewares/userAuth");

// ------------------------------------------- Controllers --------------------------------------------- //
const authController = require("../controllers/authController");
const bannersController = require("../controllers/bannersController");
const categoriesController = require("../controllers/categoriesController");
const subcategoriesController = require("../controllers/subcategoriesController");
const brandsController = require("../controllers/brandsController");
const productsController = require("../controllers/productsController");

// -------------------------------------------- Auth Routes --------------------------------------------- //
router.post("/auth/login", authController.LoginUser);
router.post("/auth/register", authController.registerUser);

// -------------------------------------------- Banner Routes --------------------------------------------- //
router.get("/banner/list", bannersController.getBanner);

// -------------------------------------------- Categories Routes --------------------------------------------- //
router.get("/category/list", categoriesController.getCategories);
router.get("/category/:id", productsController.getProductsByCatId);

// -------------------------------------------- Subcategories Routes --------------------------------------------- //
router.get("/subcategory/list", subcategoriesController.getSubcategories);

// -------------------------------------------- Brands Routes --------------------------------------------- //
router.get("/brand/list", brandsController.getBrands);

// -------------------------------------------- product Routes --------------------------------------------- //
router.get("/product/list", productsController.getProducts);
router.get("/product/:id", productsController.getProductDetails);

module.exports = router;
