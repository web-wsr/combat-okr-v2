const cors = {
  allowAll: function (ctx, next) {
    ctx.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Length, Accept");
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE');
    ctx.set('Access-Control-Allow-Credentials', true);
    next();
  }
};

module.exports = cors;