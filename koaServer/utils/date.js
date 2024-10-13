// 创建一个格式化处理日期的函数

const formatNumber = (n) => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
const formatDate = (date) => {
    // 获取年份
    const year = date.getFullYear()
    // 获取月份
    const month = date.getMonth() + 1
    // 获取日期
    const day = date.getDate()
    // 获取小时
    const hour = date.getHours()
    // 获取分钟
    const minute = date.getMinutes()
    // 获取秒
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// let creat_time = new Date()
// console.log(formatDate(creat_time));
module.exports = {
    formatDate
}