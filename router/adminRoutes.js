const express = require('express');
const router = express.Router();

//--------------------------------------------- Middlewares ------------------------------------------------------- //
const auth = require('../middlewares/adminAuth');

// ------------------------------------------- Controllers --------------------------------------------- //
const adminsController = require('../controllers/adminsController');
const authController = require('../controllers/authController');
const bannersController = require('../controllers/bannersController');
const categoriesController = require('../controllers/categoriesController');
const subcategoriesController = require('../controllers/subcategoriesController');
const usersController = require('../controllers/usersController');
const brandsController = require('../controllers/brandsController');

// -------------------------------------------- Admin Routes --------------------------------------------- //
router.get('/list', auth, adminsController.getAdmin);
router.patch('/update/:id', auth, adminsController.updateAdmin);
router.delete('/delete/:id', auth, adminsController.deleteAdmin);

// -------------------------------------------- Auth Routes --------------------------------------------- //
router.post('/auth/register', auth, authController.registerAdmin);
router.post('/auth/login', authController.LoginAdmin);

//---------------------------------------------- Banners Routes ---------------------------------------------------- //
router.get('/banner/list', auth, bannersController.getBanner);
router.post('/banner/create', auth, bannersController.createBanner);
router.patch('/banner/update/:id', auth, bannersController.updateBanner);
router.delete('/banner/delete/:id', auth, bannersController.deleteBanner);


//---------------------------------------------- Category Routes --------------------------------------------------- //
router.get('/category/list', auth, categoriesController.getCategories);
router.post('/category/create', auth, categoriesController.create);
router.patch('/category/update/:id', auth, categoriesController.update);
router.delete('/category/delete/:id', auth, categoriesController.deleteCategory);

//---------------------------------------------- Subcategory Routes --------------------------------------------------- //
router.get('/subcategory/list', auth, subcategoriesController.getSubcategories);
router.post('/subcategory/create', auth, subcategoriesController.create);
router.patch('/subcategory/update/:id', auth, subcategoriesController.update);
router.delete('/subcategory/delete/:id', auth, subcategoriesController.deleteSubCategory);

//---------------------------------------------- Users Routes --------------------------------------------------- //
router.get('/user/list', auth, usersController.getUser);
router.post('/user/create', auth, authController.registerUser);
router.patch('/user/update/:id', auth, usersController.updateUser);
router.delete('/user/delete/:id', auth, usersController.deleteUser);

//---------------------------------------------- Brands Routes --------------------------------------------------- //
router.get('/brand/list', auth, brandsController.getBrands);
router.post('/brand/create', auth, brandsController.create);
router.patch('/brand/update/:id', auth, brandsController.update);
router.delete('/brand/delete/:id', auth, brandsController.deleteBrand);

module.exports = router;