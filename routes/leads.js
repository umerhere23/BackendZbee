const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middlewares/upload');   

 
router.get('/', projectController.getAllContactMessages);

module.exports = router;
