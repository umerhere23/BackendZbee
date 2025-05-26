const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dateTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true
  },
  visibility: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.STRING
  },
  updatedBy: {
    type: DataTypes.STRING
  },
  metaTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  metaDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  metaKeywords: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Blog;
