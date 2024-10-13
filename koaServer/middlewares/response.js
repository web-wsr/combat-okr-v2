const debug = require('debug')('koa-app');
/**
 * 响应处理模块
 */
module.exports = async function (ctx, next) {
  try {
    await next()
    // 处理响应结果
    console.log("11111", ctx.url)
    ctx.body = ctx.body ? ctx.body : {
      code: ctx.state.code,
      data: ctx.state.data
    }
    console.log("222222", ctx.body);

  } catch (e) {
    // catch 全局的错误信息
    debug('catch Error: %o', e)
    // 设置状态码为 500 - 服务端错误
    ctx.status = 500
    // 输出详细的错误信息
    ctx.body = {
      code: -1,
      error: e.message || e.toString()
    }
  }
}