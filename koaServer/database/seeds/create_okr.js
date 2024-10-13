exports.seed = function (knex) {
    return Promise.all([
        knex('user').insert([{
            id: 1
        }]),
        knex('objective').insert([
            { id: 1, user_id: 1, objective: '让网站打开速度快一点', status: 1 }
        ]),
        knex('keyresult').insert([
            { id: 1, objective_id: 1, keyresult: '打开速度快50%', status: 1 }
        ]),
        knex('todo').insert([
            { id: 1, user_id: 1, todo: '图片资源压缩和代理', status: 1 }
        ]),
        knex('todo_keyresult').insert([
            { id: 1, todo_id: 1, keyresult_id: 1 }
        ])
    ])
}