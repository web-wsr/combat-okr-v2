import request from '../utils/request.js'
import API from '../consts/api.js'

const testServer = {
    test(){
        return request.get(API.test)
    }
}

export default testServer