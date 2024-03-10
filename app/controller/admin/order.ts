'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Controller = require('egg').Controller;

class OrderController extends Controller {
  async index() {
    const { ctx, app } = this;

    const data = await ctx.page('Order', {}, {
      include: [{
        model: app.model.User,
        attributes: [ 'id', 'username', 'avatar' ],
      }],
    });
    ctx.apiSuccess(data);
  }

  async delete() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const data = await app.model.Order.destroy({
      where: {
        id,
      },
    });

    if (data) {
      ctx.apiSuccess(data);
      return;
    }
    ctx.apiFail(data, '订单不存在');

  }
  async getGoodorderList() {
    const { ctx, app } = this;
    const data = await ctx.page('OrderUser', {}, {
      attributes: [ 'price', 'status', 'goods_num', 'goodcover', 'total_price', 'id', 'created_time' ],
      order: [
        [ 'created_time', 'DESC' ], // 按照创建时间降序排序
      ],
      include: [{
        model: app.model.User,
        attributes: [ 'username', 'avatar' ],
      }, {
        model: app.model.Goods,
        attributes: [ 'goodtitle' ],
      }],
    });
    ctx.apiSuccess(data);
  }

  async delGoodorder() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const data = await app.model.OrderUser.destroy({
      where: {
        id,
      },
    });

    if (data) {
      ctx.apiSuccess(data);
      return;
    }
    ctx.apiFail(data, '订单不存在');
  }

  async takeGoods() {
    const { ctx } = this;
    const data = await ctx.page('Goods', {}, {
      attributes: [ 'id', 'shopmanager', 'goodtitle', 'goodcover', 'price', 'created_time' ],
    });
    ctx.apiSuccess(data);
  }

  async delTakeGoods() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const data = await app.model.Goods.destroy({
      where: {
        id,
      },
    });

    if (data) {
      ctx.apiSuccess(data);
      return;
    }
    ctx.apiFail(data, '订单不存在');
  }

}

export default OrderController;
