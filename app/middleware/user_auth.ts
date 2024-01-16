
module.exports = () => {
  return async (ctx, next) => {
    const { app } = ctx;
    // 1. 获取 header 头token
    const token = ctx.header.token || ctx.query.token;
    if (!token) {
      ctx.throw(400, '您没有权限访问该接口!');
    }
    // 2. 根据token解密，换取用户信息
    let user = {} as any;
    try {
      user = ctx.checkToken(token);
    } catch (error: any) {
      const fail = error.name === 'TokenExpiredError'
        ? 'token 已过期! 请重新获取令牌'
        : 'Token 令牌不合法!111';
      ctx.throw(400, fail);
    }
    // 3. 判断当前用户是否登录
    const t = await ctx.service.cache.get('user_' + user.id);
    console.log(t);
    if (!t || t !== token) {
      ctx.throw(400, 'Token 令牌不合法!44444');
    }

    // 4. 获取当前用户，验证当前用户是否被禁用
    user = await app.model.User.findOne({
      where: {
        id: user.id,
      },
    });
    if (!user) {
      ctx.throw(400, '用户不存在或已被禁用');
    }
    // 5. 把 user 信息挂载到全局ctx上
    ctx.authUser = user;

    await next();
  };
};
