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

  // 管理员路由
  router.get('/admin/manager', controller.admin.manager.index); // 获取列表
  router.post('/admin/manager/save', controller.admin.manager.save); // 新增
  router.post('/admin/manager/:id', controller.admin.manager.update); // 更新
  router.get('/admin/manager/delete/:id', controller.admin.manager.delete); // 删除
};
