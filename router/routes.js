const express = require('express');
const router = express.Router();

// ------------------------------------------- Controllers --------------------------------------------- //
const sectionsController = require('../controllers/sectionsController');

// -------------------------------------------- Section Routes --------------------------------------------- //
router.post('/admin/section/create', sectionsController.create);
router.get('/section', sectionsController.getSections);


//---------------------------------------------- News Routes -------------------------------------------------- //

//---------------------------------------------- Banners Routes ---------------------------------------------------- //

//---------------------------------------------- About Routes --------------------------------------------------- //


module.exports = router;