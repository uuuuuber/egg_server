'use strict';

import { Application } from 'egg';

/**
 * @param {Egg.Application} app - egg application
 */
export default (app: Application) => {
  const { router, controller } = app;

  router.get('/admin/manager', controller.admin.manager.index)
  router.get('/admin/manager/create', controller.admin.manager.create)
  router.post('/admin/manager/save', controller.admin.manager.save)

}