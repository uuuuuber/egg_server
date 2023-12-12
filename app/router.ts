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
  router.get('/admin/user/edit/:id', controller.admin.user.edit); // 编辑
  router.post('/admin/user/:id', controller.admin.user.update); // 更新
  router.get('/admin/user/delete/:id', controller.admin.user.delete);
};
