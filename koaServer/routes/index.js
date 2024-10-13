const router = require('koa-router')()

router.get('/api', async (ctx, next) => {
  ctx.body = {
    code: 200,
    data: {
      text: 'hello world'
    }
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
