'use strict';
// import crypto from 'crypto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Controller = require('egg').Controller;
class UserClientController extends Controller {
  // 注册
  async reg() {
    const { ctx, app } = this;
    // 参数验证
    ctx.validate({
      username: {
        type: 'string',
        required: true,
        range: {
          min: 5,
          max: 20,
        },
        desc: '用户名',
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码',
      },
      repassword: {
        type: 'string',
        required: true,
        desc: '确认密码',
      },
    }, {
      equals: [
        [ 'password', 'repassword' ],
      ],
    });
    const { username, password } = ctx.request.body;
    // 验证用户是否已经存在
    if (await app.model.User.findOne({
      where: {
        username,
      },
    })) {
      ctx.throw(400, '用户名已存在');
    }
    // 创建用户
    const user = await app.model.User.create({
      username,
      password,
    });
    if (!user) {
      ctx.throw(400, '创建用户失败');
    }
    ctx.apiSuccess(user);
  }

  // 登录
  async login() {
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
    let user = await app.model.User.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      ctx.throw(400, '用户不存在或已被禁用');
    }
    // 验证密码
    await ctx.checkPassword(password, user.password);

    user = JSON.parse(JSON.stringify(user));
    // 生成token
    const token = ctx.getToken(user);
    user.token = token;
    delete user.password;
    // 加入缓存中
    if (!await this.service.cache.set('user_' + user.id, token)) {
      ctx.throw(400, '登录失败');
    }
    const t = await ctx.service.cache.get('user_' + user.id);
    console.log(token === t);
    // 返回用户信息和token
    return ctx.apiSuccess(user);
  }

  // 退出登录
  async logout() {
    const { ctx, service } = this;
    // 拿到当前用户id
    const current_user_id = ctx.authUser.id;
    // 移除redis当前用户信息
    if (!await service.cache.remove('user_' + current_user_id)) {
      ctx.throw(400, '退出登录失败');
    }
    ctx.apiSuccess('退出成功');
  }

  // 获取当前用户信息
  async info() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const user = await app.model.User.findOne({
      where: {
        id,
      },
    });


    if (!user) {
      return ctx.apiFail('该记录不存在');
    }
    delete user.password;
    return ctx.apiSuccess(user);
  }

  // 成为商家
  async becomeMerchant() {
    const { ctx, app } = this;
    ctx.validate({
      id: {
        type: 'int',
        required: true,
      },
      ismerchant: {
        type: 'int',
      },
    });
    const { ismerchant, id } = ctx.request.body;
    const user = await app.model.User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return ctx.apiFail('该记录不存在');
    }
    const result = await ctx.model.User.update(
      { ismerchant },
      { where: { id } },
    );
    ctx.apiSuccess(result);
  }

  // 更新用户信息
  async updateUserInfo() {
    const { ctx, app } = this;
    ctx.validate({
      id: {
        type: 'int',
        required: true,
      },
      username: {
        type: 'string',
        required: true,
      },
      avatar: {
        type: 'string',
        require: true,
      },
      password: {
        type: 'string',
        require: true,
      },
    });
    const { username, id, avatar, password } = ctx.request.body;


    const user = await app.model.User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return ctx.apiFail('该记录不存在');
    }
    const result = await ctx.model.User.update(
      { username, password, avatar },
      { where: { id } },
    );
    ctx.apiSuccess(result);
  }
}

export default UserClientController;
