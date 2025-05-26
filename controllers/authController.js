const bcrypt = require('bcryptjs');
const { User } = require('../models');
const errors = require('../utils/util')
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { fullName, email, password, role = 'user' } = req.body;

   if (!fullName || !email || !password) {
    return res.status(400).json(errors.BAD_REQUEST('Please provide all required fields.'));
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json(errors.CONFLICT('Email is already in use.'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role
    });

    return res.status(201).json(errors.CREATED({
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role
    }));
  } catch (error) {
    console.error(error);
    return res.status(500).json(errors.INTERNAL_SERVER_ERROR('Server error. Please try again later.'));
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(errors.BAD_REQUEST('Email and password are required.'));
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json(errors.NOT_FOUND('User not found.'));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json(errors.UNAUTHORIZED('Invalid credentials.'));
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '1d' }
    );

    return res.status(200).json(errors.SUCCESS({
      message: 'Login successful',
      token
    }));
  } catch (error) {
    console.error(error);
    return res.status(500).json(errors.INTERNAL_SERVER_ERROR('Server error.'));
  }
};
module.exports = {
  signup,
  login
};
