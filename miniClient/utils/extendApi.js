// 封装消息提示模块和模态动态框模块
// 传入对象作为参数。同时设置默认值
const toast = ({title= '数据加载中',icon = 'none', duration = 2000, mask = 'true' } = {}) => {
    wx.showToast({
      title,
      icon,
      duration,
      mask
    })
}

const modal = (options = {}) => {
    // 需要返回一个Promise
    return new Promise((resolve) => {
        // 默认参数
        const defaultOpt = {
            title: '提示',
            content: '确定执行该操作?',
            confirmColor: '#f3514f'
        }
        // 通过Object.assign 方法将参数合并
       const opts = Object.assign({}, defaultOpt, options)
        wx.showModal({
            ...opts,
            complete({ confirm, cancel }){
                confirm && resolve(true)
                cancel && resolve(false)
            }
        })
    })
}
// 全局挂载
wx.toast = toast
wx.modal = modal
export { toast, modal }