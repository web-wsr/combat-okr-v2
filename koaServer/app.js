require('dotenv').config();
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')
// const cors = require('./middlewares/cors')
const response = require('./middlewares/response')
const auth = require('./middlewares/user')

const api = require('./routes/api')
// const index = require('./routes/index')
// const users = require('./routes/users')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// 跨域配置
// app.use(cors.allowAll)
// 响应结果和错误处理
app.use(response)
app.use(auth)

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} ${JSON.stringify(ctx.body)} - ${ms}ms`)
// })


// routes
app.use(api.routes(), api.allowedMethods())

// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
