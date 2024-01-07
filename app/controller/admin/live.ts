'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Controller = require('egg').Controller;
class LiveController extends Controller {
  async index() {
    const { ctx, app } = this;
    // const tabs = [{
    //   name: '全部',
    //   url: '/admin/live',
    //   active: false,
    // }, {
    //   name: '直播中',
    //   url: '?status=1',
    //   status: 1,
    //   active: false,
    // }, {
    //   name: '未开播',
    //   url: '?status=0',
    //   status: 0,
    //   active: false,
    // }, {
    //   name: '直播结束',
    //   url: '?status=3',
    //   status: 3,
    //   active: false,
    // }];

    const where = (ctx.query.status === 'undefined') ? {} : { status: ctx.query.status };
    const data = await ctx.page('Live', where, {
      include: [{
        model: app.model.User,
        attributes: [ 'id', 'username' ],
      }],
    });
    ctx.apiSuccess(data);


    // tabs = tabs.map(item => {
    //   if ((!ctx.query.status && ctx.query.status != 0 && item.url === '/admin/live') || item.status == ctx.query.status) {
    //     item.active = true;
    //   }
    //   return item;
    // });

    // data = JSON.parse(JSON.stringify(data));


  }

  // 观看记录
  async look() {
    const { ctx, app } = this;
    const id = ctx.params.id;

    await ctx.page('LiveUser', { live_id: id }, {
      include: [{
        model: app.model.User,
        attributes: [ 'id', 'username', 'avatar' ],
      }],
    }).then(res => {
      const RES = JSON.parse(JSON.stringify(res));
      const msg = RES.msg;
      const lookData = RES.rows.map(item => {
        return {
          id: item.id,
          username: item.user.username,
          avatar: item.user.avatar,
          created_time: app.formatTime(item.created_time),
        };
      });

      const count = RES.count;
      const data = {
        msg,
        lookData,
        count,
      };

      ctx.apiSuccess(data);
    });

  }

  // 礼物记录
  async gift() {
    const { ctx, app } = this;
    const id = ctx.params.id;

    const res = await ctx.page('LiveGift', { live_id: id }, {
      include: [{
        model: app.model.User,
        attributes: [ 'id', 'username', 'avatar' ],
      }, {
        model: app.model.Gift,
        attributes: [ 'name', 'image', 'coin' ],
      }],
    });
    ctx.apiSuccess({
      count: res.count,
      data: res.rows.map(item => {
        return {
          created_time: app.formatTime(item.created_time),
          gift_name: item.gift.name,
          gift_coin: item.gift.coin,
          gift_image: item.gift.image,
          username: item.user.username,
          avatar: item.user.avatar,
        };
      }),
    });
  }

  // 弹幕记录
  async comment() {
    const { ctx, app } = this;
    const id = ctx.params.id;

    const res = await ctx.page('Comment', {
      live_id: id,
    },
    { include: [{
      model: app.model.User,
      attributes: [ 'id', 'username', 'avatar' ],
    }],
    });

    ctx.apiSuccess({
      count: res.count,
      data: res.rows.map(item => {
        return {
          content: item.content,
          created_time: app.formatTime(item.created_time),
          username: item.user.username,
          avatar: item.user.avatar,
        };
      }),
    });
  }

  // 关闭直播间
  async close() {
    const { ctx, app } = this;
    const id = ctx.params.id;

    const live = await app.model.Live.findOne({
      where: {
        id,
      },
    });

    if (!live) {
      ctx.apiFail('该直播间不存在');
    } else if (live.status === 3) {
      ctx.apiFail('该直播间已结束');
    } else {
      live.status = 3;
      await live.save();
      ctx.apiSuccess('关闭成功');
    }
  }

  // 删除直播间
  async delete() {
    const { ctx, app } = this;
    const id = ctx.params.id;
    const data = await app.model.Live.destroy({
      where: {
        id,
      },
    });

    if (data) {
      ctx.apiSuccess(data);
      return;
    }
    ctx.apiFail(data, '直播间不存在');

  }
}

export default LiveController;
