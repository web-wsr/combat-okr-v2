// 引入加密和解密模块
const JWT = require('jsonwebtoken');
// 定义密钥
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async function (ctx, next) {
    let token = ctx.headers.token
    if (token) {
        JWT.verify(token, JWT_SECRET, async (error, decode) => {
            if (!error) {
                ctx.state.user_id = decode.id
            }
        })
    }
    await next()
}

