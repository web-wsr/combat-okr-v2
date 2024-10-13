exports.up = function (knex) {
    // 1. 用户信息表 user
    return knex.schema
        .createTable('user', function (table) {
            table.increments('id').primary();
            table.string('name', 255);
            table.string('wechatId', 255);
            table.timestamp('created_time').defaultTo(knex.fn.now());
        })
        // 2. 目标表 objective
        .createTable('objective', function (table) {
            table.increments('id').primary();
            table.integer('user_id', 11);
            table.string('objective', 255);
            table.integer('status', 11);
            table.timestamp('created_time').defaultTo(knex.fn.now());
            table.timestamp('completed_time').defaultTo(knex.fn.now());
        })
        // 3. 成就表 keyresult
        .createTable('keyresult', function (table) {
            table.increments('id').primary();
            table.integer('objective_id', 11);
            table.string('keyresult', 255);
            table.integer('status', 11);
            table.timestamp('created_time').defaultTo(knex.fn.now());
            table.timestamp('completed_time').defaultTo(knex.fn.now());
        })
        // 4. 代办事项表 todo
        .createTable('todo', function (table) {
            table.increments('id').primary();
            table.integer('user_id', 11);
            table.string('todo', 255);
            table.integer('status', 11);
            table.timestamp('created_time').defaultTo(knex.fn.now());
            table.timestamp('completed_time').defaultTo(knex.fn.now())
        })
        // 5. 代办事项与成就关联表 todo_keyresult 
        .createTable('todo_keyresult', function (table) {
            table.increments('id').primary();
            table.integer('todo_id', 11);
            table.integer('keyresult_id', 11);
        })
}

exports.down = function (knex) {
    return knex.schema
        .dropTable('user')
        .dropTable('objective')
        .dropTable('keyresult')
        .dropTable('todo')
        .dropTable('todo_keyresult');
};
exports.config = {
    transaction: false
}