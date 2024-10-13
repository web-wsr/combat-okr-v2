const TodoKeyresult = require('../model/todoKeyresult');
const Objective = require('../model/objective');
const Keyresult = require('../model/keyresult');

const ObjectiveController = {
    objectiveUpdate: async (ctx, next) => {
        let id = ctx.params.id;
        let params = ctx.request.body;
        await Objective.update(id, params);
        ctx.state.code = 200;
        ctx.state.data = {
            message: '更新成功'
        }
    },
    objectiveDelete: async (ctx, next) => {
        let id = ctx.params.id;
        await Objective.delete(id);
        let keyresult = await Keyresult.select({ objective_id: id });
        let keyresultIds = keyresult.map(item => item.id);
        await keyresult.select({ objective_id: id }).delete()
        await TodoKeyresult.deleteBatch(keyresultIds)
        ctx.state.code = 200;
        ctx.state.data = {
            message: '删除成功'
        }
    },

}

module.exports = ObjectiveController;