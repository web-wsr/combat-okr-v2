const Keyresult = require('../model/keyresult');
const TodoKeyresult = require('../model/todoKeyresult');


const keyresultController = {
    keyresultDeleted: async (ctx, next) => {
        let id = ctx.params.id;
        await Keyresult.delete(id);
        await TodoKeyresult.select({ keyresult_id: id }).delete()
        ctx.state.code = 200;
        ctx.state.data = {
            message: '删除成功'
        }
    },
    keyresultUpdate: async (ctx, next) => {
        let id = ctx.params.id;
        let params = ctx.request.body;
        await Keyresult.update(id, params);
        ctx.state.code = 200;
        ctx.state.data = {
            message: '更新成功'
        }
    }
}

module.exports = keyresultController;