import request from '../utils/request.js'
import API from '../consts/api.js'

const todoKeyresultServer = {
    getTodoKeyresultList(id){
        return request.get(API.todoKeyresultItem(id))
    },
    todoKeyresultAdd(id, data){
        return request.post(API.todoKeyresultItem(id), data)
    },
    todoKeyresultDeleted(id, data){
        return request.delete(API.todoKeyresultItem(id), data)
    }
}

export default todoKeyresultServer