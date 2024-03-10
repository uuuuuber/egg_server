'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
export default (app: any) => {
  const { router, controller, io } = app;
  // const authMiddleware = middleware.auth(); // 实例化中间件

  // 登陆注册路由
  router.get('/admin/login', controller.admin.home.login);
  router.post('/admin/loginevent', controller.admin.home.loginevent);
  router.get('/admin/logout', controller.admin.home.logout);

  // 管理员路由
  router.get('/admin/manager', controller.admin.manager.index); // 获取列表
  router.post('/admin/manager/save', controller.admin.manager.save); // 新增
  router.post('/admin/manager/:id', controller.admin.manager.update); // 更新
  router.get('/admin/manager/delete/:id', controller.admin.manager.delete); // 删除

  // 用户路由
  router.get('/admin/user', controller.admin.user.index); // 获取列表
  router.post('/admin/user/save', controller.admin.user.save); // 新增
  router.post('/admin/user/edit/:id', controller.admin.user.edit); // 编辑
  router.post('/admin/user/:id', controller.admin.user.update); // 更新
  router.get('/admin/user/delete/:id', controller.admin.user.delete);// 删除

  // 礼物路由
  router.get('/admin/gift', controller.admin.gift.index);// 获取列表
  router.post('/admin/gift/save', controller.admin.gift.save); // 新增
  router.post('/admin/gift/:id', controller.admin.gift.update); // 更新
  router.get('/admin/gift/delete/:id', controller.admin.gift.delete); // 删除

  // 直播间
  router.get('/admin/live', controller.admin.live.index);// 获取直播间列表
  router.get('/admin/live/look/:id', controller.admin.live.look); // 直播间观看情况
  router.get('/admin/live/gift/:id', controller.admin.live.gift); // 直播间礼物情况
  router.get('/admin/live/comment/:id', controller.admin.live.comment); // 直播间评论情况
  router.get('/admin/live/close/:id', controller.admin.live.close); // 关闭直播间
  router.get('/admin/live/delete/:id', controller.admin.live.delete); // 删除

  // 订单getGoodorderList
  router.get('/admin/order', controller.admin.order.index); // 获取订单列表
  router.get('/admin/order/delete/:id', controller.admin.order.delete);
  router.get('/admin/order/getGoodorderList', controller.admin.order.getGoodorderList); // 获取商品订单
  router.get('/admin/order/delGoodorder/:id', controller.admin.order.delGoodorder); // 删除商品订单

  router.get('/admin/order/takeGoods', controller.admin.order.takeGoods); // 获取商品订单
  router.get('/admin/order/delTakeGoods/:id', controller.admin.order.delTakeGoods); // 删除商品订单

  router.post('/admin/upload', controller.admin.common.upload); // 上传图片

  // 支付
  router.post('/api/gift/wxpay', controller.api.gift.wxpay);
  router.post(
    '/api/gift/notify',
    app.middleware.tenpay('pay', app),
    controller.api.gift.notify,
  );

  router.get('/api/gift/list', controller.api.gift.list); // 礼物列表

  router.post('/api/reg', controller.api.user.reg); // 用户注册
  router.post('/api/login', controller.api.user.login); // 用户登录
  router.post('/api/updateUserInfo', controller.api.user.updateUserInfo); // 更新用户信息
  router.post('/api/logout', controller.api.user.logout); // 退出登录
  router.get('/api/user/info/:id', controller.api.user.info); // 获取当前用户信息
  router.post('/api/upload', controller.api.common.upload); // 上传图片
  router.post('/api/uploadGoods', controller.api.common.uploadGoods); // 上传商品图片
  router.post('/api/becomeMerchant', controller.api.user.becomeMerchant); // 成为商家

  router.get('/api/goods/list', controller.api.goods.list); // 商品列表
  router.post('/api/goods/create', controller.api.goods.create); // 创建商品
  router.get('/api/goods/getAnchorGoods', controller.api.goods.getAnchorGoods); // 查找主播商品
  router.get('/api/goods/delGoods/:id', controller.api.goods.delGoods); // 下架商品

  router.get('/api/orderuser/list/:id', controller.api.order.list); // 用户订单列表
  router.post('/api/orderuser/create', controller.api.order.create); // 创建用户商品订单

  router.post('/api/live/create', controller.api.live.save); // 创建直播间
  router.post('/api/live/changestatus', controller.api.live.changestatus); // 修改直播间状态
  router.get('/api/live/list', controller.api.live.list); // 直播间列表
  router.get('/api/live/read/:id', controller.api.live.read); // 查看直播间
  router.get('/admin/order/delete/:id', controller.admin.order.delete); // 删除

  // io.of('/').route('test', io.controller.nsp.test);

  io.of('/').route('joinLive', io.controller.nsp.joinLive);
  io.of('/').route('leaveLive', io.controller.nsp.leaveLive);
  io.of('/').route('comment', io.controller.nsp.comment);
  io.of('/').route('gift', io.controller.nsp.gift);
  io.of('/').route('daihuo', io.controller.nsp.daihuo);
};
