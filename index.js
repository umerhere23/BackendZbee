require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const sequelize = require('./db/db');
const authRoutes = require('./routes/userauth');
const blogRoutes = require('./routes/blogs');
 const projectRoutes = require('./routes/projectRoutes');
 const ContactMessageRoutes = require('./routes/leads');

app.use(cors());
app.use(express.json());

 app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
 app.use('/api/projects', projectRoutes);
 app.use('/api/contact', ContactMessageRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    console.log('Syncing database...');
    await sequelize.sync({ alter: true });
    console.log('Database synced.');

    await sequelize.authenticate();
    console.log('Connected to the database successfully.');

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
