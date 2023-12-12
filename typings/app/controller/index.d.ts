// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAdminHome from '../../../app/controller/admin/home';
import ExportAdminManager from '../../../app/controller/admin/manager';
import ExportAdminUser from '../../../app/controller/admin/user';

declare module 'egg' {
  interface IController {
    admin: {
      home: ExportAdminHome;
      manager: ExportAdminManager;
      user: ExportAdminUser;
    }
  }
}
