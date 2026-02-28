exports.up = function(knex) {
  return knex.schema.createTable('wallets', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('wallets');
};