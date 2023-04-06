const express = require('express');
const router = express.Router();

// ------------------------------------------- Controllers --------------------------------------------- //
const sectionsController = require('../controllers/sectionsController');

// -------------------------------------------- Section Routes --------------------------------------------- //
router.get('/section', sectionsController.getSections);
router.post('/admin/section/create', sectionsController.create);
router.patch('/admin/section/update/:id', sectionsController.update);
router.delete('/admin/section/delete/:id', sectionsController.deleteSection);


//---------------------------------------------- News Routes -------------------------------------------------- //

//---------------------------------------------- Banners Routes ---------------------------------------------------- //

//---------------------------------------------- About Routes --------------------------------------------------- //


module.exports = router;