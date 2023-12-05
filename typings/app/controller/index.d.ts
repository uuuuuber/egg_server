// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAdminManager from '../../../app/controller/admin/manager';

declare module 'egg' {
  interface IController {
    admin: {
      manager: ExportAdminManager;
    }
  }
}
