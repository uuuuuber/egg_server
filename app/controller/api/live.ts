'use strict';
// 引入模块
import md5 from 'md5';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Controller = require('egg').Controller;
class LiveClientController extends Controller {
// 创建直播间
  async save() {
    const { ctx, app } = this;
    const user_id = ctx.authUser.id;
    // 参数验证
    ctx.validate({
      title: {
        type: 'string',
        required: true,
        desc: '直播间标题',
      },
      cover: {
        type: 'string',
        required: true,
        desc: '直播间封面',
      },
    });

    const {
      title, cover,
    } = ctx.request.body;

    // 生成唯一key
    const key = ctx.randomString(20);

    // 直接创建
    const res = await app.model.Live.create({
      title,
      cover,
      user_id,
      key,
    });

    // 生成签名
    const sign = this.sign(key);

    ctx.apiSuccess({
      data: res,
      sign,
    });
  }

  // 生成签名
  sign(key) {
    const { app } = this;
    const secret = app.config.mediaServer.auth.secret;
    const expire = parseInt(((Date.now() + 100000000) / 1000).toString());
    const hashValue = md5(`/live/${key}-${expire}-${secret}`);
    return `${expire}-${hashValue}`;
  }

  // 修改直播间状态
  async changestatus() {
    const { ctx, app } = this;
    const user_id = ctx.authUser.id;
    // 参数验证
    ctx.validate({
      id: {
        type: 'int',
        required: true,
        desc: '直播间ID',
      },
      type: {
        type: 'string',
        required: true,
        range: {
          in: [ 'play', 'pause', 'stop' ],
        },
      },
    });
    const { id, type } = ctx.request.body;

    const live = await app.model.Live.findOne({
      where: {
        id,
        user_id,
      },
    });

    if (!live) {
      return ctx.apiFail('该直播间不存在');
    }

    if (live.status === 3) {
      return ctx.apiFail('该直播间已结束');
    }

    const status = {
      play: 1,
      pause: 2,
      stop: 3,
    };

    live.status = status[type];
    await live.save();

    return ctx.apiSuccess('ok');
  }

  // 直播间列表
  async list() {
    const { ctx } = this;
    ctx.validate({
      page: {
        required: true,
        desc: '页码',
        type: 'int',
      },
    });
    const rows = await ctx.page('Live');
    ctx.apiSuccess(rows);
  }

  // 查看指定直播间
  async read() {
    const { ctx, app } = this;
    // 参数验证
    ctx.validate({
      id: {
        required: true,
        desc: '直播间ID',
        type: 'int',
      },
    });

    const id = ctx.params.id;

    let live = await app.model.Live.findOne({
      where: {
        id,
      },
      include: [{
        model: app.model.User,
        attributes: [ 'id', 'username', 'avatar' ],
      }],
    });
    if (!live) {
      return ctx.apiFail('当前直播间不存在');
    }

    // 生成签名
    const sign = this.sign(live.key);

    live = JSON.parse(JSON.stringify(live));

    ctx.apiSuccess({
      data: live,
      sign,
    });

  }
}

export default LiveClientController;
