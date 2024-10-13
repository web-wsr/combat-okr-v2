const config = require('./../knexfile')
const knex = require('knex')(config);
// 基础模型 其实就是添加一些方法供使用，记得暴露出去
class Base {
    constructor(props) {
        this.table = props
    }

    all() {
        // promise对象
        return knex(this.table).select()
    }

    select(params) {
        return knex(this.table).select().where(params).orderBy('id', 'desc')
    }

    insert(params) {
        return knex(this.table).insert(params)
    }

    update(id, params) {
        return knex(this.table).where('id', '=', id).update(params)
    }

    delete(id) {
        return knex(this.table).where('id', '=', id).del()
    }
    // 批量删除
    deleteBatch(ids) {
        return knex(this.table).whereIn('id', ids).del()
    }

    count(params = {}) {
        return knex(this.table).where(params).count('id as sum')
    }

    knex() {
        return knex(this.table)
    }

    where(params) {
        return knex(this.table).where(params);
    }
}

module.exports = Base