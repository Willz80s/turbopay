const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const knex = require('./src/database/knex');

async function registerUser(email, password) {
  return await knex.transaction(async (trx) => {

    // Check if user exists
    const existingUser = await trx('users')
      .where({ email })
      .first();

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();
    const walletId = uuidv4();

    // Insert user
    await trx('users').insert({
      id: userId,
      email,
      password: hashedPassword
    });

    // Create wallet
    await trx('wallets').insert({
      id: walletId,
      user_id: userId
    });

    return {
      id: userId,
      email
    };
  });
}

module.exports = {
  registerUser
};