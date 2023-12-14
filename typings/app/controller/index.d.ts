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
import ExportCommon from '../../../app/controller/admin/common';

import ExportGift from '../../../app/controller/api/gift';
import ExportUser from '../../../app/controller/api/user';
import ExportLive from '../../../app/controller/api/live';

declare module 'egg' {
  interface IController {
    admin: {
      home: ExportAdminHome;
      manager: ExportAdminManager;
      user: ExportAdminUser;
      gift: ExportAdminGift;
      live: ExportAdminLive;
      order: ExportOrder;
      common: ExportCommon;
    },
    api: {
      gift: ExportGift;
      user: ExportUser;
      live: ExportLive;
    }
  }
}
