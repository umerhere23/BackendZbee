const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middlewares/upload');   

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

router.post('/', upload.array('images'), projectController.createProject);

router.put('/:id', upload.array('images'), projectController.updateProject);

router.delete('/:id', projectController.deleteProject);

module.exports = router;
