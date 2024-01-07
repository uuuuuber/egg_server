'use strict';

import { Application } from 'egg';

/**
 * @param {Egg.Application} app - egg application
 */
export default (app: Application) => {
  const { router, controller } = app;
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

  // 订单
  router.get('/admin/order', controller.admin.order.index); // 获取订单列表
  router.get('/admin/order/delete/:id', controller.admin.order.delete);
  router.post('/admin/upload', controller.admin.common.upload); // 上传图片

  // 支付
  router.post('/api/gift/wxpay', controller.api.gift.wxpay);
  router.post(
    '/api/gift/notify',
    app.middleware.tenpay('pay', app),
    controller.api.gift.notify,
  );

  router.post('/api/reg', controller.api.user.reg); // 用户注册
  router.post('/api/login', controller.api.user.login); // 用户登录
  router.post('/api/logout', controller.api.user.logout); // 退出登录
  router.get('/api/user/info', controller.api.user.info); // 获取当前用户信息


  router.post('/api/live/create', controller.api.live.save); // 创建直播间
  router.post('/api/live/changestatus', controller.api.live.changestatus); // 修改直播间状态
  router.get('/api/live/list/:page', controller.api.live.list); // 直播间列表
  router.get('/api/live/read/:id', controller.api.live.read); // 查看直播间
  router.get('/admin/order/delete/:id', controller.admin.order.delete); // 删除
};
