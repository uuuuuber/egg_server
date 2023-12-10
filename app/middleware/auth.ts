import jwt from 'jsonwebtoken';

module.exports = () => {
  function verifyToken(token) {
    const secretKey = 'mimaoXXX@__jk'; // 你的密钥，用于签名和验证 token
    jwt.verify(token, secretKey, (err,res) => {
      if (err) {
        return false;
      }
      console.log(res);
    });
    return true;
  }
  return async function authMiddleware(ctx, next) {
    if (`${ctx.path}` === '/admin/loginevent') {
      await next();
      return;
    }
    const token = ctx.cookies.get('user_token', { signed: false }); // 从 cookie 中获取 token
    console.log(token);

    if (!token) {
      ctx.throw(401, '未提供有效的身份验证令牌');
    }
    // 验证 token 的有效性
    if (verifyToken(token)) {
      // token 验证通过，继续处理请求
      await next();
    } else {
      // token 验证失败，返回 401 错误
      ctx.throw(401, '身份验证令牌无效或已过期，请重新登陆');
    }
  };
};
