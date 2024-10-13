// 处理时间的工具函数
const { formatDate } = require('./../utils/date');
const TodoKeyresult = require('../model/todoKeyresult');
const Objective = require('../model/objective');
const Keyresult = require('../model/keyresult');
const { log } = require('debug/src/node');


const okrController = {
    getOkrList: async (ctx, next) => {
        let status = ctx.request.query.status;
        const user_id = ctx.state.user_id;
        if (!user_id) {
            ctx.state.code = 401;
            ctx.state.data = { message: '登录重试' }
            return
        }
        let data = { user_id }
        if (status) {
            data.status = status
        }
        const okrList = await Objective.select(data);
        let objectives = okrList.map(data => {
            if (data.status === 1) {
                data.created_time = formatDate(data.created_time)
                const { completed_time, ...filterData } = data
                return filterData
            } else if (data.status === 0) {
                data.created_time = formatDate(data.created_time)
                data.completed_time = formatDate(data.completed_time)
                return data
            }
        })

        ctx.state.code = 200;
        ctx.state.data = { objectives }
    },
    okrInsert: async (ctx, next) => {
        let objective = ctx.request.body.objective;
        let keyresults = ctx.request.body.keyresults;
        let user_id = ctx.state.user_id;
        // 未完成的状态 为1
        let status = 1;
        if (!objective || !keyresults || !user_id) {
            ctx.state.data = { message: '缺少必要参数' }
            return
        }
        let objectives = await Objective.insert({ objective, user_id, status });
        // 我们首先对 O 表进行添加一条记录返回 objective_id 再和 KR 数据一起添加到 KR 表中。
        let objective_id = objectives[0];
        keyresults.forEach(async (item) => {
            let keyresult = item.keyresult
            await Keyresult.insert({
                keyresult,
                objective_id,
                status
            })
        })
        ctx.state.code = 200;
        ctx.state.data = {
            message: '创建成功'
        }
    },
    okrshow: async (ctx, next) => {
        let id = ctx.params.id;
        let user_id = ctx.state.user_id;
        if (!id || !user_id) {
            ctx.state.code = 401;
            ctx.state.data = { message: '请登录后重试' }
            return
        }
        const objectives = await Objective.select({ id });
        // 做一下时间的筛选
        let objectivesfilter = objectives.map(data => {
            if (data.status === 1) {
                data.created_time = formatDate(data.created_time)
                const { completed_time, ...filterData } = data
                return filterData
            } else if (data.status === 0) {
                data.created_time = formatDate(data.created_time)
                data.completed_time = formatDate(data.completed_time)
                return data
            }
        })
        const objective = objectivesfilter[0];
        const keyresults = await Keyresult.select({ objective_id: id });
        const keyresultIds = keyresults.map(item => item.id)
        // 与当前目标 当前成果 管理的 todos
        let todoKeyresults = await TodoKeyresult.knex()
            .whereIn('keyresult_id', keyresultIds)
            .leftJoin('todo', 'todo_keyresult.todo_id', 'todo.id')
            .select({ id: 'todo.id' }, 'todo_keyresult.keyresult_id', 'todo.todo', 'todo.status')

        // keyresultTmp = {}重组当前目标下的 成果 及 push相应的todos   
        let keyresultTmp = {}
        keyresults.forEach(item => {
            item.todos = []
            keyresultTmp[item.id] = item
        })
        todoKeyresults.forEach(item => {
            keyresultTmp[item.keyresult_id].todos.push(item)
        })
        objective.keyresults = Object.values(keyresults)
        ctx.state.code = 200;
        ctx.state.data = { okr: objective }

        // {
        //     "code": 200,
        //     "data": {
        //         "objective": {
        //             "id": 1,
        //             "user_id": 1,
        //             "objective": "让网站打开速度快一点",
        //             "status": 1,
        //             "created_time": "2024/10/10 00:49:49",
        //             "completed_time": "2024/10/11 20:16:43",
        //             "keyresults": [
        //                 {
        //                     "id": 1,
        //                     "objective_id": 1,
        //                     "keyresult": "打开速度快50%",
        //                     "status": 1,
        //                     "created_time": "2024-10-09T16:49:49.000Z",
        //                     "completed_time": "2024-10-09T16:49:49.000Z",
        //                     "todos": [
        //                         {
        //                             "id": 1,
        //                             "keyresult_id": 1,
        //                             "todo": "图片资源压缩和代理",
        //                             "status": 1
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }
        //     }
        // }
    },
    okrUpdate: async (ctx, next) => {
        let id = ctx.params.id;
        let objective = ctx.request.body.objective;
        let keyresults = ctx.request.body.keyresults;
        await Objective.update(id, { objective });
        keyresults.forEach(async (item) => {
            if (item.id) {
                await Keyresult.update(item.id, { keyresult: item.keyresult })
            } else {
                await Keyresult.insert({
                    keyresult: item.keyresult,
                    objective_id: id,
                    status: 1
                })
            }
        })
        ctx.state.code = 200;
        ctx.state.data = {
            message: '更新成功'
        }
    }
}
module.exports = okrController;