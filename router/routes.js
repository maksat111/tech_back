const express = require('express');
const router = express.Router();

//--------------------------------------------- Middlewares ------------------------------------------------------- //
const auth = require('../middlewares/auth');

// ------------------------------------------- Controllers --------------------------------------------- //
const sectionsController = require('../controllers/sectionsController');
const aboutController = require('../controllers/aboutController');
const bannersController = require('../controllers/bannersController');
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const newsController = require('../controllers/newsController');

// -------------------------------------------- Section Routes --------------------------------------------- //
router.get('/section/list', sectionsController.getSections);
router.post('/admin/section/create', auth, sectionsController.create);
router.patch('/admin/section/update/:id', auth, sectionsController.update);
router.delete('/admin/section/delete/:id', auth, sectionsController.deleteSection);
router.get('/admin/section/list', auth, sectionsController.getSections);


//---------------------------------------------- News Routes -------------------------------------------------- //
router.get('/news/list', newsController.getNews);
router.get('/news/list/:id', newsController.getNewsBySection);
router.get('/news/detail/:id', newsController.getNewsDetail);
router.post('/admin/news/create', auth, newsController.createNews);
router.patch('/admin/news/update/:id', auth, newsController.updateNews);
router.delete('/admin/news/delete/:id', auth, newsController.deleteNews);
router.get('/admin/news/list', auth, newsController.getNews);

//---------------------------------------------- Banners Routes ---------------------------------------------------- //
router.get('/banner/list', bannersController.getBanner);
router.post('/admin/banner/create', auth, bannersController.createBanner);
router.patch('/admin/banner/update/:id', auth, bannersController.updateBanner);
router.delete('/admin/banner/delete/:id', auth, bannersController.deleteBanner);
router.get('/admin/banner/list', auth, bannersController.getBanner);

//---------------------------------------------- About Routes --------------------------------------------------- //
router.get('/about', aboutController.getAboutContent);
router.post('/admin/about/create', auth, aboutController.createAboutContent);
router.patch('/admin/about/update/:id', auth, aboutController.updateAboutContent);
router.delete('/admin/about/delete/:id', auth, aboutController.deleteAboutContent);
router.get('/admin/about', auth, aboutController.getAboutContent);

//---------------------------------------------- User Routes --------------------------------------------------- //
router.get('/admin/user/list', auth, usersController.getUser);
router.post('/admin/user/create', usersController.createUser);
router.patch('/admin/user/update/:id', auth, usersController.updateUser);
router.delete('/admin/user/delete/:id', auth, usersController.deleteUser);

//---------------------------------------------- Auth Routes --------------------------------------------------- //
router.post('/admin/login', authController.Login);

module.exports = router;