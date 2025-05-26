const Blog = require('../models/blogs');

exports.createBlog = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.path : null;

    const blogData = {
      ...req.body,
      images: imagePath,
      createdBy: req.user.id,     
      updatedBy: req.user.id,     
    };

    const blog = await Blog.create(blogData);
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.updateBlog = async (req, res) => {
  try {
    let imagePath = req.file ? req.file.path : null;

    const updatedData = {
      ...req.body,
      updatedBy: req.user.id   
    };

    if (imagePath) {
      updatedData.images = imagePath;
    }

    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    await blog.update(updatedData);
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 

exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Blog not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};