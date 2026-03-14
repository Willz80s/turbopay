const knex = require('../database/knex');

async function getWalletBalance(userId) {

  const wallet = await knex('wallets')
    .where({ user_id: userId })
    .first();

  if (!wallet) {
    throw new Error('Wallet not found');
  }

  const credits = await knex('ledger_entries')
    .where({ wallet_id: wallet.id, type: 'credit' })
    .sum('amount as total')
    .first();

  const debits = await knex('ledger_entries')
    .where({ wallet_id: wallet.id, type: 'debit' })
    .sum('amount as total')
    .first();

  const creditAmount = Number(credits.total) || 0;
  const debitAmount = Number(debits.total) || 0;

  const balance = creditAmount - debitAmount;

  return {
    walletId: wallet.id,
    balance
  };
}

module.exports = {
  getWalletBalance
};