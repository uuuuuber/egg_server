'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Controller = require('egg').Controller;
class OrderUserController extends Controller {

  async list() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const data = await ctx.page('OrderUser', {
      user_id: id,

    },
    {
      attributes: [ 'goods_num', 'goodcover', 'total_price', 'id' ],
      order: [
        [ 'created_time', 'DESC' ], // 按照创建时间降序排序
      ],
      include: [{
        model: app.model.Goods,
        attributes: [ 'goodtitle' ],
      }],
    });

    ctx.apiSuccess(data);
  }

  async create() {
    const { ctx, app } = this;
    ctx.validate({
      good_id: {
        type: 'number',
        require: true,
      },
      user_id: {
        type: 'number',
        require: true,
      },
      goodcover: {
        type: 'string',
        require: true,
      },
      price: {
        type: 'number',
        require: true,
      },
      goods_num: {
        type: 'number',
        require: true,
      },
      total_price: {
        type: 'number',
        require: true,
      },
    });
    const { good_id, user_id, goodcover, price, goods_num, total_price } = ctx.request.body;
    console.log('total_price', total_price);

    const order = await app.model.OrderUser.create({
      good_id,
      user_id,
      goodcover,
      price,
      goods_num,
      total_price,
      status: 'success',
    });
    if (!order) {
      ctx.throw(400, '创建订单失败');
    }
    ctx.apiSuccess('支付成功');
  }

}

export default OrderUserController;
