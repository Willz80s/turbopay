exports.up = function(knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary();
    table.uuid('sender_wallet_id');
    table.uuid('receiver_wallet_id');
    table.bigInteger('amount').notNullable();
    table.string('status').defaultTo('pending');
    table.string('reference').unique().notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('transactions');
};