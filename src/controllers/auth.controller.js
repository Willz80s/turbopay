const { registerUser } = require('../services/userservice');

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

module.exports = {
  register
};