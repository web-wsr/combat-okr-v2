// 创建 WxRequest 类  提高复用性
import { modal, toast } from './extendApi';
import { getStorage, clearStorage } from './storage'
class WxRequest {
    // 定义属性：设置默认请求参数
    defaults = {
        baseURL: '', //比如请求基础地址：http://localhost:3000/api
        url: '',
        data: null,
        method: 'GET',
        header: {
            "Content-type": 'application/json' //设置数据的交互格式
        },
        // withCredentials: true,
        timeout: 60000
    }

    // 定义拦截器属性： 请求和响应拦截器
    interceptors = {
        // 请求拦截器
        request: (config) => config,
        // 响应拦截器
        response: (response) => response
    }

    // 创建和初始化类的属性以及方法
    // constructor接收实例化传递的参数
    constructor(params = {}){
        // Object.assign合并请求参数
        this.defaults = Object.assign({}, this.defaults, params)
    }

    requset(options){
        // 合并完整的请求地址：baseURL + url
        // http://localhost:3000/api+ url
        options.url = this.defaults.baseURL + options.url
        // 合并请求参数
        options = { ...this.defaults, ...options }

        // 在请求之前，放置请求拦截器
        options = this.interceptors.request(options)

        // 返回一个Promise处理异步请求
        return new Promise((resolve,reject) => {
            wx.request({
                ...options,
                // 成功时的回调
                success: (res)=>{
                    // 放置响应拦截器
                    const mergeRes =  Object.assign({}, res, { config: options, isSuccess: true})
                    resolve(this.interceptors.response(mergeRes))
                },
                // 失败时的回调
                fail: (err)=>{
                    // 放置响应拦截器
                    const mergeErr =  Object.assign({}, err, { config: options, isSuccess: false})
                    reject(this.interceptors.response(mergeErr))
                }
            })
        })
    }


    /**
     * [请求库] 重新包装，让传递的参数更符合自己的习惯
     *  @params url         { string }   @default => '' [接口地址]
     *  @params data        { object }   @default => {} [发送数据]
     *  @params config      { object }   配置
     */
    // GET实例方法
    get(url, data = {}, config = {}){
       return this.requset(Object.assign({ url, data, method: 'GET'}, config))
    }
    // DELETE实例方法
    delete(url, data = {}, config = {}){
       return this.requset(Object.assign({ url, data, method: 'DELETE'}, config))
    }
    // POST实例方法
    post(url, data = {}, config = {}){
       return this.requset(Object.assign({ url, data, method: 'POST'}, config))
    }
    // PUT实例方法
    put(url, data = {}, config = {}){
       return this.requset(Object.assign({ url, data, method: 'PUT'}, config))
    }
    
}

// 实例化
const instance = new WxRequest({
    baseURL: 'http://192.168.10.5:3000',
    timeout: 15000
})

// 在实例上配置
// 配置请求拦截器（ 放置 token 和 业务参数 )
instance.interceptors.request = (config) => {
    // 发送请求前的配置：判断本地是否存在token 在请求头中添加token
    const token = getStorage('token')
    if(token){
        config.header['token'] = token
    }
    return config
}

// 配置响应拦截器
instance.interceptors.response = async (response) => {
    const { isSuccess, data } = response
    if(!isSuccess){
        toast({ title:'网络异常请重试',icon:'error'})
        return response
    }

    // 判断服务器响应的业务状态码
    switch(data.code){
        // 成功的状态码200
        case 200:
        // 服务器响应的数据，处理一下后端返回的数据
        return data
        // 没有token 或者token过期，登录或者重新登录
        case 401:
        const res = await modal({
            content:'鉴权失败，请登录重试',
            showCancel: false
        })
        // 点击确定
        if(res){
            // 清除token 及全部信息
            clearStorage()
            wx.navigateTo({
                url: '/pages/welcome/welcome'
            })
        }
        return Promise.reject(response)
        case 403:
            toast({
                title: '没有权限，请联系管理员',
            })
            return Promise.reject(response)
        default:
            toast({
                title: '维护中，请稍后重试'
            })
            return Promise.reject(response)
    }
    
    
}
export default instance