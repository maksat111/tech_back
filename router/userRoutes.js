const express = require('express');
const router = express.Router();

//--------------------------------------------- Middlewares ------------------------------------------------------- //
const auth = require('../middlewares/userAuth');

// ------------------------------------------- Controllers --------------------------------------------- //
const authController = require('../controllers/authController');
const bannersController = require('../controllers/bannersController');
const categoriesController = require('../controllers/categoriesController');
const subcategoriesController = require('../controllers/subcategoriesController');

// -------------------------------------------- Auth Routes --------------------------------------------- //
router.post('/login', auth, authController.LoginUser);
router.post('/register', auth, authController.registerUser);

// -------------------------------------------- Banner Routes --------------------------------------------- //
router.get('/banner/list', auth, bannersController.getBanner);

// -------------------------------------------- Categories Routes --------------------------------------------- //
router.get('/category/list', auth, categoriesController.getCategories);

// -------------------------------------------- Subcategories Routes --------------------------------------------- //
router.get('/subcategory/list', auth, subcategoriesController.getSubcategories);

module.exports = router;