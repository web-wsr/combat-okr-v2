import request from '../utils/request.js'
import API from '../consts/api.js'

const keyresultServer = {
    keyresultDeleted(id){
        return request.delete(API.keyresultItem(id))
    },
    keyresultUpdate(id, data){
        return request.put(API.keyresultItem(id), data)
    }
}

export default keyresultServer