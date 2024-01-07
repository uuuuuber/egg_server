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
}

export default OrderController;
