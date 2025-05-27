const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const ContactMessage = sequelize.define('ContactMessage', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = ContactMessage;
