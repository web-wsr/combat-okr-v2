import request from '../utils/request.js'
import API from '../consts/api.js'

const todoServer = {
    todoList(status){
        return request.get(API.todo,status)
    },
    todoAdd(todo){
        return request.post(API.todo,todo)
    },
    todoUpdate(id,data){
        return request.put(API.todoItem(id),data)
    },
    todoDeleted(id){
        return request.delete(API.todoItem(id))
    }
}

export default todoServer