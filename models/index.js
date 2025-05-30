const sequelize = require('../db/db');
const Blog = require('./blogs');
 const User = require('./user');   
const Project = require('./projects');   
 const ContactMessage = require('./contact');   
const Testimonial = require('./testimonial');

module.exports = {
  sequelize,
  Blog,
  User,
  Project,
  ContactMessage,
  Testimonial,

};
