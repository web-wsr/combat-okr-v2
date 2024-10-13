const axios = require('axios');
const User = require('../model/user');
const JWT = require('jsonwebtoken');


const userController = {
    login: async (ctx, next) => {
        let code = ctx.request.body.code;
        // if (!code) {
        //     ctx.body = { code: 0, msg: 'code empty!' }
        // }
        // console.log(code);
        const APPID = process.env.APP_ID;
        const SECRET = process.env.APP_SECRET;
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`;
        let { data } = await axios.get(url)
        let wechatId = data.openid;
        const users = await User.select({ wechatId })
        const user = users[0]
        let id
        if (!user) {
            let userArr = await User.insert({ wechatId })
            id = userArr[0]
        } else {
            id = user.id
        }
        let token = JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        ctx.state.code = 200;
        ctx.state.data = { token }

    }
}

module.exports = userController;