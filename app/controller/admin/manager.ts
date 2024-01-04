'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Controller = require('egg').Controller;
class ManagerController extends Controller {
  // 列表
  public async index() {
    const { ctx } = this;
    const data = await ctx.page('Manager');
    if (!data.rows.length) {
      ctx.apiFail('暂无数据');
      return;
    }
    ctx.apiSuccess(data);
  }
  // 创建管理员逻辑
  async save() {
    const { ctx, app } = this;


    ctx.validate({
      username: {
        type: 'string',
        required: true,
        desc: '管理员账户',
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码',
      },
    });

    const { username, password, mobile } = ctx.request.body;

    if (await app.model.Manager.findOne({
      where: {
        username,
      },
    })) {
      return ctx.apiFail('该管理员已存在');
    }

    const manager = await app.model.Manager.create({
      username, password, mobile,
    });

    const data = JSON.parse(JSON.stringify(manager));
    delete data.password;

    ctx.apiSuccess(data);
  }
  // 删除
  async delete() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const data = await app.model.Manager.destroy({
      where: {
        id,
      },
    });
    if (data) {
      ctx.apiSuccess(data);
      return;
    }
    ctx.apiFail(data, '用户不存在');
    // ctx.toast('删除成功', 'success');
    // ctx.redirect('/admin/manager');
  }

  // 编辑表单页
  // async edit() {
  //   const { ctx, app } = this;
  //   const id = ctx.params.id;

  //   let data = await app.model.Manager.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  //   if (!data) {
  //     return await ctx.apiFail('暂无数据', 404);
  //   }
  //   data = JSON.parse(JSON.stringify(data));
  //   delete data.password;
  //   ctx.apiSuccess(data, '修改成功');
  // }

  // 更新逻辑
  async update(this) {
    const { ctx, app } = this;

    ctx.validate({
      id: {
        type: 'int',
        required: true,
      },
      username: {
        type: 'string',
        required: true,
        desc: '管理员名称',
      },
      password: {
        type: 'string',
        required: false,
        desc: '密码',
      },
    });

    const id = ctx.params.id;
    const { username, password } = ctx.request.body;

    const manager = await app.model.Manager.findOne({
      where: {
        id,
      },
    });
    if (!manager) {
      return ctx.apiFail('该记录不存在');
    }

    const Op = app.Sequelize.Op;

    if ((await app.model.Manager.findOne({
      where: {
        id: {
          [Op.ne]: id,
        },
        username,
      },
    }))) {
      return ctx.apiFail('管理员名称已存在');
    }

    // manager.username = username;
    // if (password) {
    //   manager.password = password;
    // }
    const result = await ctx.model.Manager.update(
      { username, password },
      { where: { id } },
    );
    ctx.apiSuccess(result);
  }
}

export default ManagerController;
