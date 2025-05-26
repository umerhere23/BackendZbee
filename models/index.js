const sequelize = require('../db/db');
const Blog = require('./blogs');
const Category = require('./category');
const User = require('./user');   

Blog.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Blog, { foreignKey: 'categoryId', as: 'blogs' });

module.exports = {
  sequelize,
  Blog,
  Category,
  User  
};
