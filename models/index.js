const sequelize = require('../db/db');
const Blog = require('./blogs');
 const User = require('./user');   
const Project = require('./projects');   
 const ContactMessage = require('./contact');   


module.exports = {
  sequelize,
  Blog,
  User,
  Project,
  ContactMessage
};
