
exports.up = function(knex) {
    return knex.schema.createTable('images', function (table) {
        table.increments();
        table.string('uri', 1000).notNullable();

        table.string('item_id').notNullable();

        table.foreign('item_id').references('id').inTable('item');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('images');
};
