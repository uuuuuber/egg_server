// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportManager from '../../../app/model/manager';
import ExportUser from '../../../app/model/user';
import ExportLive from '../../../app/model/live';

declare module 'egg' {
  interface IModel {
    Manager: ReturnType<typeof ExportManager>;
    User: ReturnType<typeof ExportUser>;
    Live: ReturnType<typeof ExportLive>;
  }
}
