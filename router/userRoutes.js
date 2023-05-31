const express = require('express');
const router = express.Router();

//--------------------------------------------- Middlewares ------------------------------------------------------- //
const auth = require('../middlewares/userAuth');

// ------------------------------------------- Controllers --------------------------------------------- //
const authController = require('../controllers/authController');
const bannersController = require('../controllers/bannersController');
const categoriesController = require('../controllers/categoriesController');
const subcategoriesController = require('../controllers/subcategoriesController');
const brandsController = require('../controllers/brandsController');

// -------------------------------------------- Auth Routes --------------------------------------------- //
router.post('/login', authController.LoginUser);
router.post('/register', authController.registerUser);

// -------------------------------------------- Banner Routes --------------------------------------------- //
router.get('/banner/list', bannersController.getBanner);

// -------------------------------------------- Categories Routes --------------------------------------------- //
router.get('/category/list', categoriesController.getCategories);

// -------------------------------------------- Subcategories Routes --------------------------------------------- //
router.get('/subcategory/list', subcategoriesController.getSubcategories);

// -------------------------------------------- Brands Routes --------------------------------------------- //
router.get('/brand/list', brandsController.getBrands);

module.exports = router;