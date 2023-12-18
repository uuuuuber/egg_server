'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;

    const data = await ctx.page('User');
    if (!data.rows.length) {
      ctx.apiFail('暂无数据', 404);
      return;
    }
    ctx.apiSuccess(data);
  }

  async save() {
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
      avatar: {
        type: 'string',
        required: false,
        desc: '头像',
      },
      coin: {
        type: 'int',
        required: false,
        desc: '金币',
      },
    });
    const { username, password, avatar, coin } = ctx.request.body;

    // 验证用户是否已经存在
    if (await app.model.User.findOne({
      where: { username },
    })) {
      ctx.throw(400, '用户名已存在');
    }
    // 创建用户
    const user = await app.model.User.create({
      username,
      password,
      avatar,
      coin,
    });
    if (!user) {
      ctx.throw(400, '创建用户失败');
    }
    ctx.apiSuccess(user);
  }

  async edit() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const { coinNum: coin } = ctx.request.body;

    const data = await app.model.User.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      return await ctx.pageFail('该记录不存在');
    }
    const result = await ctx.model.User.update(
      { coin },
      { where: { id } },
    );
    ctx.body = result;
  }

  async update() {
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
      password: {
        type: 'string',
      },
      avatar: {
        type: 'string',
      },
      coin: {
        type: 'int',
      },
    });
    const id = ctx.params.id;
    const { username, password, avatar, coin } = ctx.request.body;
    // 用户名是否被使用
    const Op = app.Sequelize.Op;
    if (await app.model.User.findOne({
      where: {
        id: {
          [Op.ne]: id,
        },
        username,
      },
    })) {
      return ctx.apiFail('该用户名已存在');
    }
    // 当前管理员是否存在
    const user = await app.model.User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return ctx.apiFail('该记录不存在');
    }

    user.username = username;
    user.avatar = avatar;
    user.coin = coin;
    if (password) {
      user.password = password;
    }
    ctx.apiSuccess(await user.save());
  }

  async delete() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const data = await app.model.User.destroy({
      where: {
        id,
      },
    });
    ctx.apiSuccess(data);
  }
}

export default UserController;

