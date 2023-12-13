// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAdminHome from '../../../app/controller/admin/home';
import ExportAdminManager from '../../../app/controller/admin/manager';
import ExportAdminUser from '../../../app/controller/admin/user';
import ExportAdminGift from '../../../app/controller/admin/gift';
import ExportAdminLive from '../../../app/controller/admin/live';
import ExportOrder from '../../../app/controller/admin/order';

declare module 'egg' {
  interface IController {
    admin: {
      home: ExportAdminHome;
      manager: ExportAdminManager;
      user: ExportAdminUser;
      gift: ExportAdminGift;
      live: ExportAdminLive;
      order: ExportOrder;
    }
  }
}
