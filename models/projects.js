const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.JSON, // Store array as JSON
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON, // Store array of image paths/URLs
    allowNull: false,
  },
  projectLink: {
    type: DataTypes.STRING, // Link to GitHub or live project
    allowNull: true,
  },
}, {
  tableName: 'projects',
  timestamps: false,
});

module.exports = Project;
