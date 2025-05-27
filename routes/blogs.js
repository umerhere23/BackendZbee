const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const upload = require('../middlewares/upload');
const auth =require('../middlewares/authMiddleware') 
router.post('/', auth, upload.single('image'), blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id',   blogController.getBlogById);
router.put('/:id', auth, upload.single('image'), blogController.updateBlog);
router.delete('/:id', auth, blogController.deleteBlog);


module.exports = router;
