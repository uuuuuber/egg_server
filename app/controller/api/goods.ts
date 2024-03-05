'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Controller = require('egg').Controller;
class GoodsController extends Controller {
  // 礼物列表
  async list() {
    const { ctx } = this;
    const data = await ctx.page('Goods', {}, {
      order: [
        [ 'created_time', 'DESC' ], // 按照创建时间降序排序
      ],
    });

    ctx.apiSuccess(data);
  }

  async create() {
    const { ctx, app } = this;
    ctx.validate({
      shopmanager: {
        type: 'string',
        require: true,
      },
      goodtitle: {
        type: 'string',
        require: true,
      },
      goodcover: {
        type: 'string',
        require: true,
      },
      goodbanner: {
        type: 'string',
        require: true,
      },
      price: {
        type: 'number',
        require: true,
      },
    });
    const { shopmanager, goodtitle, goodbanner, goodcover, price } = ctx.request.body;
    const goods = await app.model.Goods.create({
      shopmanager,
      goodtitle,
      goodbanner,
      goodcover,
      price,
    });
    if (!goods) {
      ctx.throw(400, '创建商品失败');
    }
    ctx.apiSuccess(goods);
  }

  async getAnchorGoods() {
    const { ctx } = this;
    const shopmanager = ctx.query.shopmanager;
    const data = await ctx.page('Goods', { shopmanager }, {
      order: [
        [ 'created_time', 'DESC' ], // 按照创建时间降序排序
      ],
    });

    ctx.apiSuccess(data);
  }

  async delGoods() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const data = await app.model.Goods.destroy({
      where: {
        id,
      },
    });
    if (data) {
      ctx.apiSuccess('下架成功');
      return;
    }
    ctx.apiFail(data, '商品不存在');
  }
}

export default GoodsController;
