
exports.up = function(knex) {
    return knex.schema.createTable('address', function (table) {
        table.increments();
        table.string('cep').notNullable();
        table.string('cidade').notNullable();
        table.string('bairro').notNullable();
        table.string('rua').notNullable();
        table.string('numero').notNullable();
        table.string('uf', 2).notNullable();

        table.string('user_id').notNullable();

        table.foreign('user_id').references('id').inTable('user');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('address');
};
