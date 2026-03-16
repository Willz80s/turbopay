const { registerUser } = require('../services/userservice');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('../database/knex');

async function register(req, res) {
  try {
    const { email, password } = req.body;

    const user = await registerUser(email, password);

    res.status(201).json({
      message: 'User created successfully',
      user
    });

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await knex('users').where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email }
    });

  } catch (err) {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
}

module.exports = {
  register,
  login
};