// const express = require('express');
// const router = express.Router();

// //--------------------------------------------- Middlewares ------------------------------------------------------- //
// const auth = require('../middlewares/auth');

// // ------------------------------------------- Controllers --------------------------------------------- //
// // const sectionsController = require('../controllers/sectionsController');
// const bannersController = require('../controllers/bannersController');
// const usersController = require('../controllers/usersController');
// const authController = require('../controllers/authController');
// const newsController = require('../controllers/newsController');

// // -------------------------------------------- Section Routes --------------------------------------------- //
// // router.get('/section/list', sectionsController.getSections);
// // router.post('/admin/section/create', auth, sectionsController.create);
// // router.patch('/admin/section/update/:id', auth, sectionsController.update);
// // router.post('/admin/section/delete/:id', auth, sectionsController.deleteSection);
// // router.get('/admin/section/list', auth, sectionsController.getSections);


// //---------------------------------------------- News Routes -------------------------------------------------- //
// router.get('/news/list', newsController.getNews);
// router.get('/news/list/:id', newsController.getNewsBySection);
// router.get('/news/detail/:id', newsController.getNewsDetail);
// router.post('/admin/news/create', auth, newsController.createNews);
// router.patch('/admin/news/update/:id', auth, newsController.updateNews);
// router.post('/admin/news/delete/:id', auth, newsController.deleteNews);
// router.get('/admin/news/list', auth, newsController.getNews);

// //---------------------------------------------- Banners Routes ---------------------------------------------------- //
// router.get('/banner/list', bannersController.getBanner);
// router.post('/admin/banner/create', auth, bannersController.createBanner);
// router.patch('/admin/banner/update/:id', auth, bannersController.updateBanner);
// router.post('/admin/banner/delete/:id', auth, bannersController.deleteBanner);
// router.get('/admin/banner/list', auth, bannersController.getBanner);


// //---------------------------------------------- User Routes --------------------------------------------------- //
// router.get('/admin/user/list', auth, usersController.getUser);
// router.post('/admin/user/create', auth, usersController.createUser);
// router.patch('/admin/user/update/:id', auth, usersController.updateUser);
// router.post('/admin/user/delete/:id', auth, usersController.deleteUser);

// //---------------------------------------------- Auth Routes --------------------------------------------------- //
// router.post('/admin/login', authController.Login);

// module.exports = router;