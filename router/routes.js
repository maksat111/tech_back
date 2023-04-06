const express = require('express');
const router = express.Router();

// ------------------------------------------- Controllers --------------------------------------------- //
const sectionController = require('../controllers/sectionController');

// -------------------------------------------- Section Routes --------------------------------------------- //
router.post('/section', sectionController.getSections);


//---------------------------------------------- News Routes -------------------------------------------------- //

//---------------------------------------------- Banners Routes ---------------------------------------------------- //

//---------------------------------------------- About Routes --------------------------------------------------- //
router.get('/students/:group_id', auth, studentController.getStudentsByGroupId);
router.post('/students/create', auth, studentController.createStudent);
router.delete('/students/delete/:student_id', auth, studentController.deleteStudent);
router.patch('/students/update/:student_id', auth, studentController.updateStudent);


module.exports = router;