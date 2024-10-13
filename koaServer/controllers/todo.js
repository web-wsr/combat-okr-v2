
const Todo = require('../model/todo');
const TodoKeyresult = require('../model/todoKeyresult');
// 处理时间的工具函数
const { formatDate } = require('./../utils/date');

const todoController = {
    getTodoList: async (ctx, next) => {
        const status = ctx.request.query.status;
        // 获取用户id
        const user_id = ctx.state.user_id;
        const todos = await Todo.select({ user_id, status });
        console.log(todos);

        const todoList = todos.map(item => {
            item.created_time = formatDate(item.created_time);
            item.completed_time = formatDate(item.completed_time);
            return item;
        });
        ctx.state.code = 200;
        ctx.state.data = { todos: todoList }

    },
    todoInsert: async (ctx, next) => {
        let todo = ctx.request.body.todo;
        let user_id = ctx.state.user_id;
        let status = 1
        if (!todo || !user_id) {
            ctx.state.data.message = '参数错误'
            return
        }
        const todosArr = await Todo.insert({ todo, user_id, status });
        let id = todosArr[0];
        ctx.state.code = 200;
        ctx.state.data = { id }
    },
    todoUpdate: async (ctx, next) => {
        const id = ctx.params.id;
        const params = ctx.request.body;
        // params.completed_time = params.status ? null : Date.now();
        const todo = await Todo.update(id, params);
        ctx.state.code = 200;
        ctx.state.data = {
            message: '标记完成'
        }
    },
    todoDelete: async (ctx, next) => {
        const id = ctx.params.id;
        await Todo.delete(id);
        await TodoKeyresult.select({ todo_id: id }).del()
        ctx.state.code = 200;
        ctx.state.data = {
            message: '删除成功'
        }
    }
};

module.exports = todoController;