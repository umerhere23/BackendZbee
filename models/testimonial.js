const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Testimonial = sequelize.define('Testimonial', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quote: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

module.exports = Testimonial;
