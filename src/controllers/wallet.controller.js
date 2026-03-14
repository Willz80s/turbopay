const { getWalletBalance } = require('../services/wallet.service');

async function balance(req, res) {

  try {

    const userId = req.user.userId;

    const wallet = await getWalletBalance(userId);

    res.json(wallet);

  } catch (error) {

    res.status(400).json({
      error: error.message
    });

  }

}

module.exports = {
  balance
};