'use strict';

import { Application } from 'egg';

/**
 * @param {Egg.Application} app - egg application
 */
export default (app: Application) => {
  const { router, controller } = app;

  // 管理员路由
  router.get('/admin/manager', controller.admin.manager.index); // 获取列表
  router.post('/admin/manager/save', controller.admin.manager.save); // 新增
  router.post('/admin/manager/:id', controller.admin.manager.update); // 更新
  router.get('/admin/manager/delete/:id', controller.admin.manager.delete); // 删除
};
