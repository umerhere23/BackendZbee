const path = require('path');
const { Project } = require('../models');
const { ContactMessage } = require('../models');

const fs = require('fs');
 

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
     const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
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


 
exports.updateProject = async (req, res) => {
  try {
    const { title, description, projectLink } = req.body;
    const existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];
    const newImages = (req.files || []).map(file => file.path.replace(/\\/g, '/'));
    const updatedImages = [...existingImages, ...newImages];

    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.title = title;
    project.description = description;
    project.projectLink = projectLink;
    project.images = updatedImages;

    await project.save();

    res.status(200).json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
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

exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, Email, and Message are required.' });
    }

    const newMessage = await ContactMessage.create({
      name,
      email,
      phone,
      message
    });

    res.status(201).json({ message: 'Message sent successfully.', data: newMessage });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }}

  exports.getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};