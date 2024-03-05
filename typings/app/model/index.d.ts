// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportManager from '../../../app/model/manager';
import ExportUser from '../../../app/model/user';
import ExportLive from '../../../app/model/live';
import ExportGift from '../../../app/model/gift';
import ExportGoods from '../../../app/model/goods';
import ExportOrderUser from '../../../app/model/order_user';

declare module 'egg' {
  interface IModel {
    Manager: ReturnType<typeof ExportManager>;
    User: ReturnType<typeof ExportUser>;
    Live: ReturnType<typeof ExportLive>;
    Gift: ReturnType<typeof ExportGift>;
    Goods: ReturnType<typeof ExportGoods>;
    OrederUser: ReturnType<typeof ExportOrderUser>;
  }
}
