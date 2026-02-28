exports.up = function(knex) {
  return knex.schema.createTable('ledger_entries', (table) => {
    table.uuid('id').primary();
    table.uuid('wallet_id')
      .references('id')
      .inTable('wallets')
      .onDelete('CASCADE');

    table.enu('type', ['credit', 'debit']).notNullable();
    table.bigInteger('amount').notNullable(); // store in kobo
    table.string('reference').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ledger_entries');
}