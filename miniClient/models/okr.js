import request from '../utils/request.js'
import API from '../consts/api.js'

const okrServer = {
    okrList(){
        return request.get(API.okr)
    },
    okrAdd(data){
        return request.post(API.okr, data)
    },
    okrShow(id){
        return request.get(API.okrItem(id))
    },
    okrUpdate(id, data){
        return request.put(API.okrItem(id), data)
    }
}
export default okrServer