'use strict';
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Controller = require('egg').Controller;
class HomeController extends Controller {
  // 登录页
  async login() {
    const { ctx } = this;
    let toast = ctx.cookies.get('toast', { encrypt: true });
    toast = toast ? JSON.parse(toast) : null;
    // await ctx.render('admin/home/login.html', {
    //   toast,
    // });
    ctx.apiSuccess(toast);
  }

  // 登录逻辑
  async loginevent() {
    const { ctx, app } = this;
    // 参数验证
    ctx.validate({
      username: {
        type: 'string',
        required: true,
        desc: '用户名',
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码',
      },
    });
    const { username, password } = ctx.request.body;
    // 验证该用户是否存在|验证该用户状态是否启用
    const manager = await app.model.Manager.findOne({
      // attributes: { exclude: ['password'] },
      where: {
        username,
      },
    });

    if (!manager) {
      ctx.throw(400, '用户不存在或已被禁用');
    }
    // 验证密码
    const res = await this.checkPassword(password, manager.password);

    // 记录到session中
    // const token = jwt.sign({ id: manager.id }, 'mimaoXXX@__jk', { expiresIn: '24h' });
    if (res) {
      const token = jwt.sign({ username }, 'mimaoXXX@__jk', { expiresIn: '24h' });
      ctx.cookies.set('user_token', token, {
        path: '/',
        port: '5173',
        secure: false, // 不仅在使用 HTTPS 连接时发送 Cookie ，即需为 `https://`
        httpOnly: true, // 禁止通过 JavaScript 访问 Cookie
        sameSite: 'none', // 设置 SameSite 特性
      });
      return ctx.apiSuccess({ manager, token });
    }
  }
  // 验证密码
  async checkPassword(password, hash_password) {
    // 先对需要验证的密码进行加密
    const hmac = crypto.createHash('sha256', this.app.config.crypto.secret);
    hmac.update(password);
    password = hmac.digest('hex');
    const res = password === hash_password;
    if (!res) {
      this.ctx.throw(400, '密码错误');
    }
    return true;
  }

  // 退出登录
  async logout() {
    const { ctx } = this;
    // 清除session
    ctx.session.auth = null;
    ctx.apiSuccess('退出成功');
  }
}

export default HomeController;
