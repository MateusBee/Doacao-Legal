
exports.up = function(knex) {
    return knex.schema.createTable('item', function (table) {
        table.increments();
        table.string('item').notNullable();
        table.string('descricao').notNullable();

        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('user');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('item');
};
