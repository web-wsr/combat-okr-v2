import request from '../utils/request.js'
import API from '../consts/api.js'

const objectiveServer = {
    objdectiveUpdate(id, data){
        return request.put(API.objectiveItem(id), data)
    },
    objectiveDeleted(id){
        return request.delete(API.objectiveItem(id))
    }
}

export default objectiveServer