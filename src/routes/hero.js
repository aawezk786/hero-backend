const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');
const course = require('../models/hero');

//Course 
router.post('/',heroController.postCourse);

router.get('/:id',heroController.getcourseById);

router.get('/',heroController.getAllcourse);

router.put('/update/:id',heroController.updateCourse);

router.delete('/:id',heroController.delById);

router.get('/h/rating',heroController.getRatingcourse);

module.exports = router;