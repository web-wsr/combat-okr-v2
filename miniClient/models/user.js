import request from '../utils/request.js'
import API from '../consts/api.js'

const userServer = {
    login(code){
        return request.post(API.login,code)
    }
}

export default userServer