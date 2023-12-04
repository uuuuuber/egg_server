'use strict';

import { Application } from 'egg';

/**
 * @param {Egg.Application} app - egg application
 */
export default (app: Application) => {
  const { router, controller } = app;

  router.get('/admin/manager', controller.admin.manager.index) // 获取列表
  router.get('/admin/manager/create', controller.admin.manager.create) // 渲染表单，无用
  router.post('/admin/manager/save', controller.admin.manager.save) // 新增
  
}