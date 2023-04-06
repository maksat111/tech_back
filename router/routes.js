const express = require('express');
const router = express.Router();

// ------------------------------------------- Controllers --------------------------------------------- //
const sectionsController = require('../controllers/sectionsController');
const aboutController = require('../controllers/aboutController');
const bannersController = require('../controllers/bannersController');
const usersController = require('../controllers/usersController');

// -------------------------------------------- Section Routes --------------------------------------------- //
router.get('/section', sectionsController.getSections);
router.post('/admin/section/create', sectionsController.create);
router.patch('/admin/section/update/:id', sectionsController.update);
router.delete('/admin/section/delete/:id', sectionsController.deleteSection);


//---------------------------------------------- News Routes -------------------------------------------------- //

//---------------------------------------------- Banners Routes ---------------------------------------------------- //
router.get('/banner', bannersController.getBanner);
router.post('/admin/banner/create', bannersController.createBanner);
router.patch('/admin/banner/update/:id', bannersController.updateBanner);
router.delete('/admin/banner/delete/:id', bannersController.deleteBanner);

//---------------------------------------------- About Routes --------------------------------------------------- //
router.get('/about', aboutController.getAboutContent);
router.post('/admin/about/create', aboutController.createAboutContent);
router.patch('/admin/about/update/:id', aboutController.updateAboutContent);
router.delete('/admin/about/delete/:id', aboutController.deleteAboutContent);

//---------------------------------------------- User Routes --------------------------------------------------- //
router.get('/admin/user', usersController.getUser);
router.post('/admin/user/create', usersController.createUser);
router.patch('/admin/user/update/:id', usersController.updateUser);
router.delete('/admin/user/delete/:id', usersController.deleteUser);

module.exports = router;