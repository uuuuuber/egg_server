'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Controller = require('egg').Controller;
class GiftController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.page('Gift');
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
      name: {
        type: 'string',
        required: true,
        desc: '礼物名称',
      },
      image: {
        type: 'string',
      },
      coin: {
        type: 'int',
      },
    });
    const { name, image, coin } = ctx.request.body;

    // 创建礼物
    const gift = await app.model.Gift.create({
      name,
      image,
      coin,
    });
    if (!gift) {
      ctx.throw(400, '创建礼物失败');
    }
    ctx.apiSuccess(gift);
  }

  async edit() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    let data = await app.model.Gift.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      return await ctx.pageFail('该记录不存在');
    }
    data = JSON.parse(JSON.stringify(data));

  }

  async update() {
    const { ctx, app } = this;
    ctx.validate({
      id: {
        type: 'int',
        required: true,
      },
      name: {
        type: 'string',
        required: true,
      },
      image: {
        type: 'string',
      },
      coin: {
        type: 'int',
      },
    });
    const id = ctx.params.id;
    const { name, image, coin } = ctx.request.body;
    const gift = await app.model.Gift.findOne({
      where: { id },
    });
    if (!gift) {
      return ctx.apiFail('该记录不存在');
    }

    const result = await ctx.model.Manager.update(
      { name, image, coin },
      { where: { id } },
    );
    ctx.apiSuccess(result);
  }

  async delete() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    await app.model.Gift.destroy({
      where: { id },
    });
    ctx.toast('删除成功', 'success');

    ctx.redirect('/admin/gift');
  }
}

export default GiftController;
