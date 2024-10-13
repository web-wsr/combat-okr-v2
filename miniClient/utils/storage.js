// 封装本地存储的方法
// 同步
// 1.数据存储
/**
 * @description 存储数据
 * @param {*} key 本地指定的key
 * @param {*} data 需要缓存的数据
 */
export const setStorage = (key, data) => {
    try {
        wx.setStorageSync(key, data)
    }catch(error){
        console.error(`存储指定${key}数据发生错误`, error);
    }
}


/**
 * @description 从本地读取key的数据
 * @param {*} key 
 */
//2 读取数据
export const getStorage = (key) => {
    try {
       const value = wx.getStorageSync(key)
       if(value){
           return value 
       }
    }catch(error){
        console.error(`读取指定${key}数据发生错误`, error);
    }
}

/**
 * @description 从本地移除 key 的数据
 * @param {*} key 
 */
// 3 移除本地数据
export const removeStorage = (key) => {
    try {
       wx.removeStorageSync(key)
    }catch(error){
        console.error(`移除${key}数据发生错误`, error);
    }
}


/**
 * @description 本地移除清空全部的数据
 */
// 4 清除本地全部的数据
export const clearStorage = () => {
    try {
        wx.clearStorageSync()
    } catch (error) {
        console.error(`清空本地数据发生错误`, error);
    }
}





// 异步
/**
 * @description 异步将数据存储到本地
 * @param {*} key 
 * @param {*} data 
 */
export const asyncSetStorage = (key, data) => {
    return new Promise((resolve) => {
        wx.setStorage({
            key,
            data,
            complete(res){
                resolve(res)
            }
        })
    })
}

/**
 * @description 异步本地获取指定key 的数据
 * @param {*} key 
 */
export const asyncGetStorage = (key) => {
    return new Promise ((resolve) => {
        wx.getStorage({
            key,
            complete(res){
                resolve(res)
            }
        })
    })
}

/**
 * @description 异步本地移除指定key 的数据
 * @param {*} key 
 */
export const asyncRemoveStorage = (key) => {
    return new Promise ((resolve) => {
        wx.removeStorage({
            key,
            complete(res){
                resolve(res)
            }
        })
    })
}

/**
 * @description 异步本地移除清除全部缓存的数据
 */
export const asyncClearStorage = () => {
    return new Promise ((resolve) => {
        wx.clearStorage({
            complete(res){
                resolve(res)
            }
        })
    })
}