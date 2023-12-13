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
    await app.model.Order.destroy({
      where: {
        id,
      },
    });
    ctx.toast('删除成功', 'success');

    ctx.redirect('/admin/order');
  }
}

export default OrderController;
