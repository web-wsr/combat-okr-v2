const TodoKeyresult = require('../model/todoKeyresult');
const Objective = require('../model/objective');
const Keyresult = require('../model/keyresult');
const { log } = require('debug/src/node');

const todoKeyresultController = {
    getTodoKeyresultList: async (ctx, next) => {
        const todo_id = ctx.params.id;
        // let user_id = ctx.state.user_id;
        let user_id = 1
        const objectives = await Objective.select({ user_id, status: 1 });
        const objectiveIds = objectives.map(data => data.id);
        // 与目标关联的keyresult
        const keyresults = await Keyresult.knex().whereIn('objective_id', objectiveIds);
        // 与todo关联的连表结果  ids
        const todoKeyresults = await TodoKeyresult.select({ todo_id });
        const keyresultIds = todoKeyresults.map(data => data.keyresult_id);
        let okr = {};
        objectives.forEach(item => {
            item.keyresults = []
            okr[item.id] = item
        })
        keyresults.forEach(item => {
            item.active = keyresultIds.includes(item.id)
            okr[item.objective_id].keyresults.push(item)
        })
        // 提取对象中所有值，并转化为数组
        okr = Object.values(okr)
        ctx.state.code = 200;
        ctx.state.data = {
            okr
        }
        // {
        //     "code": 200,
        //     "data": {
        //         "okr": [
        //             {
        //                 "id": 1,
        //                 "user_id": 1,
        //                 "objective": "让网站打开速度快一些",
        //                 "status": 1,
        //                 "created_time": "2024-10-09T16:49:49.000Z",
        //                 "completed_time": "2024-10-12T06:07:17.000Z",
        //                 "keyresults": [
        //                     {
        //                         "id": 1,
        //                         "objective_id": 1,
        //                         "keyresult": "打开速度快80%",
        //                         "status": 1,
        //                         "created_time": "2024-10-09T16:49:49.000Z",
        //                         "completed_time": "2024-10-12T06:06:45.000Z",
        //                         "active": true
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // }
    },
    todoKeyresultInsert: async (ctx, next) => {
        const { todo_id, keyresult_id } = ctx.request.body;
        await TodoKeyresult.insert({ todo_id, keyresult_id });
        ctx.state.code = 200;
        ctx.state.data = {
            message: '关联成功'
        }
    },
    // 取消关联
    todoKeyresultDelete: async (ctx, next) => {
        const { todo_id, keyresult_id } = ctx.request.body;
        await TodoKeyresult.select({ todo_id, keyresult_id }).delete();
        ctx.state.code = 200;
        ctx.state.data = {
            message: '取消关联成功'
        }
    }
};

module.exports = todoKeyresultController;