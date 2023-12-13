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

    const where = (!ctx.query.status && ctx.query.status !== 0) ? {} : { status: ctx.query.status };

    const data = await ctx.page('Live', where, {
      include: [{
        model: app.model.User,
        attributes: [ 'id', 'username' ],
      }],
    });
    console.log(data);


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

    const res = await app.model.LiveUser.findAll({
      where: {
        live_id: id,
      },
      include: [{
        model: app.model.User,
        attributes: [ 'id', 'username', 'avatar' ],
      }],
    });

    ctx.apiSuccess({
      ths: [{
        title: '用户名',
        key: 'username',
      }, {
        title: '观看时间',
        key: 'created_time',
      }],
      data: res.map(item => {
        return {
          id: item.id,
          username: item.user.username,
          avatar: item.user.avatar,
          created_time: app.formatTime(item.created_time),
        };
      }),
    });
  }

  // 礼物记录
  async gift() {
    const { ctx, app } = this;
    const id = ctx.params.id;

    const res = await app.model.LiveGift.findAll({
      where: {
        live_id: id,
      },
      include: [{
        model: app.model.User,
        attributes: [ 'id', 'username', 'avatar' ],
      }, {
        model: app.model.Gift,
      }],
    });

    ctx.apiSuccess({
      ths: [{
        title: '礼物名称',
        key: 'gift_name',
      }, {
        title: '礼物图标',
        key: 'gift_image',
        type: 'image',
      }, {
        title: '礼物金币',
        key: 'gift_coin',
      }, {
        title: '赠送者',
        key: 'username',
      }, {
        title: '赠送时间',
        key: 'created_time',
      }],
      data: res.map(item => {
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

    const res = await app.model.Comment.findAll({
      where: {
        live_id: id,
      },
      include: [{
        model: app.model.User,
        attributes: [ 'id', 'username', 'avatar' ],
      }],
    });

    ctx.apiSuccess({
      ths: [{
        title: '内容',
        key: 'content',
      }, {
        title: '发送人',
        key: 'username',
      }, {
        title: '发送时间',
        key: 'created_time',
      }],
      data: res.map(item => {
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
      ctx.toast('该直播间不存在', 'danger');
    } else if (live.status === 3) {
      ctx.toast('该直播间已结束', 'danger');
    } else {
      live.status = 3;
      await live.save();
      ctx.toast('关闭成功', 'success');
    }
    ctx.redirect('/admin/live');
  }
}

export default LiveController;
