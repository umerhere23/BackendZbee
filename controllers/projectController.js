const Project = require('../models/projects');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { title, description, tags, projectLink } = req.body;
    // Parse tags if sent as JSON string
    const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    // Get image paths from multer
    const images = req.files ? req.files.map(file => file.path) : [];

    const newProject = await Project.create({
      title,
      description,
      tags: parsedTags,
      images,
      projectLink
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Failed to create project' });
  }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const { title, description, tags, projectLink } = req.body;
    const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    // If new images uploaded, use them; else keep existing
    const images = req.files && req.files.length > 0
      ? req.files.map(file => file.path)
      : project.images;

    await project.update({
      title,
      description,
      tags: parsedTags,
      images,
      projectLink
    });

    res.status(200).json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Failed to update project' });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.destroy();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};
